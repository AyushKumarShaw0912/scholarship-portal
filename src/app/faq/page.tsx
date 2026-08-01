import type { Metadata } from "next";

import { siteConfig } from "@/config";
import { faqContent } from "@/data";

import { FaqList } from "@/components/common/FaqList";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container, Section } from "@/layout";

export const metadata: Metadata = {
  title: `${faqContent.meta.title} | ${siteConfig.name}`,
  description: faqContent.meta.description,
};

export default function FaqPage() {
  const { heading, items } = faqContent;

  return (
    <Section spacing="lg">
      <Container>
        <Reveal>
          <SectionHeading
            title={heading.title}
            description={heading.description}
          />

          <FaqList items={items} className="mx-auto mt-12 max-w-4xl" />
        </Reveal>
      </Container>
    </Section>
  );
}
