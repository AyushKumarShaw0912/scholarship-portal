import { scholarships } from "@/data";

import { Container, Section } from "@/layout";

import { ScholarshipList } from "./ScholarshipList";

export function ScholarshipGrid() {
  return (
    <Section>
      <Container>
        <ScholarshipList
          scholarships={scholarships}
          className="md:grid-cols-2"
        />
      </Container>
    </Section>
  );
}
