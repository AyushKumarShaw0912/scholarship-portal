import type { Scholarship } from "@/types";

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
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-16 lg:col-span-8">
            <ScholarshipBenefits scholarship={scholarship} />

            <ScholarshipEligibility scholarship={scholarship} />

            <ScholarshipTeachers scholarship={scholarship} />

            <ScholarshipDocuments scholarship={scholarship} />

            <ScholarshipSelectionProcess scholarship={scholarship} />
          </div>

          <div className="lg:col-span-4">
            <ScholarshipSidebar scholarship={scholarship} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
