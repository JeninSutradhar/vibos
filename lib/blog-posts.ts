export type BlogPost = {
  slug: string
  date: string
  category: string
  tag: string
  title: string
  excerpt: string
  image: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "reduce-insurance-back-office-delays",
    date: "January 10, 2026",
    category: "Operations",
    tag: "Insurance",
    title: "How Insurance Agencies Can Reduce Back-Office Delays Without Hiring In-House",
    excerpt:
      "A practical process design for agencies that need faster quoting, servicing, and policy updates with limited internal bandwidth.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop",
  },
  {
    slug: "building-dedicated-offshore-support-teams",
    date: "January 18, 2026",
    category: "Case Study",
    tag: "BPO",
    title: "A Practical Framework for Building Dedicated Offshore Support Teams",
    excerpt:
      "How fast-growing companies can transition from ad-hoc outsourcing to a repeatable dedicated support model.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop",
  },
]
