import { homeContent } from "@/data";

import { Container, Section } from "@/layout";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FeatureCard } from "@/components/common/FeatureCard";
import { Reveal } from "../common/Reveal";

export function Benefits() {
  const { benefits, sections } = homeContent;

  return (
    <Section spacing="lg">
      <Container>
        <Reveal>
          <SectionHeading
            title={sections.benefits.title}
            description={sections.benefits.description}
          />

          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit) => (
              <FeatureCard
                key={benefit.title}
                title={benefit.title}
                description={benefit.description}
                icon={benefit.icon}
              />
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
