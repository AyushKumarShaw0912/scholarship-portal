import type { SectionCopy } from "./ui";

export interface AboutSection {
  readonly title: string;
  readonly body?: string;
  readonly items?: readonly string[];
}

export interface AboutContent {
  readonly meta: SectionCopy;
  readonly heading: SectionCopy;
  readonly sections: readonly AboutSection[];
}
