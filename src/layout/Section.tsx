import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  readonly children: ReactNode;

  readonly spacing?: "sm" | "md" | "lg";
}

const spacingClasses = {
  sm: "py-8",
  md: "py-10",
  lg: "py-12",
} as const;

export function Section({
  children,
  spacing = "md",
  className,
  ...props
}: SectionProps) {
  return (
    <section className={cn(spacingClasses[spacing], className)} {...props}>
      {children}
    </section>
  );
}
