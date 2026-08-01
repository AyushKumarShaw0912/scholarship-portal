import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { Scholarship } from "@/types";

import { siteConfig } from "@/config";
import { uiCopy } from "@/data";
import { ROUTES } from "@/constants/routes";
import { Container, Section } from "@/layout";
import { CtaLink } from "@/components/actions/CtaLink";

interface ScholarshipHeaderProps {
  readonly scholarship: Scholarship;
}

export function ScholarshipHeader({ scholarship }: ScholarshipHeaderProps) {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-4xl">
          <Link
            href={ROUTES.SCHOLARSHIPS}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            {uiCopy.backToScholarships}
          </Link>

          <div className="mt-8 space-y-6">
            <div className="inline-flex rounded-full border bg-primary/5 px-4 py-1 text-sm font-medium text-primary">
              {uiCopy.scholarshipProgram}
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {scholarship.title}
            </h1>

            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              {scholarship.description}
            </p>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <CtaLink
                href={siteConfig.applyUrl}
                label={uiCopy.applyNow}
                appearance="hero"
                external
                showExternalIcon
              />

              <CtaLink
                href={ROUTES.CONTACT}
                label={uiCopy.contactUs}
                appearance="outline"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
