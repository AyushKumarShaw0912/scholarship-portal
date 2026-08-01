import { scholarships } from "@/data";

import { Reveal } from "@/components/common/Reveal";
import { Container, Section } from "@/layout";

import { ScholarshipList } from "./ScholarshipList";

export function ScholarshipGrid() {
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
