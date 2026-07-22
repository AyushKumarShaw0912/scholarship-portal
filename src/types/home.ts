import type { LucideIcon } from "lucide-react";

export interface HeroStat {
  readonly value: string;
  readonly label: string;
}

export interface HeroContent {
  readonly badge: string;
  readonly title: string;
  readonly highlightedTitle: string;
  readonly description: string;
  readonly stats: readonly HeroStat[];
}

export interface BenefitItem {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

export interface ApplicationStep {
  readonly title: string;
  readonly description: string;
}

export interface HomeContent {
  readonly hero: HeroContent;

  readonly benefits: readonly BenefitItem[];

  readonly applicationSteps: readonly ApplicationStep[];
}
