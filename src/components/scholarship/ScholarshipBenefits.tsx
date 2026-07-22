import { CheckCircle2 } from "lucide-react";

import type { Scholarship } from "@/types";

import { SectionHeading } from "@/components/common/SectionHeading";

interface ScholarshipBenefitsProps {
  readonly scholarship: Scholarship;
}

export function ScholarshipBenefits({ scholarship }: ScholarshipBenefitsProps) {
  return (
    <>
      <>
        <SectionHeading title="Scholarship Benefits" align="left" />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {scholarship.benefits.map((benefit) => (
            <article
              key={benefit.id}
              className="rounded-2xl border bg-card p-6"
            >
              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 size-5 text-primary" />

                <div>
                  <h3 className="font-semibold">{benefit.title}</h3>

                  {benefit.description && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </>
    </>
  );
}
