import { scholarshipPageContent } from "@/data";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container, Section } from "@/layout";

export function ScholarshipHero() {
  const { list } = scholarshipPageContent;

  return (
    <Section spacing="lg">
      <Container>
        <div className="motion-enter">
          <SectionHeading title={list.title} description={list.description} />
        </div>
      </Container>
    </Section>
  );
}
