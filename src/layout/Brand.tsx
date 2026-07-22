import Link from "next/link";
import { GraduationCap } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface BrandProps {
  readonly className?: string;
}

export function Brand({ className }: BrandProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-3 transition-opacity hover:opacity-90",
        className,
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <GraduationCap className="size-5" />
      </div>

      <div className="flex flex-col">
        <span className="text-lg font-bold tracking-tight">
          {siteConfig.shortName}
        </span>

        <span className="text-xs text-muted-foreground">
          {siteConfig.tagline}
        </span>
      </div>
    </Link>
  );
}
