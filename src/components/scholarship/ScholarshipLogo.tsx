import Image from "next/image";

import { cn } from "@/lib/utils";

interface ScholarshipLogoProps {
  readonly title: string;
  readonly logoUrl?: string | null;
  readonly size?: "sm" | "md" | "lg";
  readonly className?: string;
}

function isSvgUrl(url: string): boolean {
  return /\.svg(\?|$)/i.test(url);
}

const sizeClasses = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-14 w-14",
} as const;

const imageSizes = {
  sm: 40,
  md: 48,
  lg: 56,
} as const;

export function ScholarshipLogo({
  title,
  logoUrl,
  size = "sm",
  className,
}: ScholarshipLogoProps) {
  if (!logoUrl) {
    return null;
  }

  const dimension = imageSizes[size];

  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary/10",
        sizeClasses[size],
        className,
      )}
    >
      {isSvgUrl(logoUrl) ? (
        // SVGs from CMS/CDN: next/image is unreliable for SVG; match Brand.tsx.
        // eslint-disable-next-line @next/next/no-img-element -- SVG logos
        <img
          src={logoUrl}
          alt={`${title} logo`}
          className="h-[70%] w-[70%] object-contain"
        />
      ) : (
        <Image
          src={logoUrl}
          alt={`${title} logo`}
          width={dimension}
          height={dimension}
          className="object-contain p-1.5"
        />
      )}
    </span>
  );
}
