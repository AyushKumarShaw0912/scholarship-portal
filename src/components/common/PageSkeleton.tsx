import { systemCopy } from "@/data";
import { Container, Section } from "@/layout";
import { Skeleton } from "@/components/ui/skeleton";

export function PageSkeleton() {
  return (
    <Section spacing="lg" aria-busy="true">
      <Container>
        <div role="status" className="mx-auto max-w-4xl">
          <span className="sr-only">{systemCopy.loading}</span>

          <div className="flex flex-col items-center gap-3" aria-hidden="true">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-full max-w-xl" />
          </div>

          <div className="mx-auto mt-8 max-w-4xl space-y-4" aria-hidden="true">
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
