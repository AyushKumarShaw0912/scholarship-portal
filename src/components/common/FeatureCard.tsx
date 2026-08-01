import type { LucideIcon } from "lucide-react";

import { ContentCard } from "./ContentCard";

interface FeatureCardProps {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

export function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <ContentCard hover="lift" className="p-8">
      <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
        <Icon className="size-6" />
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
    </ContentCard>
  );
}
