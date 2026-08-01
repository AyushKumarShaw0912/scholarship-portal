const NAME_PATTERN =
  /^[\p{L}\p{M}]{2,}(?:[\s.'-][\p{L}\p{M}]+)*\.?$/u;
const PROFESSION_PATTERN =
  /^[\p{L}\p{M}0-9][\p{L}\p{M}0-9\s.,'&\-/()]{0,98}$/u;

export const APPLY_LIMITS = {
  fullName: { min: 2, max: 100 },
  parentsName: { min: 2, max: 100 },
  parentsProfession: { min: 2, max: 100 },
  address: { min: 15, max: 500 },
  academicAchievements: { max: 2000 },
  householdIncome: { min: 0, max: 50_000_000 },
  marksheetMaxBytes: 5 * 1024 * 1024,
  marksheetMinBytes: 1024,
} as const;

export const APPLY_TARGETS = ["jee", "neet"] as const;
export type ApplyTarget = (typeof APPLY_TARGETS)[number];

export const MARKSHEET_FIELDS = [
  "class10BoardMarksheet",
  "class10PreBoardMarksheet",
  "class8Marksheet",
  "class9Marksheet",
] as const;

export type MarksheetField = (typeof MARKSHEET_FIELDS)[number];

export const IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function isApplyTarget(value: string): value is ApplyTarget {
  return (APPLY_TARGETS as readonly string[]).includes(value);
}

function hasControlChars(value: string): boolean {
  return /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value);
}

export function validateFullName(raw: string): string | null {
  const value = normalizeText(raw);
  if (
    value.length < APPLY_LIMITS.fullName.min ||
    value.length > APPLY_LIMITS.fullName.max
  ) {
    return `Name must be between ${APPLY_LIMITS.fullName.min} and ${APPLY_LIMITS.fullName.max} characters.`;
  }
  if (hasControlChars(value) || !NAME_PATTERN.test(value)) {
    return "Name contains invalid characters.";
  }
  return null;
}

export function validateParentsName(raw: string): string | null {
  const value = normalizeText(raw);
  if (
    value.length < APPLY_LIMITS.parentsName.min ||
    value.length > APPLY_LIMITS.parentsName.max
  ) {
    return `Parents' name must be between ${APPLY_LIMITS.parentsName.min} and ${APPLY_LIMITS.parentsName.max} characters.`;
  }
  if (hasControlChars(value) || !NAME_PATTERN.test(value)) {
    return "Parents' name contains invalid characters.";
  }
  return null;
}

export function validateParentsProfession(raw: string): string | null {
  const value = normalizeText(raw);
  if (
    value.length < APPLY_LIMITS.parentsProfession.min ||
    value.length > APPLY_LIMITS.parentsProfession.max
  ) {
    return `Parents' profession must be between ${APPLY_LIMITS.parentsProfession.min} and ${APPLY_LIMITS.parentsProfession.max} characters.`;
  }
  if (hasControlChars(value) || !PROFESSION_PATTERN.test(value)) {
    return "Parents' profession contains invalid characters.";
  }
  return null;
}

export function validateAddress(raw: string): string | null {
  const value = normalizeText(raw);
  if (
    value.length < APPLY_LIMITS.address.min ||
    value.length > APPLY_LIMITS.address.max
  ) {
    return `Address must be between ${APPLY_LIMITS.address.min} and ${APPLY_LIMITS.address.max} characters.`;
  }
  if (hasControlChars(value)) {
    return "Address contains invalid characters.";
  }
  if (!/[\p{L}\p{N}]/u.test(value)) {
    return "Address must include letters or numbers.";
  }
  return null;
}

export function validateAcademicAchievements(
  raw: string,
): string | null {
  const value = normalizeText(raw);
  if (!value) {
    return null;
  }
  if (value.length > APPLY_LIMITS.academicAchievements.max) {
    return `Academic achievements must be at most ${APPLY_LIMITS.academicAchievements.max} characters.`;
  }
  if (hasControlChars(value)) {
    return "Academic achievements contain invalid characters.";
  }
  return null;
}

export function validateTarget(raw: string): string | null {
  if (!isApplyTarget(raw)) {
    return "Target must be JEE or NEET.";
  }
  return null;
}

export function validateHouseholdIncome(raw: string): string | null {
  if (!/^\d+$/.test(raw.trim())) {
    return "Household income must be a whole number in INR.";
  }
  const value = Number(raw.trim());
  if (
    !Number.isSafeInteger(value) ||
    value < APPLY_LIMITS.householdIncome.min ||
    value > APPLY_LIMITS.householdIncome.max
  ) {
    return `Household income must be between ${APPLY_LIMITS.householdIncome.min.toLocaleString("en-IN")} and ${APPLY_LIMITS.householdIncome.max.toLocaleString("en-IN")}.`;
  }
  return null;
}

export function validateMarksheetFile(
  file: File,
  label: string,
): string | null {
  if (!file || file.size === 0) {
    return `${label} is required.`;
  }
  if (file.size < APPLY_LIMITS.marksheetMinBytes) {
    return `${label} file is too small or empty.`;
  }
  if (file.size > APPLY_LIMITS.marksheetMaxBytes) {
    return `${label} must be under 5 MB.`;
  }
  if (!IMAGE_MIME_TYPES.has(file.type)) {
    return `${label} must be a JPEG, PNG, or WebP image.`;
  }
  return null;
}

export type ParsedApplicationInput = {
  fullName: string;
  target: ApplyTarget;
  academicAchievements?: string;
  address: string;
  parentsName: string;
  parentsProfession: string;
  householdIncome: number;
};

export function parseApplicationFields(input: {
  fullName: string;
  target: string;
  academicAchievements: string;
  address: string;
  parentsName: string;
  parentsProfession: string;
  householdIncome: string;
}): { data: ParsedApplicationInput } | { error: string } {
  const errors = [
    validateFullName(input.fullName),
    validateTarget(input.target),
    validateAcademicAchievements(input.academicAchievements),
    validateAddress(input.address),
    validateParentsName(input.parentsName),
    validateParentsProfession(input.parentsProfession),
    validateHouseholdIncome(input.householdIncome),
  ].filter((message): message is string => Boolean(message));

  if (errors.length) {
    return { error: errors[0]! };
  }

  const achievements = normalizeText(input.academicAchievements);

  return {
    data: {
      fullName: normalizeText(input.fullName),
      target: input.target as ApplyTarget,
      academicAchievements: achievements || undefined,
      address: normalizeText(input.address),
      parentsName: normalizeText(input.parentsName),
      parentsProfession: normalizeText(input.parentsProfession),
      householdIncome: Number(input.householdIncome.trim()),
    },
  };
}
