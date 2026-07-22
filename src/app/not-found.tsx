import Link from "next/link";
import { SearchX } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Container, Section } from "@/layout";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <SearchX className="size-20 text-primary" />

          <h1 className="mt-8 text-5xl font-bold">404</h1>

          <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>

          <p className="mt-4 text-muted-foreground">
            The page you are looking for doesn&apos;t exist or may have been
            moved.
          </p>

          <div className="mt-8 flex gap-4">
            <Link href="/" className={cn(buttonVariants())}>
              Back to Home
            </Link>

            <Link
              href="/scholarships"
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
              )}
            >
              Scholarships
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
