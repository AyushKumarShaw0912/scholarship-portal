import { homeContent } from "@/data";

import { Container, Section } from "@/layout";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StepCard } from "@/components/common/StepCard";
import { Reveal } from "../common/Reveal";

export function ApplicationProcess() {
  const { applicationSteps, sections } = homeContent;

  return (
    <Section spacing="lg">
      <Container>
        <Reveal>
          <SectionHeading
            title={sections.applicationProcess.title}
            description={sections.applicationProcess.description}
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {applicationSteps.map((step, index) => (
              <StepCard
                key={step.title}
                step={index + 1}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
