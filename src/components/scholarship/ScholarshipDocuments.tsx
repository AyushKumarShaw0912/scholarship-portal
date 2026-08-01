import { CheckCircle2, Circle } from "lucide-react";

import type { Scholarship } from "@/types";

import { scholarshipPageContent, uiCopy } from "@/data";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ContentCard } from "@/components/common/ContentCard";

interface ScholarshipDocumentsProps {
  readonly scholarship: Scholarship;
}

export function ScholarshipDocuments({
  scholarship,
}: ScholarshipDocumentsProps) {
  return (
    <div>
      <SectionHeading
        title={scholarshipPageContent.detail.sectionTitles.documents}
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
