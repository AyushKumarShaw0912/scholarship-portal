import { ContentCard } from "./ContentCard";

interface StepCardProps {
  readonly step: number;
  readonly title: string;
  readonly description: string;
}

export function StepCard({ step, title, description }: StepCardProps) {
  return (
    <ContentCard hover="shadow" className="p-6">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
        {step}
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </ContentCard>
  );
}
