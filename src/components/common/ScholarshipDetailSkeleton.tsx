import { systemCopy } from "@/data";
import { Container, Section } from "@/layout";
import { Skeleton } from "@/components/ui/skeleton";

export function ScholarshipDetailSkeleton() {
  return (
    <>
      <Section spacing="lg" aria-busy="true">
        <Container>
          <div role="status" className="mx-auto max-w-3xl text-center">
            <span className="sr-only">{systemCopy.loading}</span>

            <div className="flex flex-col items-center gap-3" aria-hidden="true">
              <Skeleton className="h-10 w-72 max-w-full" />
              <Skeleton className="h-5 w-full max-w-xl" />
              <Skeleton className="mt-2 h-10 w-36" />
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" aria-busy="true">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12" aria-hidden="true">
            <div className="space-y-8 lg:col-span-8">
              <div className="space-y-4">
                <Skeleton className="h-8 w-40" />
                <div className="grid gap-5 md:grid-cols-2">
                  <Skeleton className="h-24 w-full rounded-xl" />
                  <Skeleton className="h-24 w-full rounded-xl" />
                  <Skeleton className="h-24 w-full rounded-xl" />
                  <Skeleton className="h-24 w-full rounded-xl" />
                </div>
              </div>

              <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-40 w-full rounded-xl" />
              </div>

              <div className="space-y-4">
                <Skeleton className="h-8 w-36" />
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="space-y-4 rounded-xl p-5 ring-1 ring-foreground/10 bg-card">
                <Skeleton className="h-7 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="space-y-3 pt-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-5 w-4/5" />
                </div>
                <Skeleton className="mt-2 h-10 w-full" />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
