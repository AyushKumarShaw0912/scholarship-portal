import type { Metadata } from "next";

import { getFaqContent, getSiteSettings } from "@/lib/cms";

import { FaqList } from "@/components/common/FaqList";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container, Section } from "@/layout";

export async function generateMetadata(): Promise<Metadata> {
  const [faq, site] = await Promise.all([getFaqContent(), getSiteSettings()]);

  return {
    title: `${faq.meta.title} | ${site.name}`,
    description: faq.meta.description,
  };
}

export default async function FaqPage() {
  const { heading, items } = await getFaqContent();

  return (
    <Section spacing="lg">
      <Container>
        <Reveal>
          <SectionHeading
            title={heading.title}
            description={heading.description}
          />

          <FaqList items={items} className="mx-auto mt-8 max-w-4xl" />
        </Reveal>
      </Container>
    </Section>
  );
}
