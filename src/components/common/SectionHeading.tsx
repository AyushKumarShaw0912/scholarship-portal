import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  readonly title: string;
  readonly description?: string;
  readonly align?: "left" | "center";
  readonly className?: string;
}

export function SectionHeading({
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-2",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>

      {description && (
        <p className="mx-auto max-w-2xl text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
