export const CMS_ICON_NAMES = [
  "Award",
  "BookOpen",
  "Brain",
  "FileText",
  "GraduationCap",
  "Mail",
  "MapPin",
  "Phone",
  "Trophy",
  "Users",
] as const;

export type CmsIconName = (typeof CMS_ICON_NAMES)[number];

export const CMS_ICON_OPTIONS = CMS_ICON_NAMES;
