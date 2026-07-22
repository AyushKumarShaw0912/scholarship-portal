import { scholarships } from "@/data";

import { Container, Section } from "@/layout";

import { SectionHeading } from "@/components/common/SectionHeading";
import { ScholarshipCard } from "@/components/scholarship/ScholarshipCard";

export function ScholarshipOverview() {
  return (
    <Section spacing="lg">
      <Container>
        <SectionHeading
          title="Available Scholarships"
          description="Explore our scholarship opportunities designed to support talented students pursuing science education."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {scholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
