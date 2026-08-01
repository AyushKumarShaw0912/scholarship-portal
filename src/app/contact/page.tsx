import type { Metadata } from "next";

import { siteConfig } from "@/config";
import { contactContent } from "@/data";

import { Container, Section } from "@/layout";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { ContentCard } from "@/components/common/ContentCard";

export const metadata: Metadata = {
  title: `${contactContent.meta.title} | ${siteConfig.name}`,
  description: contactContent.meta.description,
};

export default function ContactPage() {
  const { heading, infoItems, enquiry } = contactContent;

  return (
    <Section spacing="lg">
      <Container>
        <Reveal>
          <SectionHeading
            title={heading.title}
            description={heading.description}
          />

          <div className="mx-auto mt-8 grid max-w-4xl gap-6 md:grid-cols-2">
            {infoItems.map((item) => {
              const Icon = item.icon;

              return (
                <ContentCard key={item.id} hover="lift" className="p-6">
                  <Icon className="mb-4 size-6 text-primary" />

                  <h2 className="text-xl font-semibold">{item.title}</h2>

                  {item.type === "email" ? (
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="mt-4 block text-muted-foreground transition-colors hover:text-primary"
                    >
                      {siteConfig.email}
                    </a>
                  ) : (
                    <p className="mt-4 text-muted-foreground">
                      {item.lines?.map((line, index) => (
                        <span key={line}>
                          {index > 0 ? <br /> : null}
                          {line}
                        </span>
                      ))}
                    </p>
                  )}
                </ContentCard>
              );
            })}
          </div>

          <ContentCard
            as="div"
            hover="shadow"
            className="mx-auto mt-8 max-w-4xl p-6"
          >
            <h2 className="text-xl font-semibold">{enquiry.title}</h2>

            <p className="mt-4 leading-8 text-muted-foreground">
              {enquiry.body}
            </p>
          </ContentCard>
        </Reveal>
      </Container>
    </Section>
  );
}
