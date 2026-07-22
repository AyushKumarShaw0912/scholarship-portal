import { CheckCircle2, Circle } from "lucide-react";

import type { Scholarship } from "@/types";

import { SectionHeading } from "@/components/common/SectionHeading";

interface ScholarshipDocumentsProps {
  readonly scholarship: Scholarship;
}

export function ScholarshipDocuments({
  scholarship,
}: ScholarshipDocumentsProps) {
  return (
    <>
      <>
        <SectionHeading title="Required Documents" align="left" />

        <div className="mt-10 rounded-2xl border bg-card p-8">
          <div className="space-y-6">
            {scholarship.requiredDocuments.map((document) => (
              <div key={document.id} className="flex items-start gap-4">
                {document.required ? (
                  <CheckCircle2 className="mt-1 size-5 text-primary" />
                ) : (
                  <Circle className="mt-1 size-5 text-muted-foreground" />
                )}

                <div>
                  <p className="font-medium">{document.title}</p>

                  <p className="text-sm text-muted-foreground">
                    {document.required ? "Required" : "Optional"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    </>
  );
}
