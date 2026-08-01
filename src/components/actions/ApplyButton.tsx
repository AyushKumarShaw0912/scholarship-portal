import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { uiCopy } from "@/data";
import { getApplyPath } from "@/lib/apply";
import { cn } from "@/lib/utils";

interface ApplyButtonProps {
  readonly href?: string;
  readonly label?: string;
  readonly className?: string;
}

export function ApplyButton({
  href,
  label = uiCopy.applyNow,
  className,
}: ApplyButtonProps) {
  const to = href ?? getApplyPath();

  return (
    <Link
      href={to}
      className={cn(
        buttonVariants(),
        "inline-flex items-center justify-center gap-2",
        className,
      )}
    >
      <span>{label}</span>
      <ArrowRight className="size-4 shrink-0" />
    </Link>
  );
}
