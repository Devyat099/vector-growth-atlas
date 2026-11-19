import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/section-page";
import { sections, pageHead } from "@/data/project";

export const Route = createFileRoute("/employment")({
  head: () => pageHead(sections.employment.label, sections.employment.description),
  component: Page,
});
function Page() {
  return <SectionPage section="employment" />;
}
