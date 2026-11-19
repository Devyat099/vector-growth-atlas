import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import {
  HeroSection,
  ProjectDirections,
  GeographySection,
  ParticipationSection,
} from "@/components/home-sections";
import { pageHead } from "@/data/project";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Сила производства. Истории людей.",
      "Федеральный документальный медиапроект о людях, предприятиях и возможностях промышленной России.",
    ),
  component: Index,
});
function Index() {
  return (
    <SiteShell>
      <main>
        <HeroSection />
        <ProjectDirections />
        <GeographySection />
        <ParticipationSection />
      </main>
    </SiteShell>
  );
}
