import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Scholarship } from "@/types";

import { Button } from "@/components/ui/button";
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
    <Card className="flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">{scholarship.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm leading-6 text-muted-foreground">
          {scholarship.shortDescription}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between gap-4">
        <Button variant="outline">
          <Link
            href={`/scholarships/${scholarship.slug}`}
            className="flex items-center gap-2"
          >
            Learn More
            <ArrowRight className="size-4" />
          </Link>
        </Button>

        <Button>
          <Link
            href={scholarship.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
