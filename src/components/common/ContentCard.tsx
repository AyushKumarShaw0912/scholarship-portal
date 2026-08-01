import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContentCardHover = false | "lift" | "shadow";

interface ContentCardProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly as?: ElementType;
  readonly hover?: ContentCardHover;
}

const hoverClasses: Record<Exclude<ContentCardHover, false>, string> = {
  lift: "motion-lift",
  shadow: "motion-lift-sm",
};

export function ContentCard({
  children,
  className,
  as: Comp = "article",
  hover = false,
}: ContentCardProps) {
  return (
    <Comp
      className={cn(
        "rounded-2xl border bg-card/90 backdrop-blur-[2px]",
        hover && hoverClasses[hover],
        className,
      )}
    >
      {children}
    </Comp>
  );
}
