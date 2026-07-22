import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  readonly title: string;

  readonly description?: string;

  readonly actions?: ReactNode;

  readonly className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>

        {description && (
          <p className="max-w-2xl text-muted-foreground">{description}</p>
        )}
      </div>

      {actions}
    </header>
  );
}
