import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/section-page";
import { sections, pageHead } from "@/data/project";

export const Route = createFileRoute("/team")({
  head: () => pageHead(sections.team.label, sections.team.description),
  component: Page,
});
function Page() {
  return <SectionPage section="team" />;
}
