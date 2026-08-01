import type { Scholarship } from "@/types";

import { getScholarshipPageContent } from "@/lib/cms";
import { SectionHeading } from "@/components/common/SectionHeading";
import { NumberedStepList } from "@/components/common/NumberedStepList";

interface ScholarshipSelectionProcessProps {
  readonly scholarship: Scholarship;
}

export async function ScholarshipSelectionProcess({
  scholarship,
}: ScholarshipSelectionProcessProps) {
  const pageContent = await getScholarshipPageContent();

  return (
    <div>
      <SectionHeading
        title={pageContent.detail.sectionTitles.selectionProcess}
        align="left"
      />

      <div className="mt-8">
        <NumberedStepList steps={scholarship.selectionProcess} />
      </div>
    </div>
  );
}
