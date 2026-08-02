import { getActiveScholarships, getHomeContent } from "@/lib/cms";

import { Container, Section } from "@/layout";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScholarshipList } from "@/components/scholarship/ScholarshipList";
import { Reveal } from "../common/Reveal";

export async function ScholarshipOverview() {
  const [{ sections }, scholarships] = await Promise.all([
    getHomeContent(),
    getActiveScholarships(),
  ]);

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
