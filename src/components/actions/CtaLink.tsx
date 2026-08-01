import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";
import { uiCopy } from "@/data";
import { cn } from "@/lib/utils";

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type CtaAppearance = "nav" | "hero" | "outline" | "sidebar" | "card";

interface CtaLinkProps {
  readonly href: string;
  readonly label?: string;
  readonly appearance?: CtaAppearance;
  readonly external?: boolean;
  readonly showExternalIcon?: boolean;
  readonly className?: string;
  readonly variant?: ButtonVariantProps["variant"];
  readonly size?: ButtonVariantProps["size"];
}

const appearanceClasses: Record<CtaAppearance, string> = {
  nav: "",
  hero: "inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90",
  outline:
    "inline-flex h-11 items-center justify-center rounded-lg border px-8 text-sm font-medium transition-colors hover:bg-accent",
  sidebar:
    "inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90",
  card: "rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90",
};

export function CtaLink({
  href,
  label = uiCopy.applyNow,
  appearance = "hero",
  external = false,
  showExternalIcon = false,
  className,
  variant,
  size,
}: CtaLinkProps) {
  const isNav = appearance === "nav";

  return (
    <Link
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={cn(
        isNav
          ? buttonVariants({ variant, size })
          : appearanceClasses[appearance],
        showExternalIcon && "inline-flex items-center justify-center",
        className,
      )}
    >
      {label}
      {showExternalIcon ? <ExternalLink className="ml-2 size-4" /> : null}
    </Link>
  );
}
