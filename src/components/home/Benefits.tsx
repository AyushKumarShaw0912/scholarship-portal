import { getHomeContent } from "@/lib/cms";

import { Container, Section } from "@/layout";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FeatureCard } from "@/components/common/FeatureCard";
import { Reveal } from "../common/Reveal";

export async function Benefits() {
  const { benefits, sections } = await getHomeContent();

  return (
    <Section spacing="lg">
      <Container>
        <Reveal>
          <SectionHeading
            title={sections.benefits.title}
            description={sections.benefits.description}
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
