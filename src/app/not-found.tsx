import { SearchX } from "lucide-react";

import { systemCopy } from "@/data";
import { StatusView } from "@/components/common/StatusView";
import { Container, Section } from "@/layout";

export default function NotFound() {
  const { notFound } = systemCopy;

  return (
    <Section spacing="lg">
      <Container>
        <StatusView
          icon={SearchX}
          iconClassName="text-primary"
          code={notFound.code}
          title={notFound.title}
          description={notFound.description}
          primaryAction={{
            label: notFound.primaryAction.label,
            href: notFound.primaryAction.href,
            variant: notFound.primaryAction.variant,
          }}
          secondaryAction={{
            label: notFound.secondaryAction.label,
            href: notFound.secondaryAction.href,
            variant: notFound.secondaryAction.variant,
          }}
        />
      </Container>
    </Section>
  );
}
