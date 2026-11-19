import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/section-page";
import { sections, pageHead } from "@/data/project";

export const Route = createFileRoute("/media")({
  head: () => pageHead(sections.media.label, sections.media.description),
  component: Page,
});
function Page() {
  return <SectionPage section="media" />;
}
