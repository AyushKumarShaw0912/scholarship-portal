import { getFaqHomePreview, homeContent, uiCopy } from "@/data";
import { ROUTES } from "@/constants/routes";

import { CtaLink } from "@/components/actions/CtaLink";
import { FaqList } from "@/components/common/FaqList";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container, Section } from "@/layout";

export function HomeFaqs() {
  const { sections } = homeContent;
  const items = getFaqHomePreview();

  return (
    <Section spacing="lg">
      <Container>
        <Reveal>
          <SectionHeading
            title={sections.faqs.title}
            description={sections.faqs.description}
          />

          <FaqList items={items} className="mx-auto mt-8 max-w-4xl" />

          <div className="mt-8 flex justify-center">
            <CtaLink
              href={ROUTES.FAQ}
              label={uiCopy.viewAllFaqs}
              appearance="outline"
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
