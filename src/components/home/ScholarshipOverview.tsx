import { homeContent, scholarships } from "@/data";

import { Container, Section } from "@/layout";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScholarshipList } from "@/components/scholarship/ScholarshipList";
import { Reveal } from "../common/Reveal";

export function ScholarshipOverview() {
  const { sections } = homeContent;

  return (
    <Section spacing="lg">
      <Container>
        <Reveal>
          <SectionHeading
            title={sections.scholarships.title}
            description={sections.scholarships.description}
          />

          <ScholarshipList
            scholarships={scholarships}
            className="mt-8 lg:grid-cols-2"
          />
        </Reveal>
      </Container>
    </Section>
  );
}
