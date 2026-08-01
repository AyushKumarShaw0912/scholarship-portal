import type { Metadata } from "next";

import { getContactContent, getSiteSettings } from "@/lib/cms";

import { Container, Section } from "@/layout";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { ContentCard } from "@/components/common/ContentCard";

export async function generateMetadata(): Promise<Metadata> {
  const [contact, site] = await Promise.all([
    getContactContent(),
    getSiteSettings(),
  ]);

  return {
    title: `${contact.meta.title} | ${site.name}`,
    description: contact.meta.description,
  };
}

export default async function ContactPage() {
  const [contact, site] = await Promise.all([
    getContactContent(),
    getSiteSettings(),
  ]);
  const { heading, infoItems, enquiry } = contact;

  return (
    <Section spacing="lg">
      <Container>
        <Reveal>
          <SectionHeading
            title={heading.title}
            description={heading.description}
          />

          <div className="mx-auto mt-8 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {infoItems.map((item) => {
              const Icon = item.icon;

              return (
                <ContentCard key={item.id} hover="lift" className="p-6">
                  <Icon className="mb-4 size-6 text-primary" />

                  <h2 className="text-xl font-semibold">{item.title}</h2>

                  {item.type === "email" ? (
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-4 block text-muted-foreground transition-colors hover:text-primary"
                    >
                      {site.email}
                    </a>
                  ) : item.type === "phone" ? (
                    <a
                      href={`tel:${site.phone.replace(/\D/g, "")}`}
                      className="mt-4 block text-muted-foreground transition-colors hover:text-primary"
                    >
                      {site.phone}
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
