import { getHomeContent, getSiteSettings } from "@/lib/cms";
import { ROUTES } from "@/constants/routes";
import { Container, Section } from "@/layout";
import { StatCard } from "@/components/common/StatCard";
import { CtaLink } from "@/components/actions/CtaLink";

export async function Hero() {
  const [{ hero }, site] = await Promise.all([
    getHomeContent(),
    getSiteSettings(),
  ]);

  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="motion-enter inline-flex rounded-full border bg-muted/80 px-4 py-1 text-sm font-medium">
            {hero.badge}
          </span>

          <h1 className="motion-enter motion-delay-1 mt-6 text-5xl font-extrabold tracking-tight md:text-6xl">
            {hero.title}

            <span className="block text-primary">{hero.highlightedTitle}</span>
          </h1>

          <p className="motion-enter motion-delay-2 mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {hero.description}
          </p>

          <div className="motion-enter motion-delay-3 mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <CtaLink
              href={site.applyUrl}
              label={hero.primaryCta}
              appearance="hero"
              external
            />

            <CtaLink
              href={ROUTES.SCHOLARSHIPS}
              label={hero.secondaryCta}
              appearance="outline"
            />
          </div>

          <div className="motion-enter motion-delay-4 mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
