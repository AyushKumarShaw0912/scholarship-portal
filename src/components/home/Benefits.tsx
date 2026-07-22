import { homeContent } from "@/data";

import { Container, Section } from "@/layout";
import { SectionHeading } from "@/components/common/SectionHeading";

export function Benefits() {
  return (
    <Section spacing="lg">
      <Container>
        <SectionHeading
          title="Why Choose Our Scholarship?"
          description="We provide much more than financial assistance."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {homeContent.benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.title}
                className="rounded-2xl border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                  <Icon className="size-6" />
                </div>

                <h3 className="text-lg font-semibold">{benefit.title}</h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {benefit.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
