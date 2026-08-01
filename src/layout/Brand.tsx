import Link from "next/link";
import { GraduationCap } from "lucide-react";

import { cn } from "@/lib/utils";

interface BrandProps {
  readonly className?: string;
  readonly shortName: string;
  readonly tagline: string;
}

export function Brand({ className, shortName, tagline }: BrandProps) {
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
        <span className="text-lg font-bold tracking-tight">{shortName}</span>

        <span className="text-xs text-muted-foreground">{tagline}</span>
      </div>
    </Link>
  );
}
