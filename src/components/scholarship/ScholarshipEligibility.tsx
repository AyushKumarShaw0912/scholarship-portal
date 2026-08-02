import type { Scholarship } from "@/types";

import { getScholarshipPageContent } from "@/lib/cms";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Checklist } from "@/components/common/Checklist";

interface ScholarshipEligibilityProps {
  readonly scholarship: Scholarship;
}

export async function ScholarshipEligibility({
  scholarship,
}: ScholarshipEligibilityProps) {
  const pageContent = await getScholarshipPageContent();

  return (
    <div>
      <SectionHeading
        title={pageContent.detail.sectionTitles.eligibility}
        align="left"
      />

      <div className="mt-8">
        <Checklist items={scholarship.eligibility} />
      </div>
    </div>
  );
}
