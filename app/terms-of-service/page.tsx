import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { LegalDocument, LegalSection } from "@/components/legal-document"

export const metadata: Metadata = {
  title: "Terms of Service | VIBOS",
  description:
    "Terms governing use of the VIBOS website and the general relationship between visitors and Vibos Technologies Pvt. Ltd.",
}

const LAST_UPDATED = "March 25, 2026"

export default function TermsOfServicePage() {
  return (
    <PageShell>
      <main className="px-4 pb-20 pt-16 sm:px-8 lg:px-16">
        <div className="container mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-8 lg:p-10">
          <LegalDocument title="Terms of Service" lastUpdated={LAST_UPDATED}>
            <LegalSection title="Agreement to terms">
              <p>
                These Terms of Service apply to your access to and use of the website operated by{" "}
                <strong>Vibos Technologies Pvt. Ltd.</strong> (&quot;VIBOS,&quot; &quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;). By using the site, you agree to these Terms. If you disagree, do not use the site.
              </p>
              <p>
                Paid professional services are governed by separate contracts (for example master services agreements and
                statements of work). If those contracts conflict with these Terms regarding the public website, these Terms
                control for site use only.
              </p>
            </LegalSection>

            <LegalSection title="Eligibility and acceptable use">
              <p>The site is intended for business purposes. You agree not to:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Violate applicable laws or regulations</li>
                <li>Attempt unauthorized access to systems or data</li>
                <li>Introduce malware, overload infrastructure, or scrape without written permission</li>
                <li>Misrepresent identity or submit abusive or unlawful content</li>
                <li>Circumvent security or rate limits</li>
              </ul>
              <p>We may suspend access for violations or risk to the site or others.</p>
            </LegalSection>

            <LegalSection title="Information you submit">
              <p>
                You represent that information you provide is accurate and that you may share it with us. We may use
                submissions to respond and operate our business, as described in our{" "}
                <Link href="/privacy-policy" className="font-semibold text-[#1D1D1F] underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </LegalSection>

            <LegalSection title="Intellectual property">
              <p>
                Site content, branding, and layout are owned by VIBOS or licensors. Do not copy, modify, or distribute
                except as allowed for normal browsing or with our written consent. Third-party marks belong to their
                owners.
              </p>
            </LegalSection>

            <LegalSection title="No professional advice">
              <p>
                Site content is general information only. It is not legal, tax, insurance, or accounting advice. Service
                delivery terms are defined in client contracts.
              </p>
            </LegalSection>

            <LegalSection title="No guarantee of results">
              <p>
                Descriptions and examples are illustrative. We do not guarantee specific outcomes unless stated in a signed
                agreement.
              </p>
            </LegalSection>

            <LegalSection title="Third-party services">
              <p>
                The site may link to or embed third-party tools. Their terms and privacy policies apply. We are not
                responsible for services we do not control.
              </p>
            </LegalSection>

            <LegalSection title="Disclaimer of warranties">
              <p>
                The site is provided &quot;as is&quot; and &quot;as available.&quot; To the fullest extent permitted by
                law, we disclaim warranties of merchantability, fitness for a particular purpose, non-infringement, and
                uninterrupted or error-free operation.
              </p>
            </LegalSection>

            <LegalSection title="Limitation of liability">
              <p>
                To the fullest extent permitted by law, VIBOS and its affiliates, officers, employees, and agents are not
                liable for indirect, incidental, special, consequential, or punitive damages, or loss of profits, data,
                goodwill, or business opportunities, arising from use of the site.
              </p>
              <p>
                Our total liability for site-related claims (except where the law does not allow limits) is capped at the
                greater of (a) amounts you paid us in the prior twelve months for site-related paid features, or (b) one
                hundred US dollars (USD 100) if no such fees apply.
              </p>
            </LegalSection>

            <LegalSection title="Indemnity">
              <p>
                You agree to indemnify VIBOS against claims and reasonable legal fees arising from your misuse of the site,
                your submissions, or your breach of these Terms, except where caused by our willful misconduct, to the extent
                permitted by law.
              </p>
            </LegalSection>

            <LegalSection title="Governing law and venue">
              <p>
                These Terms are governed by the laws of India, without regard to conflict-of-law rules, subject to
                non-waivable rights in your jurisdiction. Courts in Udaipur, Rajasthan, India have exclusive jurisdiction
                for site-related disputes unless your master agreement with us says otherwise.
              </p>
            </LegalSection>

            <LegalSection title="Changes">
              <p>
                We may update these Terms. We will post changes and update the last updated date. Continued use means
                acceptance. If you disagree, stop using the site.
              </p>
            </LegalSection>

            <LegalSection title="Contact">
              <p>
                Questions: use our{" "}
                <Link href="/contact" className="font-semibold text-[#1D1D1F] underline">
                  Contact
                </Link>{" "}
                page.
              </p>
            </LegalSection>
          </LegalDocument>
        </div>
      </main>
    </PageShell>
  )
}
