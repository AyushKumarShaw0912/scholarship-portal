import type { Metadata } from "next";

import { ApplyForm } from "@/components/apply/ApplyForm";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { getSiteSettings } from "@/lib/cms";
import { Container, Section } from "@/layout";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();

  return {
    title: `Apply | ${site.name}`,
    description: "Submit your scholarship application online.",
  };
}

export default async function ApplyPage() {
  return (
    <Section spacing="lg">
      <Container>
        <Reveal>
          <SectionHeading
            title="Apply for a scholarship"
            description="Complete the form below and upload clear marksheet snapshots. Your details are saved in our system; images go to secure media storage."
          />

          <div className="mx-auto mt-10 max-w-2xl">
            <ApplyForm />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
