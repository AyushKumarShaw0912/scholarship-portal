import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

import type { Scholarship } from "@/types";

import { siteConfig } from "@/config";
import { Container, Section } from "@/layout";

interface ScholarshipHeaderProps {
  readonly scholarship: Scholarship;
}

export function ScholarshipHeader({ scholarship }: ScholarshipHeaderProps) {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-4xl">
          <Link
            href="/scholarships"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to Scholarships
          </Link>

          <div className="mt-8 space-y-6">
            <div className="inline-flex rounded-full border bg-primary/5 px-4 py-1 text-sm font-medium text-primary">
              Scholarship Program
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {scholarship.title}
            </h1>

            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              {scholarship.description}
            </p>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <a
                href={siteConfig.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Apply Now
                <ExternalLink className="ml-2 size-4" />
              </a>

              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-lg border px-8 text-sm font-medium transition-colors hover:bg-accent"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
