import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/section-page";
import { sections, pageHead } from "@/data/project";

export const Route = createFileRoute("/careers")({
  head: () => pageHead(sections.careers.label, sections.careers.description),
  component: Page,
});
function Page() {
  return <SectionPage section="careers" />;
}
