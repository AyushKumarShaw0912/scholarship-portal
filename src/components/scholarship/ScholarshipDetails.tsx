import type { Scholarship } from "@/types";

import { Reveal } from "@/components/common/Reveal";
import { Container, Section } from "@/layout";

import { ScholarshipBenefits } from "./ScholarshipBenefits";
import { ScholarshipDocuments } from "./ScholarshipDocuments";
import { ScholarshipEligibility } from "./ScholarshipEligibility";
import { ScholarshipSelectionProcess } from "./ScholarshipSelectionProcess";
import { ScholarshipSidebar } from "./ScholarshipSidebar";
import { ScholarshipTeachers } from "./ScholarshipTeachers";

interface ScholarshipDetailsProps {
  readonly scholarship: Scholarship;
}

export function ScholarshipDetails({ scholarship }: ScholarshipDetailsProps) {
  return (
    <Section spacing="lg">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            <Reveal>
              <ScholarshipBenefits scholarship={scholarship} />
            </Reveal>

            <Reveal delay={0.05}>
              <ScholarshipEligibility scholarship={scholarship} />
            </Reveal>

            <Reveal delay={0.05}>
              <ScholarshipTeachers scholarship={scholarship} />
            </Reveal>

            <Reveal delay={0.05}>
              <ScholarshipDocuments scholarship={scholarship} />
            </Reveal>

            <Reveal delay={0.05}>
              <ScholarshipSelectionProcess scholarship={scholarship} />
            </Reveal>
          </div>

          <div className="lg:col-span-4">
            <Reveal>
              <ScholarshipSidebar />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
