import type { LucideIcon } from "lucide-react";

import type { SectionCopy } from "./ui";

export interface ContactInfoItem {
  readonly id: string;
  readonly title: string;
  readonly icon: LucideIcon;
  readonly type: "email" | "phone" | "address";
  readonly lines?: readonly string[];
}

export interface ContactEnquiry {
  readonly title: string;
  readonly body: string;
}

export interface ContactContent {
  readonly meta: SectionCopy;
  readonly heading: SectionCopy;
  readonly infoItems: readonly ContactInfoItem[];
  readonly enquiry: ContactEnquiry;
}
