import { CheckCircle2 } from "lucide-react";

import type { Scholarship } from "@/types";

import { getScholarshipPageContent } from "@/lib/cms";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ContentCard } from "@/components/common/ContentCard";

interface ScholarshipBenefitsProps {
  readonly scholarship: Scholarship;
}

export async function ScholarshipBenefits({
  scholarship,
}: ScholarshipBenefitsProps) {
  const pageContent = await getScholarshipPageContent();

  return (
    <div>
      <SectionHeading
        title={pageContent.detail.sectionTitles.benefits}
        align="left"
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {scholarship.benefits.map((benefit) => (
          <ContentCard key={benefit.id} hover="lift" className="p-5">
            <div className="flex items-start gap-3">
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
          </ContentCard>
        ))}
      </div>
    </div>
  );
}
