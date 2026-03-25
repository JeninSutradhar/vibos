import type { ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type PmNode = {
  type?: string
  attrs?: Record<string, unknown>
  content?: PmNode[]
  text?: string
  marks?: { type: string; attrs?: Record<string, string> }[]
}

function renderTextMarks(text: string, marks?: PmNode["marks"]): ReactNode {
  if (!marks?.length) return text
  let el: ReactNode = text
  for (const m of marks) {
    switch (m.type) {
      case "bold":
        el = <strong>{el}</strong>
        break
      case "italic":
        el = <em>{el}</em>
        break
      case "code":
        el = <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">{el}</code>
        break
      case "link":
        el = (
          <a href={m.attrs?.href ?? "#"} className="font-semibold text-[#1D1D1F] underline">
            {el}
          </a>
        )
        break
      default:
        break
    }
  }
  return el
}

function renderPmNode(node: PmNode, key: string | number): ReactNode {
  if (!node || typeof node !== "object") return null

  switch (node.type) {
    case "doc":
      return (
        <div key={key} className="blog-prose space-y-4">
          {node.content?.map((child, i) => renderPmNode(child, `${key}-${i}`))}
        </div>
      )
    case "paragraph": {
      const inner = node.content?.map((child, i) => renderPmNode(child, `${key}-p-${i}`))
      if (!inner?.length) return <p key={key} className="my-4 min-h-[1em]" />
      return (
        <p key={key} className="my-4 leading-relaxed text-gray-700">
          {inner}
        </p>
      )
    }
    case "heading": {
      const level = Math.min(6, Math.max(1, Number(node.attrs?.level) || 2))
      const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
      const size =
        level <= 2 ? "mt-10 text-2xl" : level === 3 ? "mt-8 text-xl" : "mt-6 text-lg"
      return (
        <Tag key={key} className={`font-bold text-[#1D1D1F] ${size} mb-2`}>
          {node.content?.map((child, i) => renderPmNode(child, `${key}-h-${i}`))}
        </Tag>
      )
    }
    case "bulletList":
      return (
        <ul key={key} className="my-4 list-disc space-y-2 pl-6 text-gray-700">
          {node.content?.map((child, i) => renderPmNode(child, `${key}-ul-${i}`))}
        </ul>
      )
    case "orderedList":
      return (
        <ol key={key} className="my-4 list-decimal space-y-2 pl-6 text-gray-700">
          {node.content?.map((child, i) => renderPmNode(child, `${key}-ol-${i}`))}
        </ol>
      )
    case "listItem":
      return (
        <li key={key} className="leading-relaxed">
          {node.content?.map((child, i) => renderPmNode(child, `${key}-li-${i}`))}
        </li>
      )
    case "blockquote":
      return (
        <blockquote
          key={key}
          className="my-4 border-l-4 border-black/15 pl-4 italic text-gray-600"
        >
          {node.content?.map((child, i) => renderPmNode(child, `${key}-bq-${i}`))}
        </blockquote>
      )
    case "codeBlock":
      return (
        <pre
          key={key}
          className="my-4 overflow-x-auto rounded-xl bg-[#1D1D1F] p-4 text-sm text-white"
        >
          <code>
            {node.content?.map((child, i) => renderPmNode(child, `${key}-cb-${i}`))}
          </code>
        </pre>
      )
    case "horizontalRule":
      return <hr key={key} className="my-8 border-black/10" />
    case "hardBreak":
      return <br key={key} />
    case "text":
      return <span key={key}>{renderTextMarks(node.text ?? "", node.marks)}</span>
    default:
      if (node.content?.length) {
        return (
          <div key={key} className="my-2">
            {node.content.map((child, i) => renderPmNode(child, `${key}-x-${i}`))}
          </div>
        )
      }
      return null
  }
}

function isTiptapDoc(content: unknown): content is PmNode {
  return (
    typeof content === "object" &&
    content !== null &&
    (content as PmNode).type === "doc" &&
    Array.isArray((content as PmNode).content)
  )
}

function extractPlainFromPmNode(node: PmNode): string {
  if (node.type === "text") return node.text ?? ""
  if (!node.content?.length) return ""
  return node.content.map(extractPlainFromPmNode).join("")
}

/** Join TipTap blocks as plain text so we can re-split numbered sections pasted into one block. */
function tipTapDocToPlainText(doc: PmNode): string {
  if (doc.type !== "doc" || !doc.content?.length) return ""
  return doc.content
    .map((block) => extractPlainFromPmNode(block))
    .filter((t) => t.length > 0)
    .join("\n\n")
}

/**
 * Numbered sections like "1. Title" or "**1. Title**" pasted as one block (common from Word/Docs).
 */
const NUMBERED_SECTION_START = /(?:\*\*)?\d+\.(?:\*\*)?\s+/

function countNumberedSectionStarts(text: string): number {
  const m = text.match(new RegExp(NUMBERED_SECTION_START.source, "g"))
  return m?.length ?? 0
}

function needsNumberedSectionSplit(text: string): boolean {
  if (text.length < 150) return false
  const n = countNumberedSectionStarts(text)
  return n >= 2 || (n >= 1 && text.length > 500)
}

/**
 * True when the text already uses real markdown blocks (multiple list lines or ATX headings).
 * Inline **bold** alone must not skip numbered-section splitting.
 */
function hasMarkdownBlockStructure(text: string): boolean {
  if (/(^|\n)#{1,6}\s/m.test(text)) return true
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean)
  const listLines = lines.filter((l) => /^[-*+]\s+\S/.test(l)).length
  return listLines >= 2
}

const mdComponents = {
  h1: ({ ...props }: React.ComponentPropsWithoutRef<"h1">) => (
    <h1 className="mt-10 text-3xl font-bold text-[#1D1D1F]" {...props} />
  ),
  h2: ({ ...props }: React.ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-10 text-2xl font-bold text-[#1D1D1F]" {...props} />
  ),
  h3: ({ ...props }: React.ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 text-xl font-bold text-[#1D1D1F]" {...props} />
  ),
  h4: ({ ...props }: React.ComponentPropsWithoutRef<"h4">) => (
    <h4 className="mt-6 text-lg font-bold text-[#1D1D1F]" {...props} />
  ),
  p: ({ ...props }: React.ComponentPropsWithoutRef<"p">) => (
    <p className="my-4 leading-relaxed text-gray-700" {...props} />
  ),
  ul: ({ ...props }: React.ComponentPropsWithoutRef<"ul">) => (
    <ul className="my-4 list-disc space-y-2 pl-6 text-gray-700" {...props} />
  ),
  ol: ({ ...props }: React.ComponentPropsWithoutRef<"ol">) => (
    <ol className="my-4 list-decimal space-y-2 pl-6 text-gray-700" {...props} />
  ),
  li: ({ ...props }: React.ComponentPropsWithoutRef<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  a: ({ ...props }: React.ComponentPropsWithoutRef<"a">) => (
    <a className="font-semibold text-[#1D1D1F] underline" {...props} />
  ),
  strong: ({ ...props }: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-bold text-[#1D1D1F]" {...props} />
  ),
  blockquote: ({ ...props }: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="my-4 border-l-4 border-black/15 pl-4 text-gray-600" {...props} />
  ),
  code: ({ className, ...props }: React.ComponentPropsWithoutRef<"code">) => {
    const isBlock = className?.includes("language-")
    if (isBlock) {
      return <code className={`${className} block`} {...props} />
    }
    return <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm" {...props} />
  },
  pre: ({ ...props }: React.ComponentPropsWithoutRef<"pre">) => (
    <pre className="my-4 overflow-x-auto rounded-xl bg-[#1D1D1F] p-4 text-sm text-white" {...props} />
  ),
  hr: () => <hr className="my-8 border-black/10" />,
}

const mdInlinePhrasing = {
  ...mdComponents,
  p: ({ children }: { children?: ReactNode }) => <span className="inline">{children}</span>,
}

/**
 * Split on "1. ", "**1. ", "**1.** " etc. so numbered sections become headings + body.
 */
function renderPlainStructuredArticle(text: string): ReactNode {
  const normalized = text.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim()
  const parts = normalized
    .split(new RegExp(`(?=${NUMBERED_SECTION_START.source})`))
    .map((p) => p.trim())
    .filter(Boolean)

  const startsWithNumbered = (s: string) => /^(?:\*\*)?\d+\.(?:\*\*)?\s+/.test(s)

  return (
    <div className="mt-8 max-w-none space-y-8">
      {parts.map((part, index) => {
        if (startsWithNumbered(part)) {
          const lines = part.split("\n")
          let headingLine = lines[0]?.trim() ?? part
          let bodyFromLines = lines.slice(1).join("\n").trim()

          if (!bodyFromLines && headingLine.length > 60) {
            const afterNumber = headingLine.match(/^((?:\*\*)?\d+\.(?:\*\*)?\s+)([\s\S]+)$/)
            if (afterNumber) {
              const prefix = afterNumber[1]
              const rest = afterNumber[2].replace(/\*\*$/, "").trim()
              const dot = rest.search(/[.!?](?:\*\*)?\s+/)
              if (dot > 12 && dot < 140) {
                headingLine = `${prefix}${rest.slice(0, dot + 1).trim()}`
                bodyFromLines = rest.slice(dot + 1).trim()
              }
            }
          }

          return (
            <section
              key={index}
              className="border-t border-black/5 pt-6 first:mt-0 first:border-t-0 first:pt-0"
            >
              <h2 className="text-xl font-bold leading-snug text-[#1D1D1F] lg:text-2xl">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdInlinePhrasing}>
                  {headingLine}
                </ReactMarkdown>
              </h2>
              {bodyFromLines ? (
                <div className="mt-4 text-gray-700">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                    {bodyFromLines}
                  </ReactMarkdown>
                </div>
              ) : null}
            </section>
          )
        }
        return (
          <div key={index} className="text-gray-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
              {part}
            </ReactMarkdown>
          </div>
        )
      })}
    </div>
  )
}

export function isBlogBodyEmpty(content: unknown): boolean {
  if (content == null) return true
  if (typeof content === "string") return content.trim() === ""
  if (typeof content === "object" && content !== null && "markdown" in content) {
    const m = (content as { markdown?: string }).markdown
    return typeof m !== "string" || m.trim() === ""
  }
  if (isTiptapDoc(content)) return !content.content?.length
  if (typeof content === "object" && content !== null) return Object.keys(content as object).length === 0
  return false
}

export function BlogPostBody({ content }: { content: unknown }) {
  if (content == null) {
    return null
  }

  if (isTiptapDoc(content)) {
    const plain = tipTapDocToPlainText(content)
    const blocks = content.content ?? []
    const headingCount = blocks.filter((n) => n.type === "heading").length
    const listCount = blocks.filter((n) => n.type === "bulletList" || n.type === "orderedList").length
    /** One title heading + one paragraph blob is not "structured" enough to skip splitting. */
    const tiptapRichEnough = headingCount >= 2 || listCount >= 1
    if (needsNumberedSectionSplit(plain) && !tiptapRichEnough) {
      return renderPlainStructuredArticle(plain)
    }
    return <div className="blog-prose mt-8">{renderPmNode(content, "root")}</div>
  }

  if (typeof content === "object" && content !== null && "markdown" in content) {
    const md = (content as { markdown?: string }).markdown
    if (typeof md === "string" && md.trim()) {
      const t = md.trim()
      if (needsNumberedSectionSplit(t) && !hasMarkdownBlockStructure(t)) {
        return renderPlainStructuredArticle(t)
      }
      return (
        <div className="blog-prose mt-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {t}
          </ReactMarkdown>
        </div>
      )
    }
  }

  if (typeof content === "string") {
    const trimmed = content.trim()
    if (!trimmed) return null
    if (needsNumberedSectionSplit(trimmed) && !hasMarkdownBlockStructure(trimmed)) {
      return renderPlainStructuredArticle(trimmed)
    }
    return (
      <div className="blog-prose mt-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
          {trimmed}
        </ReactMarkdown>
      </div>
    )
  }

  return (
    <p className="mt-8 text-sm text-amber-800">
      This post uses a content format we could not render. Please contact support or re-save the article body as Markdown
      or structured JSON from the editor.
    </p>
  )
}
