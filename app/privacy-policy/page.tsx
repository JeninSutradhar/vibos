import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { LegalDocument, LegalSection } from "@/components/legal-document"

export const metadata: Metadata = {
  title: "Privacy Policy | VIBOS",
  description:
    "How Vibos Technologies Pvt. Ltd. (VIBOS) collects, uses, and protects personal data for website visitors and business inquiries.",
}

const LAST_UPDATED = "March 25, 2026"

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <main className="px-4 pb-20 pt-16 sm:px-8 lg:px-16">
        <div className="container mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-8 lg:p-10">
          <LegalDocument title="Privacy Policy" lastUpdated={LAST_UPDATED}>
            <LegalSection title="Who we are">
              <p>
                This website is operated by <strong>Vibos Technologies Pvt. Ltd.</strong> (&quot;VIBOS,&quot; &quot;we,&quot;
                &quot;us,&quot; or &quot;our&quot;), with its principal place of business in Udaipur, Rajasthan, India. We
                provide virtual business operations and outsourcing services to business clients, primarily in the United
                States, Canada, Australia, and the United Kingdom.
              </p>
              <p>
                For privacy questions related to this website or marketing communications, contact us via the{" "}
                <Link href="/contact" className="font-semibold text-[#1D1D1F] underline">
                  Contact
                </Link>{" "}
                page.
              </p>
            </LegalSection>

            <LegalSection title="Scope of this policy">
              <p>
                This Privacy Policy describes how we handle personal information when you use our public website (including
                forms, newsletter signup, and optional analytics events), and when you communicate with us before a formal
                client agreement is in place.
              </p>
              <p>
                If you become a VIBOS client, additional terms, data processing agreements, confidentiality obligations, and
                security requirements are typically set out in your services agreement, statements of work, and related
                documents. Those documents govern processing performed on your behalf as part of delivering services.
              </p>
            </LegalSection>

            <LegalSection title="Information we collect">
              <p>
                <strong>Information you provide.</strong> When you submit forms (for example, contact, quote, or callback
                requests), subscribe to our newsletter, or email us, we may collect:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Name, work email address, company name, and country</li>
                <li>Service interests, messages, scheduling preferences, and similar inquiry details</li>
                <li>Optional marketing attribution fields you pass in URLs (such as UTM parameters) that you submit with the form</li>
                <li>Any other information you choose to include in your message</li>
              </ul>
              <p>
                <strong>Automatically collected technical data.</strong> Like most websites, our hosting and infrastructure
                may log technical information such as IP address, browser type, device type, approximate location derived
                from IP, referring URLs, and timestamps. We may also collect limited analytics or event data that you
                trigger while browsing (for example, page views or button interactions), where enabled.
              </p>
              <p>
                We do not intend to collect sensitive categories of personal data through this website (such as health
                information, government identifiers, or payment card data). Please do not submit such information through
                general contact forms unless we explicitly request it under a separate, secure process.
              </p>
            </LegalSection>

            <LegalSection title="How we use information">
              <p>We use personal information for purposes such as:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Responding to inquiries, quotes, and consultation requests</li>
                <li>Operating, securing, and improving our website and internal processes</li>
                <li>Sending newsletters or marketing communications when you have opted in (you may unsubscribe using the link in those emails)</li>
                <li>Measuring site usage and campaign performance in aggregate where analytics are enabled</li>
                <li>Complying with applicable law, responding to lawful requests, and protecting our rights and users</li>
                <li>Detecting spam, fraud, or abuse (including basic bot checks where implemented)</li>
              </ul>
            </LegalSection>

            <LegalSection title="Legal bases (where applicable)">
              <p>
                Depending on your location, privacy laws may require a &quot;legal basis&quot; for processing. We generally
                rely on one or more of the following: your consent (for example, newsletter subscription), our legitimate
                interests in operating and promoting our business (balanced against your rights), performance of steps
                prior to entering a contract at your request, or compliance with legal obligations.
              </p>
            </LegalSection>

            <LegalSection title="Cookies and similar technologies">
              <p>
                We and our service providers may use cookies, local storage, or similar technologies that are strictly
                necessary for the site to function, or that support analytics and preferences where allowed. You can
                control cookies through your browser settings. Disabling certain cookies may limit some features.
              </p>
            </LegalSection>

            <LegalSection title="Sharing and subprocessors">
              <p>We may share personal information with:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Service providers</strong> who assist us with hosting, email delivery, analytics, customer
                  relationship tools, or security monitoring, subject to confidentiality and security expectations
                </li>
                <li>
                  <strong>Professional advisers</strong> (such as lawyers or accountants) where required
                </li>
                <li>
                  <strong>Authorities</strong> when we believe disclosure is required by law or to protect safety and rights
                </li>
                <li>
                  <strong>Business transfers</strong> in connection with a merger, acquisition, or asset sale, with notice
                  where required
                </li>
              </ul>
              <p>We do not sell your personal information as a traditional &quot;data broker&quot; sale.</p>
            </LegalSection>

            <LegalSection title="International transfers">
              <p>
                VIBOS is based in India and may process data in India and other countries where we or our providers
                operate. Where required by law, we implement appropriate safeguards for cross-border transfers (such as
                contractual clauses or equivalent mechanisms).
              </p>
            </LegalSection>

            <LegalSection title="Retention">
              <p>
                We retain inquiry and marketing data for as long as needed to fulfill the purposes described in this
                policy, unless a longer period is required or permitted by law (for example, tax, accounting, or dispute
                resolution). Retention periods may differ for client project data governed by separate agreements.
              </p>
            </LegalSection>

            <LegalSection title="Security">
              <p>
                We implement reasonable administrative, technical, and organizational measures designed to protect personal
                information against unauthorized access, loss, or misuse. No method of transmission over the internet is
                completely secure. See our{" "}
                <Link href="/data-security" className="font-semibold text-[#1D1D1F] underline">
                  Data Security
                </Link>{" "}
                page for a higher-level overview of our posture for business engagements.
              </p>
            </LegalSection>

            <LegalSection title="Your rights and choices">
              <p>
                Depending on where you live, you may have rights to access, correct, delete, or restrict certain processing
                of your personal information, or to object to certain processing or to data portability. You may also have
                the right to lodge a complaint with a supervisory authority.
              </p>
              <p>
                To exercise rights related to information collected through this website, contact us via{" "}
                <Link href="/contact" className="font-semibold text-[#1D1D1F] underline">
                  Contact
                </Link>
                . We may need to verify your request and will respond consistent with applicable law.
              </p>
            </LegalSection>

            <LegalSection title="Children">
              <p>
                Our website and services are directed to businesses and adults. We do not knowingly collect personal
                information from children under 16 (or the age required in your jurisdiction). If you believe we have
                collected such information, contact us and we will take appropriate steps to delete it.
              </p>
            </LegalSection>

            <LegalSection title="Third-party sites">
              <p>
                Our website may link to third-party websites, embeds (such as scheduling tools), or resources. Their privacy
                practices are governed by their own policies. We encourage you to read those policies before submitting
                information.
              </p>
            </LegalSection>

            <LegalSection title="Changes to this policy">
              <p>
                We may update this Privacy Policy from time to time. We will post the updated version on this page and
                revise the &quot;Last updated&quot; date. Where changes are material and required by law, we will provide
                additional notice.
              </p>
            </LegalSection>

            <LegalSection title="Disclaimer">
              <p>
                This policy is provided for transparency and operational clarity. It is not legal advice. Laws vary by
                country and industry; you should consult qualified counsel for advice specific to your situation.
              </p>
            </LegalSection>
          </LegalDocument>
        </div>
      </main>
    </PageShell>
  )
}
