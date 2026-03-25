export type ServicePageContent = {
  slug: string
  title: string
  subtitle: string
  audience: string
  whatWeDo: string
  benefits: string[]
  tools?: string[]
}

export const servicePages: ServicePageContent[] = [
  {
    slug: "insurance-back-office-support",
    title: "Insurance Back Office Support",
    subtitle: "Specialized P&C operations support for agencies, brokers, and MGAs.",
    audience: "Insurance agencies, insurance brokers, MGAs, and insurance service providers.",
    whatWeDo:
      "We provide prospect entry, AMS updates, quoting support, policy servicing, binding assistance, payment follow-ups, and documentation management to keep insurance workflows fast and accurate.",
    benefits: [
      "Faster turnaround for policy and servicing operations",
      "Better record accuracy and workflow consistency",
      "More time for your in-house team to focus on growth and sales",
    ],
    tools: ["Applied Epic", "AMS360", "HawkSoft", "EZLynx", "Vertafore", "Carrier portals"],
  },
  {
    slug: "business-process-outsourcing",
    title: "Business Process Outsourcing (BPO)",
    subtitle: "Reliable operational support for admin-heavy business workflows.",
    audience: "Entrepreneurs, startups, SMBs, ecommerce companies, and consultants.",
    whatWeDo:
      "Our team handles virtual assistant support, website updates, calendar and inbox coordination, data entry, research, ecommerce tasks, and routine operations so your core team can stay focused.",
    benefits: [
      "Lower operational overhead with flexible support",
      "Improved execution speed on repetitive business tasks",
      "Scalable model as workload grows",
    ],
    tools: ["Google Workspace", "Shopify", "WooCommerce", "WordPress", "Slack", "Zoom", "Trello"],
  },
  {
    slug: "mca-back-office-support",
    title: "MCA Back-Office Support",
    subtitle: "Operational support designed for Merchant Cash Advance teams.",
    audience: "MCA providers, alternative lending firms, and MCA brokerages.",
    whatWeDo:
      "We support MCA workflows with lead operations, document processing, statement analysis, application review support, underwriting assistance, and client communication coordination.",
    benefits: [
      "Faster processing across high-volume application pipelines",
      "More structured lead and sales support operations",
      "Improved consistency across underwriting support tasks",
    ],
    tools: ["CRM platforms", "Excel", "Google Sheets", "Credit report tools", "Email and chat systems"],
  },
  {
    slug: "accounting-and-bookkeeping",
    title: "Accounting and Bookkeeping Services",
    subtitle: "Accurate financial back-office support for growing businesses.",
    audience: "SMBs, startups, entrepreneurs, and accounting firms.",
    whatWeDo:
      "We support transaction recording, AP/AR updates, reconciliation, invoicing, expense tracking, payroll support, and reporting workflows to keep financial records complete and current.",
    benefits: [
      "Cleaner records and improved financial visibility",
      "Better process consistency for recurring financial tasks",
      "Reduced cost versus scaling in-house accounting support",
    ],
    tools: ["QuickBooks", "Xero", "Zoho Books", "Excel", "Google Sheets"],
  },
  {
    slug: "digital-marketing-services",
    title: "Digital Marketing Services",
    subtitle: "Execution-focused digital marketing support for lead generation.",
    audience: "Startups, SMBs, agencies, ecommerce brands, and service businesses.",
    whatWeDo:
      "We support social media operations, content workflows, SEO execution, paid campaign support, email marketing coordination, and performance tracking to strengthen your pipeline.",
    benefits: [
      "More consistent campaign execution and follow-through",
      "Increased visibility and lead generation support",
      "Flexible support without expanding internal marketing headcount",
    ],
  },
  {
    slug: "employee-benefits-administration-support",
    title: "Employee Benefits Administration Support",
    subtitle: "Back-office support for benefits enrollment and administration tasks.",
    audience: "Insurance agencies, benefits brokers, HR consulting firms, and employers.",
    whatWeDo:
      "We assist with benefits system updates, enrollment and renewal support, records maintenance, documentation processing, and coordination with carriers or brokers.",
    benefits: [
      "Reduced administrative pressure on HR and benefits teams",
      "Improved consistency in enrollment and renewal workflows",
      "Better day-to-day management of benefits documentation",
    ],
  },
]

export const servicePageMap = Object.fromEntries(servicePages.map((service) => [service.slug, service]))
