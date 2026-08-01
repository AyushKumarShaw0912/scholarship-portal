import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StatusActionButton {
  readonly label: string;
  readonly href?: string;
  readonly onClick?: () => void;
  readonly variant?: "default" | "outline";
}

interface StatusViewProps {
  readonly icon: LucideIcon;
  readonly iconClassName?: string;
  readonly code?: string;
  readonly title: string;
  readonly titleClassName?: string;
  readonly description: string;
  readonly primaryAction: StatusActionButton;
  readonly secondaryAction: StatusActionButton;
}

function ActionButton({
  label,
  href,
  onClick,
  variant = "default",
}: StatusActionButton) {
  const className = cn(buttonVariants({ variant }));

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {label}
      </button>
    );
  }

  if (!href) {
    return null;
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function StatusView({
  icon: Icon,
  iconClassName,
  code,
  title,
  titleClassName,
  description,
  primaryAction,
  secondaryAction,
}: StatusViewProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
      <Icon className={cn("motion-enter size-20", iconClassName)} />

      {code ? (
        <>
          <h1 className="motion-enter motion-delay-1 mt-8 text-5xl font-bold">
            {code}
          </h1>
          <h2
            className={cn(
              "motion-enter motion-delay-2 mt-4 text-2xl font-semibold",
              titleClassName,
            )}
          >
            {title}
          </h2>
        </>
      ) : (
        <h1
          className={cn(
            "motion-enter motion-delay-1 mt-8 text-3xl font-bold",
            titleClassName,
          )}
        >
          {title}
        </h1>
      )}

      <p className="motion-enter motion-delay-3 mt-4 text-muted-foreground">
        {description}
      </p>

      <div className="motion-enter motion-delay-4 mt-8 flex gap-4">
        <ActionButton {...primaryAction} />
        <ActionButton {...secondaryAction} />
      </div>
    </div>
  );
}

export type { StatusViewProps, StatusActionButton };
