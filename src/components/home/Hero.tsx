import Link from "next/link";

import { homeContent } from "@/data";
import { Container, Section } from "@/layout";
import { StatCard } from "@/components/common/StatCard";
import { siteConfig } from "@/config";

export function Hero() {
  const { hero } = homeContent;

  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border bg-muted px-4 py-1 text-sm font-medium">
            {hero.badge}
          </span>

          <h1 className="mt-6 text-5xl font-extrabold tracking-tight md:text-6xl">
            {hero.title}

            <span className="block text-primary">{hero.highlightedTitle}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={siteConfig.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Apply Now
            </Link>

            <Link
              href="/scholarships"
              className="inline-flex h-11 items-center justify-center rounded-lg border px-8 text-sm font-medium transition-colors hover:bg-accent"
            >
              View Scholarships
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hero.stats.map((stat) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
