import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Scholarship } from "@/types";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ScholarshipCardProps {
  readonly scholarship: Scholarship;
}

export function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">
          <Link
            href={`/scholarships/${scholarship.slug}`}
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
          href={`/scholarships/${scholarship.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3"
        >
          Learn More
          <ArrowRight className="size-4" />
        </Link>

        <a
          href={scholarship.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Apply
        </a>
      </CardFooter>
    </Card>
  );
}
