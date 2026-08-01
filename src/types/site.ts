import type { NavigationItem } from "./navigation";

export interface SiteSettings {
  readonly name: string;
  readonly shortName: string;
  readonly description: string;
  readonly url: string;
  /** Optimized logo URL when a CMS media upload is set; otherwise null (Brand uses Lucide). */
  readonly logoUrl: string | null;
  /** Favicon URL when a CMS media upload is set; otherwise null. */
  readonly faviconUrl: string | null;
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
