import { Loader2 } from "lucide-react";

import { Container, Section } from "@/layout";

export default function Loading() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="flex min-h-[50vh] flex-col items-center justify-center">
          <Loader2 className="size-10 animate-spin text-primary" />

          <p className="mt-6 text-muted-foreground">Loading...</p>
        </div>
      </Container>
    </Section>
  );
}
