import {
  Award,
  BookOpen,
  Brain,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

import {
  CMS_ICON_NAMES,
  type CmsIconName,
} from "@/constants/cms-icons";

const ICON_REGISTRY = {
  Award,
  BookOpen,
  Brain,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Trophy,
  Users,
} as const satisfies Record<CmsIconName, LucideIcon>;

const DEFAULT_ICON: LucideIcon = GraduationCap;

export function isCmsIconName(value: string): value is CmsIconName {
  return (CMS_ICON_NAMES as readonly string[]).includes(value);
}

export function resolveCmsIcon(name: string | null | undefined): LucideIcon {
  if (name && isCmsIconName(name)) {
    return ICON_REGISTRY[name];
  }

  return DEFAULT_ICON;
}

export function getCmsIconName(icon: LucideIcon): CmsIconName {
  const entry = (
    Object.entries(ICON_REGISTRY) as [CmsIconName, LucideIcon][]
  ).find(([, component]) => component === icon);

  return entry?.[0] ?? "GraduationCap";
}

export { CMS_ICON_OPTIONS, CMS_ICON_NAMES, type CmsIconName } from "@/constants/cms-icons";
