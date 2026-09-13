import Image from "next/image";
import type { LucideIcon } from "lucide-react";

import { ContentCard } from "./ContentCard";

interface FeatureCardProps {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
  readonly imageUrl?: string | null;
}

function isSvgUrl(url: string): boolean {
  return /\.svg(\?|$)/i.test(url);
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  imageUrl,
}: FeatureCardProps) {
  return (
    <ContentCard hover="lift" className="p-6">
      <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
        {imageUrl ? (
          <span className="relative flex size-6 items-center justify-center overflow-hidden">
            {isSvgUrl(imageUrl) ? (
              // eslint-disable-next-line @next/next/no-img-element -- SVG icons
              <img
                src={imageUrl}
                alt=""
                className="size-6 object-contain"
                aria-hidden
              />
            ) : (
              <Image
                src={imageUrl}
                alt=""
                width={24}
                height={24}
                className="object-contain"
                aria-hidden
              />
            )}
          </span>
        ) : (
          <Icon className="size-6" />
        )}
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </ContentCard>
  );
}
