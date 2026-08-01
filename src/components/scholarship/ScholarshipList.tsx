import type { Scholarship } from "@/types";

import { cn } from "@/lib/utils";

import { ScholarshipCard } from "./ScholarshipCard";

interface ScholarshipListProps {
  readonly scholarships: readonly Scholarship[];
  readonly className?: string;
}

export function ScholarshipList({
  scholarships,
  className,
}: ScholarshipListProps) {
  return (
    <div className={cn("grid gap-8", className)}>
      {scholarships.map((scholarship) => (
        <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
      ))}
    </div>
  );
}
