import { HeroSection } from "@/components/hero-section"
import { MissionSection } from "@/components/mission-section"
import { GrowthSection } from "@/components/growth-section"
import { IntegrationSection } from "@/components/integration-section"
import { StepsSection } from "@/components/steps-section"
import { SurgeProtectSection } from "@/components/surge-protect-section"
import { ReviewsSection } from "@/components/reviews-section"
import { BlogSection } from "@/components/blog-section"
import { PageShell } from "@/components/page-shell"

export default function Home() {
  return (
    <PageShell>
      <main>
        <HeroSection />
        <MissionSection />
        <GrowthSection />
        <IntegrationSection />
        <StepsSection />
        <SurgeProtectSection />
        <ReviewsSection />
        <BlogSection />
      </main>
    </PageShell>
  )
}
