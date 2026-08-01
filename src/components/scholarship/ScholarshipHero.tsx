import { getScholarshipPageContent } from "@/lib/cms";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container, Section } from "@/layout";

export async function ScholarshipHero() {
  const { list } = await getScholarshipPageContent();

  return (
    <Section spacing="lg">
      <Container>
        <div className="motion-enter">
          <SectionHeading title={list.title} description={list.description} />
        </div>
      </Container>
    </Section>
  );
}
