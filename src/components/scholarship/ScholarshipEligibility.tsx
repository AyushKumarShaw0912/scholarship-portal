import { Check } from "lucide-react";

import type { Scholarship } from "@/types";

import { SectionHeading } from "@/components/common/SectionHeading";

interface ScholarshipEligibilityProps {
  readonly scholarship: Scholarship;
}

export function ScholarshipEligibility({
  scholarship,
}: ScholarshipEligibilityProps) {
  return (
    <>
      <>
        <SectionHeading title="Eligibility" align="left" />

        <div className="mt-10 rounded-2xl border bg-card p-8">
          <ul className="space-y-5">
            {scholarship.eligibility.map((item) => (
              <li key={item} className="flex items-start gap-4">
                <Check className="mt-1 size-5 text-primary" />

                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </>
    </>
  );
}
