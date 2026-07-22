import type { Scholarship } from "@/types";

import { SectionHeading } from "@/components/common/SectionHeading";

interface ScholarshipSelectionProcessProps {
  readonly scholarship: Scholarship;
}

export function ScholarshipSelectionProcess({
  scholarship,
}: ScholarshipSelectionProcessProps) {
  return (
    <>
      <>
        <SectionHeading title="Selection Process" align="left" />

        <div className="mt-10 space-y-5">
          {scholarship.selectionProcess.map((step, index) => (
            <article
              key={step}
              className="flex gap-5 rounded-2xl border bg-card p-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                {index + 1}
              </div>

              <p className="leading-7">{step}</p>
            </article>
          ))}
        </div>
      </>
    </>
  );
}
