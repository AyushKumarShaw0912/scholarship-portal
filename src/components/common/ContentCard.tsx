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
  lift: "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
  shadow: "transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
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
        "rounded-2xl border bg-card",
        hover && hoverClasses[hover],
        className,
      )}
    >
      {children}
    </Comp>
  );
}
