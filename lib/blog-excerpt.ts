const DEFAULT_MAX = 220

/** Card-safe excerpt: avoids full post body when DB excerpt was misused. */
export function truncateForBlogCard(excerpt: string | null | undefined, maxChars = DEFAULT_MAX): string {
  if (excerpt == null || excerpt === "") return ""
  const singleLine = excerpt.replace(/\s+/g, " ").trim()
  if (singleLine.length <= maxChars) return singleLine
  const cut = singleLine.slice(0, maxChars - 1)
  const lastSpace = cut.lastIndexOf(" ")
  const base = lastSpace > 50 ? cut.slice(0, lastSpace) : cut
  return `${base.trim()}…`
}
