export type ServiceItem = {
  slug: string
  title: string
  shortDescription: string
  audience: string
  benefits: string[]
  tools?: string[]
}

export const companyProfile = {
  name: "VIBOS",
  founded: "2016",
  location: "Udaipur, India",
  teamSize: "45",
  tagline: "Your Global Partner for Virtual Business Operations.",
  markets: ["United States", "Canada", "Australia", "United Kingdom"],
}

export const services: ServiceItem[] = [
  {
    slug: "insurance-back-office-support",
    title: "Insurance Back Office Support (P&C Insurance)",
    shortDescription:
      "Comprehensive support for prospect entry, AMS updates, quoting, policy servicing, binding assistance, payment support, and documentation.",
    audience: "Insurance agencies, brokers, MGAs, and insurance service providers.",
    benefits: [
      "Reduce operational cost and turnaround times",
      "Improve data quality and policy record accuracy",
      "Scale workload without growing in-house admin overhead",
    ],
    tools: ["Applied Epic", "AMS360", "HawkSoft", "EZLynx", "Vertafore", "Carrier portals"],
  },
  {
    slug: "business-process-outsourcing",
    title: "Business Process Outsourcing (BPO)",
    shortDescription:
      "End-to-end virtual assistant and operations support for calendar/email management, website updates, ecommerce workflows, research, and reporting.",
    audience: "Entrepreneurs, startups, SMBs, ecommerce companies, and consultants.",
    benefits: [
      "Offload repetitive operations and admin tasks",
      "Improve team productivity and time management",
      "Scale support operations with flexible staffing",
    ],
    tools: ["Google Workspace", "Shopify", "WooCommerce", "WordPress", "Slack", "Trello"],
  },
  {
    slug: "mca-back-office-support",
    title: "Merchant Cash Advance (MCA) Back-Office Support",
    shortDescription:
      "Specialized support for MCA providers including lead management, document processing, underwriting support, and bank statement analysis.",
    audience: "MCA providers, brokerages, and alternative lending firms.",
    benefits: [
      "Process applications faster with reliable back-office coverage",
      "Improve lead operations and deal throughput",
      "Support underwriting workflows at scale",
    ],
    tools: ["CRM systems", "Excel/Google Sheets", "Credit report tools", "Communication platforms"],
  },
  {
    slug: "accounting-and-bookkeeping",
    title: "Accounting and Bookkeeping Services",
    shortDescription:
      "Bookkeeping support across AP/AR, reconciliations, invoicing, expense tracking, payroll support, and financial reporting.",
    audience: "SMBs, startups, accounting firms, and growth-stage companies.",
    benefits: [
      "Maintain accurate and audit-ready records",
      "Gain better financial visibility for decisions",
      "Reduce cost versus expanding in-house bookkeeping teams",
    ],
    tools: ["QuickBooks", "Xero", "Zoho Books", "Excel/Google Sheets"],
  },
  {
    slug: "digital-marketing-services",
    title: "Digital Marketing Services",
    shortDescription:
      "Data-driven digital marketing support including social media operations, SEO, paid campaigns, email marketing, and lead generation.",
    audience: "Startups, SMBs, agencies, ecommerce brands, and service firms.",
    benefits: [
      "Increase brand visibility and inbound pipeline",
      "Run consistent campaign execution with measurable outcomes",
      "Support growth without building a large in-house marketing team",
    ],
    tools: ["SEO tooling", "Ad platforms", "Email platforms", "Analytics dashboards"],
  },
  {
    slug: "employee-benefits-administration-support",
    title: "Employee Benefits Administration Support",
    shortDescription:
      "Administrative support for employee benefits enrollment, renewals, records, and broker/carrier coordination.",
    audience: "Insurance agencies, benefits brokers, HR consulting firms, and employer teams.",
    benefits: [
      "Reduce benefits admin workload",
      "Improve enrollment and renewal process consistency",
      "Maintain cleaner records and service responsiveness",
    ],
  },
]

export const mainNavLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]
