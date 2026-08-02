import { CheckCircle2, Circle } from "lucide-react";

import type { Scholarship } from "@/types";

import { uiCopy } from "@/data";
import { getScholarshipPageContent } from "@/lib/cms";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ContentCard } from "@/components/common/ContentCard";

interface ScholarshipDocumentsProps {
  readonly scholarship: Scholarship;
}

export async function ScholarshipDocuments({
  scholarship,
}: ScholarshipDocumentsProps) {
  const pageContent = await getScholarshipPageContent();

  return (
    <div>
      <SectionHeading
        title={pageContent.detail.sectionTitles.documents}
        align="left"
      />

      <ContentCard as="div" className="mt-8 p-6">
        <div className="space-y-5">
          {scholarship.requiredDocuments.map((document) => (
            <div key={document.id} className="flex items-start gap-3">
              {document.required ? (
                <CheckCircle2 className="mt-1 size-5 text-primary" />
              ) : (
                <Circle className="mt-1 size-5 text-muted-foreground" />
              )}

              <div>
                <p className="font-medium">{document.title}</p>

                {document.description ? (
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {document.description}
                  </p>
                ) : null}

                <p className="text-sm text-muted-foreground">
                  {document.required ? uiCopy.required : uiCopy.optional}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ContentCard>
    </div>
  );
}
