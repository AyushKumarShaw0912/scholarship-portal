import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ApplyButtonProps {
  readonly href: string;
  readonly className?: string;
}

export function ApplyButton({ href, className }: ApplyButtonProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants(),
        "inline-flex items-center justify-center gap-2",
        className,
      )}
    >
      <span>Apply Now</span>

      <ArrowUpRight className="size-4 shrink-0" />
    </Link>
  );
}
