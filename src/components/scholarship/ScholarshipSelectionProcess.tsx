import type { Scholarship } from "@/types";

import { scholarshipPageContent } from "@/data";
import { SectionHeading } from "@/components/common/SectionHeading";
import { NumberedStepList } from "@/components/common/NumberedStepList";

interface ScholarshipSelectionProcessProps {
  readonly scholarship: Scholarship;
}

export function ScholarshipSelectionProcess({
  scholarship,
}: ScholarshipSelectionProcessProps) {
  return (
    <div>
      <SectionHeading
        title={scholarshipPageContent.detail.sectionTitles.selectionProcess}
        align="left"
      />

      <div className="mt-10">
        <NumberedStepList steps={scholarship.selectionProcess} />
      </div>
    </div>
  );
}
