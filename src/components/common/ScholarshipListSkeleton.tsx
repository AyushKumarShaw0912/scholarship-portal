import { systemCopy } from "@/data";
import { Container, Section } from "@/layout";
import { Skeleton } from "@/components/ui/skeleton";

function ScholarshipCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 overflow-hidden rounded-xl ring-1 ring-foreground/10 bg-card p-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="mt-2 border-t pt-3">
        <Skeleton className="h-9 w-28" />
      </div>
    </div>
  );
}

export function ScholarshipListSkeleton() {
  return (
    <Section spacing="lg" aria-busy="true">
      <Container>
        <div role="status">
          <span className="sr-only">{systemCopy.loading}</span>

          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3" aria-hidden="true">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-5 w-full max-w-md" />
          </div>

          <div
            className="mt-8 grid gap-6 md:grid-cols-2"
            aria-hidden="true"
          >
            <ScholarshipCardSkeleton />
            <ScholarshipCardSkeleton />
          </div>
        </div>
      </Container>
    </Section>
  );
}
