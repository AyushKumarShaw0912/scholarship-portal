"use client";

import { useEffect } from "react";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Container, Section } from "@/layout";
import { cn } from "@/lib/utils";

interface ErrorPageProps {
  readonly error: Error & {
    digest?: string;
  };
  readonly reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <TriangleAlert className="size-20 text-destructive" />

          <h1 className="mt-8 text-3xl font-bold">Something went wrong</h1>

          <p className="mt-4 text-muted-foreground">
            An unexpected error occurred while loading this page.
          </p>

          <div className="mt-8 flex gap-4">
            <button onClick={reset} className={cn(buttonVariants())}>
              Try Again
            </button>

            <Link
              href="/"
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
              )}
            >
              Home
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
