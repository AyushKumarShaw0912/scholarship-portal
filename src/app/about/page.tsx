import type { Metadata } from "next";

import { siteConfig } from "@/config";

import { Container, Section } from "@/layout";
import { SectionHeading } from "@/components/common/SectionHeading";

export const metadata: Metadata = {
  title: `About | ${siteConfig.name}`,
  description:
    "Learn about our mission to support deserving students through science scholarships.",
};

export default function AboutPage() {
  return (
    <Section spacing="lg">
      <Container>
        <SectionHeading
          title="About Us"
          description="Supporting talented students through quality education."
        />

        <div className="mx-auto mt-12 max-w-4xl space-y-8 text-muted-foreground">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              Our Mission
            </h2>

            <p className="leading-8">
              We believe that financial limitations should never prevent
              talented students from pursuing quality science education. Through
              our scholarship programs, we aim to support deserving students
              preparing for engineering and medical entrance examinations.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              What We Offer
            </h2>

            <ul className="list-disc space-y-2 pl-6 leading-8">
              <li>Full tuition fee support.</li>
              <li>Experienced science faculty.</li>
              <li>Transparent merit-based selection.</li>
              <li>Career guidance and mentoring.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              Our Vision
            </h2>

            <p className="leading-8">
              Our vision is to create opportunities for talented students from
              all backgrounds and help them achieve academic excellence through
              quality education and mentorship.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
