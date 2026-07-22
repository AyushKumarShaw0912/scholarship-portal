import Link from "next/link";

import { siteConfig } from "@/config";
import { scholarships } from "@/data/scholarships";

import { Container, Section } from "@/layout";
import { Button } from "@/components/ui/button";

import { StatCard } from "@/components/common/StatCard";

export function Hero() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border bg-muted px-4 py-1 text-sm font-medium">
            Science Scholarships • Class XI & XII
          </span>

          <h1 className="mt-6 text-5xl font-extrabold tracking-tight md:text-6xl">
            Empowering Future
            <span className="block text-primary">Science Scholars</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Full coaching scholarships for deserving students. Build your future
            with expert faculty, complete tuition support and career guidance.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg">
              <Link
                href={siteConfig.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </Link>
            </Button>

            <Button size="lg" variant="outline">
              <Link href="/scholarships">View Scholarships</Link>
            </Button>
          </div>

          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              value={String(scholarships.length)}
              label="Scholarships"
            />

            <StatCard value="100%" label="Tuition Covered" />

            <StatCard value="4" label="Expert Faculty" />

            <StatCard value="1" label="Selection Exam" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
