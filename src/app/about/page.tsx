import type { Metadata } from "next";

import { siteConfig } from "@/config";
import { aboutContent } from "@/data";

import { Container, Section } from "@/layout";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";

export const metadata: Metadata = {
  title: `${aboutContent.meta.title} | ${siteConfig.name}`,
  description: aboutContent.meta.description,
};

export default function AboutPage() {
  const { heading, sections } = aboutContent;

  return (
    <Section spacing="lg">
      <Container>
        <Reveal>
          <SectionHeading
            title={heading.title}
            description={heading.description}
          />

          <div className="mx-auto mt-8 max-w-4xl space-y-6 text-muted-foreground">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  {section.title}
                </h2>

                {"body" in section && section.body ? (
                  <p className="leading-8">{section.body}</p>
                ) : null}

                {"items" in section && section.items ? (
                  <ul className="list-disc space-y-2 pl-6 leading-8">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
