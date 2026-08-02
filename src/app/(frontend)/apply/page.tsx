import type { Metadata } from "next";

import { ApplyForm } from "@/components/apply/ApplyForm";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { getApplyContent, getSiteSettings } from "@/lib/cms";
import { Container, Section } from "@/layout";

export async function generateMetadata(): Promise<Metadata> {
  const [site, apply] = await Promise.all([
    getSiteSettings(),
    getApplyContent(),
  ]);

  return {
    title: `${apply.meta.title} | ${site.name}`,
    description: apply.meta.description,
  };
}

export default async function ApplyPage() {
  const apply = await getApplyContent();

  return (
    <Section spacing="lg">
      <Container>
        <Reveal>
          <SectionHeading
            title={apply.heading.title}
            description={apply.heading.description}
          />

          <div className="mx-auto mt-10 max-w-2xl">
            <ApplyForm content={apply.form} />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
