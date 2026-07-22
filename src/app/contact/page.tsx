import type { Metadata } from "next";

import { Mail, MapPin } from "lucide-react";

import { siteConfig } from "@/config";

import { Container, Section } from "@/layout";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";

export const metadata: Metadata = {
  title: `Contact | ${siteConfig.name}`,
  description: "Get in touch with the scholarship team.",
};

export default function ContactPage() {
  return (
    <Section spacing="lg">
      <Container>
        <Reveal>
          <SectionHeading
            title="Contact Us"
            description="Have questions about our scholarship programs? We'd be happy to help."
          />

          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
            <article className="rounded-2xl border bg-card p-8">
              <Mail className="mb-4 size-6 text-primary" />

              <h2 className="text-xl font-semibold">Email</h2>

              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-4 block text-muted-foreground transition-colors hover:text-primary"
              >
                {siteConfig.email}
              </a>
            </article>

            <article className="rounded-2xl border bg-card p-8">
              <MapPin className="mb-4 size-6 text-primary" />

              <h2 className="text-xl font-semibold">Address</h2>

              <p className="mt-4 text-muted-foreground">
                Kolkata, West Bengal
                <br />
                India
              </p>
            </article>
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border bg-card p-8">
            <h2 className="text-xl font-semibold">Scholarship Enquiries</h2>

            <p className="mt-4 leading-8 text-muted-foreground">
              If you have any questions regarding eligibility, required
              documents, the selection process, or the application procedure,
              please contact us via email. We will respond as soon as possible.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
