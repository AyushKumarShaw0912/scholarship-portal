import { getScholarships } from "@/lib/cms";

import { Reveal } from "@/components/common/Reveal";
import { Container, Section } from "@/layout";

import { ScholarshipList } from "./ScholarshipList";

export async function ScholarshipGrid() {
  const scholarships = await getScholarships();

  return (
    <Section>
      <Container>
        <Reveal>
          <ScholarshipList
            scholarships={scholarships}
            className="md:grid-cols-2"
          />
        </Reveal>
      </Container>
    </Section>
  );
}
