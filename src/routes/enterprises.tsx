import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/section-page";
import { sections, pageHead } from "@/data/project";

export const Route = createFileRoute("/enterprises")({
  head: () => pageHead(sections.enterprises.label, sections.enterprises.description),
  component: Page,
});
function Page() {
  return <SectionPage section="enterprises" />;
}
