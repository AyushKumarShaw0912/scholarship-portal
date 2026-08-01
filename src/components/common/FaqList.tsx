import { ChevronDown } from "lucide-react";

import type { FaqItem } from "@/types/faq";

import { cn } from "@/lib/utils";

interface FaqListProps {
  readonly items: readonly FaqItem[];
  readonly className?: string;
}

export function FaqList({ items, className }: FaqListProps) {
  return (
    <div
      className={cn(
        "divide-y overflow-hidden rounded-2xl border bg-card/90 backdrop-blur-[2px]",
        className,
      )}
    >
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-medium text-foreground transition-colors hover:bg-muted/40 [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
          </summary>

          <p className="px-5 pb-4 leading-7 text-muted-foreground">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
