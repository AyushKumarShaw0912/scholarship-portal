import { scholarships } from "@/data";

import { Container, Section } from "@/layout";

import { ScholarshipCard } from "./ScholarshipCard";

export function ScholarshipGrid() {
  return (
    <Section>
      <Container>
        <div className="grid gap-8 md:grid-cols-2">
          {scholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
