import type { Scholarship } from "@/types";

import { SectionHeading } from "@/components/common/SectionHeading";

interface ScholarshipTeachersProps {
  readonly scholarship: Scholarship;
}

export function ScholarshipTeachers({ scholarship }: ScholarshipTeachersProps) {
  return (
    <>
      <>
        <SectionHeading title="Faculty" align="left" />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {scholarship.teachers.map((teacher) => (
            <article
              key={teacher.subject}
              className="rounded-2xl border bg-card p-6"
            >
              <p className="text-sm text-muted-foreground">{teacher.subject}</p>

              <h3 className="mt-2 font-semibold">{teacher.name}</h3>
            </article>
          ))}
        </div>
      </>
    </>
  );
}
