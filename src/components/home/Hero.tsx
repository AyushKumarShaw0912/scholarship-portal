import { getHomeContent } from "@/lib/cms";
import { getApplyPath } from "@/lib/apply";
import { ROUTES } from "@/constants/routes";
import { Container, Section } from "@/layout";
import { StatCard } from "@/components/common/StatCard";
import { CtaLink } from "@/components/actions/CtaLink";

export async function Hero() {
  const { hero } = await getHomeContent();
  const showAnnouncement =
    hero.announcementEnabled && Boolean(hero.announcementMessage?.trim());

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

          {showAnnouncement ? (
            <div className="motion-enter motion-delay-3 mx-auto mt-8 max-w-xl">
              <div
                className="announcement-banner relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 px-5 py-3.5"
                role="status"
              >
                <div
                  className="announcement-sheen pointer-events-none absolute inset-0"
                  aria-hidden
                />
                <div className="relative flex items-center justify-center gap-3">
                  <span
                    className="announcement-pulse relative flex size-2.5 shrink-0"
                    aria-hidden
                  >
                    <span className="absolute inline-flex size-full rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
                  </span>
                  <p className="text-sm font-semibold tracking-wide text-primary sm:text-base">
                    {hero.announcementMessage}
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="motion-enter motion-delay-4 mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <CtaLink
              href={getApplyPath()}
              label={hero.primaryCta}
              appearance="hero"
            />

            <CtaLink
              href={ROUTES.SCHOLARSHIPS}
              label={hero.secondaryCta}
              appearance="outline"
            />
          </div>

          <div className="motion-enter motion-delay-5 mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
