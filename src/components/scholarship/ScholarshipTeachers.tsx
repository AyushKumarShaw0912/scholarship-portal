import type { Scholarship } from "@/types";

import { scholarshipPageContent } from "@/data";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ContentCard } from "@/components/common/ContentCard";

interface ScholarshipTeachersProps {
  readonly scholarship: Scholarship;
}

export function ScholarshipTeachers({ scholarship }: ScholarshipTeachersProps) {
  return (
    <div>
      <SectionHeading
        title={scholarshipPageContent.detail.sectionTitles.faculty}
        align="left"
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {scholarship.teachers.map((teacher) => (
          <ContentCard key={teacher.subject} hover="lift" className="p-5">
            <p className="text-sm text-muted-foreground">{teacher.subject}</p>

            <h3 className="mt-2 font-semibold">{teacher.name}</h3>
          </ContentCard>
        ))}
      </div>
    </div>
  );
}
