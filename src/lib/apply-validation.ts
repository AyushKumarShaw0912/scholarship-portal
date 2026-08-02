import * as z from "zod/mini";

z.config(z.locales.en());

export const APPLY_TARGETS = ["jee", "neet"] as const;
export const APPLY_BOARDS = ["wbbse", "cbse", "icse", "other"] as const;
export const ACADEMIC_TRENDS = ["improving", "stable", "declining"] as const;

export type ApplyTarget = (typeof APPLY_TARGETS)[number];
export type ApplyBoard = (typeof APPLY_BOARDS)[number];
export type AcademicTrend = (typeof ACADEMIC_TRENDS)[number];

export const APPLY_LIMITS = {
  fullName: { min: 2, max: 100 },
  parentsName: { min: 2, max: 100 },
  parentsProfession: { min: 2, max: 100 },
  schoolName: { min: 2, max: 150 },
  subjectName: { min: 2, max: 80 },
  email: { max: 120 },
  phone: { min: 10, max: 15 },
  address: { min: 15, max: 500 },
  academicAchievements: { max: 2000 },
  householdIncome: { min: 0, max: 50_000_000 },
  percent: { min: 0, max: 100 },
  marks: { min: 0, max: 1000 },
} as const;

const namePattern =
  /^[\p{L}\p{M}]{2,}(?:[\s.'-][\p{L}\p{M}]+)*\.?$/u;
const professionPattern =
  /^[\p{L}\p{M}0-9][\p{L}\p{M}0-9\s.,'&\-/()]{0,98}$/u;
const phonePattern = /^(?:\+?91)?[6-9]\d{9}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

const trimmedString = z.pipe(
  z.string(),
  z.transform((value) => normalizeText(value)),
);

function personName(min: number, max: number, label: string) {
  return trimmedString.check(
    z.minLength(min, { error: `${label} must be at least ${min} characters.` }),
    z.maxLength(max, { error: `${label} must be at most ${max} characters.` }),
    z.refine((value) => namePattern.test(value), {
      error: `${label} contains invalid characters.`,
    }),
  );
}

function subjectNameField(label: string) {
  return trimmedString.check(
    z.minLength(APPLY_LIMITS.subjectName.min, {
      error: `${label} is required.`,
    }),
    z.maxLength(APPLY_LIMITS.subjectName.max, {
      error: `${label} is too long.`,
    }),
  );
}

function coerceNumber(raw: unknown): number {
  if (typeof raw === "number" && Number.isFinite(raw)) {
    return raw;
  }
  if (typeof raw === "string" && raw.trim() !== "") {
    const value = Number(raw.trim());
    if (Number.isFinite(value)) {
      return value;
    }
  }
  return Number.NaN;
}

const numberFromInput = z.pipe(
  z.pipe(z.any(), z.transform(coerceNumber)),
  z.number({ error: "Must be a valid number." }),
);

function percentFromInput(label: string) {
  return numberFromInput.check(
    z.minimum(APPLY_LIMITS.percent.min, {
      error: `${label} must be between 0 and 100.`,
    }),
    z.maximum(APPLY_LIMITS.percent.max, {
      error: `${label} must be between 0 and 100.`,
    }),
  );
}

function marksFromInput(label: string) {
  return numberFromInput.check(
    z.minimum(APPLY_LIMITS.marks.min, {
      error: `${label} must be 0 or greater.`,
    }),
    z.maximum(APPLY_LIMITS.marks.max, {
      error: `${label} looks too large.`,
    }),
  );
}

function phoneField(label: string) {
  return z
    .pipe(
      trimmedString,
      z.transform((value) => value.replace(/[\s-]/g, "")),
    )
    .check(
      z.minLength(APPLY_LIMITS.phone.min, {
        error: `${label} must be a valid Indian mobile number.`,
      }),
      z.maxLength(APPLY_LIMITS.phone.max, {
        error: `${label} must be a valid Indian mobile number.`,
      }),
      z.refine((value) => phonePattern.test(value), {
        error: `${label} must be a valid Indian mobile number.`,
      }),
    );
}

const emailField = z.pipe(
  trimmedString,
  z.string().check(
    z.maxLength(APPLY_LIMITS.email.max, {
      error: "Email is too long.",
    }),
    z.refine((value) => emailPattern.test(value), {
      error: "Enter a valid email address.",
    }),
  ),
);

const optionalAchievements = z.pipe(
  z.pipe(
    z.string(),
    z.transform((value) => {
      const normalized = normalizeText(value);
      return normalized || undefined;
    }),
  ),
  z.optional(
    z.string().check(
      z.maxLength(APPLY_LIMITS.academicAchievements.max, {
        error: "Academic achievements are too long.",
      }),
    ),
  ),
);

/** Form / API input. academicTrend + trendScore are computed server-side. */
export const applicationInputSchema = z
  .object({
    fullName: personName(
      APPLY_LIMITS.fullName.min,
      APPLY_LIMITS.fullName.max,
      "Name",
    ),
    email: emailField,
    phone: phoneField("Phone number"),
    guardianPhone: phoneField("Guardian phone number"),
    target: z.enum(APPLY_TARGETS, {
      error: "Target must be JEE or NEET.",
    }),
    board: z.enum(APPLY_BOARDS, {
      error: "Please select a valid board.",
    }),
    schoolName: trimmedString.check(
      z.minLength(APPLY_LIMITS.schoolName.min, {
        error: "School name is required.",
      }),
      z.maxLength(APPLY_LIMITS.schoolName.max, {
        error: "School name is too long.",
      }),
    ),
    class8Percentage: percentFromInput("Class 8 percentage"),
    class9Percentage: percentFromInput("Class 9 percentage"),
    class10PreBoardPercentage: percentFromInput(
      "Class 10 pre-board percentage",
    ),
    class10TotalMarks: marksFromInput("Class 10 total marks"),
    class10MaxMarks: marksFromInput("Class 10 maximum marks"),
    subject1Name: subjectNameField("Subject 1 name"),
    subject1Obtained: marksFromInput("Subject 1 marks obtained"),
    subject1Max: marksFromInput("Subject 1 maximum marks"),
    subject2Name: subjectNameField("Subject 2 name"),
    subject2Obtained: marksFromInput("Subject 2 marks obtained"),
    subject2Max: marksFromInput("Subject 2 maximum marks"),
    subject3Name: subjectNameField("Subject 3 name"),
    subject3Obtained: marksFromInput("Subject 3 marks obtained"),
    subject3Max: marksFromInput("Subject 3 maximum marks"),
    subject4Name: subjectNameField("Subject 4 name"),
    subject4Obtained: marksFromInput("Subject 4 marks obtained"),
    subject4Max: marksFromInput("Subject 4 maximum marks"),
    subject5Name: subjectNameField("Subject 5 name"),
    subject5Obtained: marksFromInput("Subject 5 marks obtained"),
    subject5Max: marksFromInput("Subject 5 maximum marks"),
    academicAchievements: optionalAchievements,
    address: trimmedString.check(
      z.minLength(APPLY_LIMITS.address.min, {
        error: `Address must be at least ${APPLY_LIMITS.address.min} characters.`,
      }),
      z.maxLength(APPLY_LIMITS.address.max, {
        error: `Address must be at most ${APPLY_LIMITS.address.max} characters.`,
      }),
      z.refine((value) => /[\p{L}\p{N}]/u.test(value), {
        error: "Address must include letters or numbers.",
      }),
    ),
    parentsName: personName(
      APPLY_LIMITS.parentsName.min,
      APPLY_LIMITS.parentsName.max,
      "Parents' name",
    ),
    parentsProfession: trimmedString.check(
      z.minLength(APPLY_LIMITS.parentsProfession.min, {
        error: "Parents' profession is required.",
      }),
      z.maxLength(APPLY_LIMITS.parentsProfession.max, {
        error: "Parents' profession is too long.",
      }),
      z.refine((value) => professionPattern.test(value), {
        error: "Parents' profession contains invalid characters.",
      }),
    ),
    householdIncome: numberFromInput.check(
      z.minimum(APPLY_LIMITS.householdIncome.min, {
        error: "Household income is too low.",
      }),
      z.maximum(APPLY_LIMITS.householdIncome.max, {
        error: "Household income is too high.",
      }),
      z.refine((value) => Number.isInteger(value), {
        error: "Household income must be a whole number in INR.",
      }),
    ),
  })
  .check(
    z.refine((data) => data.class10MaxMarks > 0, {
      error: "Class 10 maximum marks must be greater than 0.",
      path: ["class10MaxMarks"],
    }),
    z.refine((data) => data.class10TotalMarks <= data.class10MaxMarks, {
      error: "Class 10 total marks cannot exceed maximum marks.",
      path: ["class10TotalMarks"],
    }),
    z.refine(
      (data) =>
        data.subject1Max > 0 && data.subject1Obtained <= data.subject1Max,
      {
        error: "Subject 1 obtained marks cannot exceed max (max must be > 0).",
        path: ["subject1Obtained"],
      },
    ),
    z.refine(
      (data) =>
        data.subject2Max > 0 && data.subject2Obtained <= data.subject2Max,
      {
        error: "Subject 2 obtained marks cannot exceed max (max must be > 0).",
        path: ["subject2Obtained"],
      },
    ),
    z.refine(
      (data) =>
        data.subject3Max > 0 && data.subject3Obtained <= data.subject3Max,
      {
        error: "Subject 3 obtained marks cannot exceed max (max must be > 0).",
        path: ["subject3Obtained"],
      },
    ),
    z.refine(
      (data) =>
        data.subject4Max > 0 && data.subject4Obtained <= data.subject4Max,
      {
        error: "Subject 4 obtained marks cannot exceed max (max must be > 0).",
        path: ["subject4Obtained"],
      },
    ),
    z.refine(
      (data) =>
        data.subject5Max > 0 && data.subject5Obtained <= data.subject5Max,
      {
        error: "Subject 5 obtained marks cannot exceed max (max must be > 0).",
        path: ["subject5Obtained"],
      },
    ),
  );

export type ApplicationInput = z.infer<typeof applicationInputSchema>;

export type ParsedApplicationInput = ApplicationInput & {
  academicTrend: AcademicTrend;
  trendScore: number;
};

/**
 * Trend from Class 8 → 9 → 10 board %.
 * trendScore = average percentage-point change per year-step.
 */
export function computeAcademicTrend(input: {
  class8Percentage: number;
  class9Percentage: number;
  class10TotalMarks: number;
  class10MaxMarks: number;
}): { academicTrend: AcademicTrend; trendScore: number } {
  const class10Percentage =
    (input.class10TotalMarks / input.class10MaxMarks) * 100;
  const delta89 = input.class9Percentage - input.class8Percentage;
  const delta910 = class10Percentage - input.class9Percentage;
  const trendScore = Math.round(((delta89 + delta910) / 2) * 100) / 100;

  let academicTrend: AcademicTrend = "stable";
  if (trendScore >= 2) {
    academicTrend = "improving";
  } else if (trendScore <= -2) {
    academicTrend = "declining";
  }

  return { academicTrend, trendScore };
}

export function parseApplicationFields(
  input: unknown,
): { data: ParsedApplicationInput } | { error: string } {
  const result = applicationInputSchema.safeParse(input);

  if (!result.success) {
    const first = result.error.issues[0];
    return { error: first?.message ?? "Invalid application data." };
  }

  const trend = computeAcademicTrend(result.data);

  return {
    data: {
      ...result.data,
      academicTrend: trend.academicTrend,
      trendScore: trend.trendScore,
    },
  };
}
