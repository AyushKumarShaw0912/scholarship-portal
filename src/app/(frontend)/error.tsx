"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";

import { systemCopy } from "@/data";
import { StatusView } from "@/components/common/StatusView";
import { Container, Section } from "@/layout";

interface ErrorPageProps {
  readonly error: Error & {
    digest?: string;
  };
  readonly reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const { error: errorCopy } = systemCopy;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section spacing="lg">
      <Container>
        <StatusView
          icon={TriangleAlert}
          iconClassName="text-destructive"
          title={errorCopy.title}
          description={errorCopy.description}
          primaryAction={{
            label: errorCopy.primaryAction.label,
            onClick: reset,
            variant: errorCopy.primaryAction.variant,
          }}
          secondaryAction={{
            label: errorCopy.secondaryAction.label,
            href: errorCopy.secondaryAction.href,
            variant: errorCopy.secondaryAction.variant,
          }}
        />
      </Container>
    </Section>
  );
}
