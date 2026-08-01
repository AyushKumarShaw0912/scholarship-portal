import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

import { ContentCard } from "./ContentCard";

interface ChecklistProps {
  readonly items: readonly string[];
  readonly icon?: LucideIcon;
}

export function Checklist({ items, icon: Icon = Check }: ChecklistProps) {
  return (
    <ContentCard as="div" className="p-6">
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Icon className="mt-1 size-5 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </ContentCard>
  );
}
