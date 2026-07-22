import { homeContent } from "@/data";

import { Container, Section } from "@/layout";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "../common/Reveal";

export function ApplicationProcess() {
  return (
    <Section spacing="lg">
      <Container>
        <Reveal>
          <SectionHeading
            title="Application Process"
            description="A simple four-step process to apply."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {homeContent.applicationSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-2xl border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </div>

                <h3 className="text-lg font-semibold">{step.title}</h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
