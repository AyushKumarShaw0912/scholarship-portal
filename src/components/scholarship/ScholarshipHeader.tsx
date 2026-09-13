import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { Scholarship } from "@/types";

import { uiCopy } from "@/data";
import { getApplyPath } from "@/lib/apply";
import { ROUTES } from "@/constants/routes";
import { Container, Section } from "@/layout";
import { CtaLink } from "@/components/actions/CtaLink";

import { ScholarshipLogo } from "./ScholarshipLogo";

interface ScholarshipHeaderProps {
  readonly scholarship: Scholarship;
}

export async function ScholarshipHeader({
  scholarship,
}: ScholarshipHeaderProps) {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-4xl">
          <Link
            href={ROUTES.SCHOLARSHIPS}
            className="motion-enter inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            {uiCopy.backToScholarships}
          </Link>

          <div className="mt-8 space-y-6">
            <div className="motion-enter motion-delay-1 flex flex-wrap items-center gap-3">
              <ScholarshipLogo
                title={scholarship.title}
                logoUrl={scholarship.logoUrl}
                size="lg"
              />
              <div className="inline-flex rounded-full border bg-primary/5 px-4 py-1 text-sm font-medium text-primary">
                {uiCopy.scholarshipProgram}
              </div>
            </div>

            <h1 className="motion-enter motion-delay-2 text-4xl font-bold tracking-tight md:text-5xl">
              {scholarship.title}
            </h1>

            <p className="motion-enter motion-delay-3 max-w-3xl text-lg leading-8 text-muted-foreground">
              {scholarship.description}
            </p>

            <div className="motion-enter motion-delay-4 flex flex-col gap-4 pt-4 sm:flex-row">
              <CtaLink
                href={getApplyPath()}
                label={uiCopy.applyNow}
                appearance="hero"
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
