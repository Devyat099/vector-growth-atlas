import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/section-page";
import { sections, pageHead } from "@/data/project";

export const Route = createFileRoute("/business")({
  head: () => pageHead(sections.business.label, sections.business.description),
  component: Page,
});
function Page() {
  return <SectionPage section="business" />;
}
