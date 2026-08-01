import { scholarshipPageContent } from "@/data";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container, Section } from "@/layout";

export function ScholarshipHero() {
  const { list } = scholarshipPageContent;

  return (
    <Section spacing="lg">
      <Container>
        <SectionHeading title={list.title} description={list.description} />
      </Container>
    </Section>
  );
}
