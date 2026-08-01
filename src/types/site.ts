import type { NavigationItem } from "./navigation";

export interface SiteSettings {
  readonly name: string;
  readonly shortName: string;
  readonly description: string;
  readonly url: string;
  readonly logo: string;
  readonly favicon: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly copyright: string;
  readonly applyUrl: string;
  readonly tagline: string;
  readonly locale: string;
  readonly author: string;
  readonly keywords: readonly string[];
  readonly navigation: readonly NavigationItem[];
}
