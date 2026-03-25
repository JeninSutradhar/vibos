import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { LegalDocument, LegalSection } from "@/components/legal-document"

export const metadata: Metadata = {
  title: "Data Security | VIBOS",
  description:
    "How VIBOS approaches confidentiality, access control, and secure operations when supporting client workflows and handling business data.",
}

const LAST_UPDATED = "March 25, 2026"

export default function DataSecurityPage() {
  return (
    <PageShell>
      <main className="px-4 pb-20 pt-16 sm:px-8 lg:px-16">
        <div className="container mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-8 lg:p-10">
          <LegalDocument title="Data Security" lastUpdated={LAST_UPDATED}>
            <LegalSection title="Purpose of this page">
              <p>
                This page summarizes how <strong>Vibos Technologies Pvt. Ltd.</strong> (&quot;VIBOS&quot;) thinks about data
                security and confidentiality in the context of virtual business operations and outsourcing. It is intended
                for business and technical stakeholders evaluating VIBOS as a partner.
              </p>
              <p>
                Specific security measures, controls evidence, audit rights, breach notification timelines, and subprocessors
                are typically documented in client agreements, security questionnaires, and (where applicable) data
                processing agreements. This overview does not replace those documents.
              </p>
            </LegalSection>

            <LegalSection title="Security is shared responsibility">
              <p>
                Secure outsourcing requires alignment on both sides. Clients are responsible for provisioning access
                correctly (least privilege, timely offboarding, MFA where supported), classifying data appropriately, and
                following their own regulatory and carrier obligations. VIBOS is responsible for operating disciplined
                internal practices and following agreed contractual requirements when performing services.
              </p>
            </LegalSection>

            <LegalSection title="Organizational measures">
              <p>We emphasize people and process, not tools alone:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Role-based access: team members receive access only to client systems and data needed for assigned work</li>
                <li>Confidentiality expectations for staff and contractors, reinforced through onboarding and ongoing awareness</li>
                <li>Change management for production access and privileged accounts where applicable</li>
                <li>Vendor and tool evaluation with security and privacy in mind for our own stack</li>
              </ul>
            </LegalSection>

            <LegalSection title="Technical and operational practices">
              <p>
                Exact controls vary by engagement, but our baseline approach commonly includes practices such as:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Secure workstations and endpoint hygiene expectations for remote delivery teams</li>
                <li>Use of approved communication and file-sharing channels rather than uncontrolled personal accounts</li>
                <li>Strong authentication where client systems support it (for example, MFA on email, AMS, and CRM)</li>
                <li>Segregation between client environments where multiple clients are supported</li>
                <li>Logging and monitoring of our internal systems as appropriate to detect misuse or anomalies</li>
                <li>Backups and recovery planning for VIBOS-managed systems (client-owned systems remain governed by the client)</li>
              </ul>
              <p>
                We do not guarantee that any specific tool, certification, or control applies to every engagement unless
                documented in writing for that engagement.
              </p>
            </LegalSection>

            <LegalSection title="Insurance, financial services, and regulated workflows">
              <p>
                Many VIBOS clients operate in insurance, lending, or adjacent regulated sectors. We understand that carrier
                rules, privacy laws, and internal compliance programs impose expectations on who can see what, how data is
                stored, and how incidents are reported. We work within client-defined policies and tool configurations and
                can complete reasonable security questionnaires as part of vendor due diligence.
              </p>
            </LegalSection>

            <LegalSection title="Data locations and transfers">
              <p>
                Delivery is primarily remote from India, with collaboration across approved tools. Data may be processed in
                India and in regions where our clients&apos; systems or our subprocessors are hosted. Cross-border transfers,
                if required, should be addressed in your agreement with us and, where applicable, standard contractual
                clauses or equivalent safeguards.
              </p>
            </LegalSection>

            <LegalSection title="Incident response">
              <p>
                If we become aware of a security incident that materially affects personal data or client confidential
                information within our responsibility, we will notify affected clients in accordance with contractual
                commitments and applicable law. Clients should notify us promptly if they suspect unauthorized access
                related to accounts or integrations we use on their behalf.
              </p>
            </LegalSection>

            <LegalSection title="Website and marketing data">
              <p>
                Information collected through our public website (forms, newsletter, analytics) is handled as described in
                our{" "}
                <Link href="/privacy-policy" className="font-semibold text-[#1D1D1F] underline">
                  Privacy Policy
                </Link>
                . Website hosting and form processing may rely on subprocessors; details can be provided on request for
                procurement reviews.
              </p>
            </LegalSection>

            <LegalSection title="Retention and deletion">
              <p>
                Retention of client operational data follows the schedules and instructions in your contract or documented
                operating procedures. Upon contract end, we cooperate on return or secure deletion of VIBOS-held copies as
                agreed, subject to legal hold or statutory retention requirements.
              </p>
            </LegalSection>

            <LegalSection title="What we may ask from you">
              <p>To keep engagements secure, we may request that you:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Provide role-appropriate accounts rather than shared passwords</li>
                <li>Enable MFA and SSO where available</li>
                <li>Define approved tools for messaging, documents, and screen sharing</li>
                <li>Notify us when team members who had access leave your organization</li>
                <li>Share incident or phishing reporting channels so we can coordinate quickly</li>
              </ul>
            </LegalSection>

            <LegalSection title="Contact">
              <p>
                For security questions related to a prospective or active engagement, contact your VIBOS representative or
                reach us through the{" "}
                <Link href="/contact" className="font-semibold text-[#1D1D1F] underline">
                  Contact
                </Link>{" "}
                page. For general legal terms of website use, see our{" "}
                <Link href="/terms-of-service" className="font-semibold text-[#1D1D1F] underline">
                  Terms of Service
                </Link>
                .
              </p>
            </LegalSection>

            <LegalSection title="Disclaimer">
              <p>
                This page describes practices at a high level and is not an audit report, certification, or legal guarantee.
                Compliance requirements differ by jurisdiction and industry; your counsel and risk team should validate fit
                for your program.
              </p>
            </LegalSection>
          </LegalDocument>
        </div>
      </main>
    </PageShell>
  )
}
