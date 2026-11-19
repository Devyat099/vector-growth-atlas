import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/section-page";
import { sections, pageHead } from "@/data/project";

export const Route = createFileRoute("/contacts")({
  head: () => pageHead(sections.contacts.label, sections.contacts.description),
  component: Page,
});
function Page() {
  return <SectionPage section="contacts" />;
}
