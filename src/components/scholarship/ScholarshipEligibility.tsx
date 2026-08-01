import type { Scholarship } from "@/types";

import { scholarshipPageContent } from "@/data";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Checklist } from "@/components/common/Checklist";

interface ScholarshipEligibilityProps {
  readonly scholarship: Scholarship;
}

export function ScholarshipEligibility({
  scholarship,
}: ScholarshipEligibilityProps) {
  return (
    <div>
      <SectionHeading
        title={scholarshipPageContent.detail.sectionTitles.eligibility}
        align="left"
      />

      <div className="mt-8">
        <Checklist items={scholarship.eligibility} />
      </div>
    </div>
  );
}
