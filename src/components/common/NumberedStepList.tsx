import { ContentCard } from "./ContentCard";

interface NumberedStepListProps {
  readonly steps: readonly string[];
}

export function NumberedStepList({ steps }: NumberedStepListProps) {
  return (
    <div className="space-y-5">
      {steps.map((step, index) => (
        <ContentCard key={step} className="flex gap-5 p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
            {index + 1}
          </div>

          <p className="leading-7">{step}</p>
        </ContentCard>
      ))}
    </div>
  );
}
