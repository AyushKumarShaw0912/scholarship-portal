import { SectionHeading } from "@/components/common/SectionHeading";
import { Container, Section } from "@/layout";

export function ScholarshipHero() {
  return (
    <Section spacing="lg">
      <Container>
        <SectionHeading
          title="Scholarships"
          align="left"
          description="Explore our scholarship programs designed to support talented students pursuing science education and competitive entrance examination preparation."
        />
      </Container>
    </Section>
  );
}
