import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  readonly children: ReactNode;

  readonly spacing?: "sm" | "md" | "lg";
}

const spacingClasses = {
  sm: "py-12",
  md: "py-20",
  lg: "py-28",
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
