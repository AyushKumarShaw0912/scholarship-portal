import Image from "next/image";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

import { cn } from "@/lib/utils";

interface BrandProps {
  readonly className?: string;
  readonly shortName: string;
  readonly tagline: string;
  readonly logoUrl?: string | null;
}

function isSvgUrl(url: string): boolean {
  return /\.svg(\?|$)/i.test(url);
}

export function Brand({
  className,
  shortName,
  tagline,
  logoUrl,
}: BrandProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-3 transition-opacity hover:opacity-90",
        className,
      )}
    >
      {logoUrl ? (
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary/10">
          {isSvgUrl(logoUrl) ? (
            <img
              src={logoUrl}
              alt={shortName}
              className="h-8 w-8 object-contain"
            />
          ) : (
            <Image
              src={logoUrl}
              alt={shortName}
              width={40}
              height={40}
              className="object-contain"
            />
          )}
        </span>
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <GraduationCap className="size-5" />
        </div>
      )}

      <div className="flex flex-col">
        <span className="text-lg font-bold tracking-tight">{shortName}</span>

        <span className="text-xs text-muted-foreground">{tagline}</span>
      </div>
    </Link>
  );
}
