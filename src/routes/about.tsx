import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/section-page";
import { sections, pageHead } from "@/data/project";

export const Route = createFileRoute("/about")({
  head: () => pageHead(sections.about.label, sections.about.description),
  component: Page,
});
function Page() {
  return <SectionPage section="about" />;
}
