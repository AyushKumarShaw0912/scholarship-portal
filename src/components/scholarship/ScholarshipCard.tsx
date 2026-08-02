import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Scholarship } from "@/types";

import { uiCopy } from "@/data";
import { ROUTES } from "@/constants/routes";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CtaLink } from "@/components/actions/CtaLink";
import { getApplyPath } from "@/lib/apply";

interface ScholarshipCardProps {
  readonly scholarship: Scholarship;
}

export function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  return (
    <Card className="motion-lift group relative flex h-full flex-col overflow-hidden bg-card/90 backdrop-blur-[2px]">
      <CardHeader>
        <CardTitle className="text-xl">
          <Link
            href={`${ROUTES.SCHOLARSHIPS}/${scholarship.slug}`}
            className="after:absolute after:inset-0"
          >
            {scholarship.title}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="leading-7 text-muted-foreground">
          {scholarship.shortDescription}
        </p>
      </CardContent>

      <CardFooter className="relative z-10 flex items-center justify-between border-t pt-6">
        <Link
          href={`${ROUTES.SCHOLARSHIPS}/${scholarship.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-[gap] duration-200 group-hover:gap-3"
        >
          {uiCopy.learnMore}
          <ArrowRight className="size-4" />
        </Link>

        <CtaLink
          href={getApplyPath()}
          label={uiCopy.apply}
          appearance="card"
        />
      </CardFooter>
    </Card>
  );
}
