import type { ApplyContent, ApplyFormContent } from "@/types/apply";

import { hasText } from "./utils";

type ApplyDoc = {
  meta?: { title?: string | null; description?: string | null } | null;
  heading?: { title?: string | null; description?: string | null } | null;
  form?: {
    labels?: Record<string, string | null | undefined> | null;
    options?: Record<string, string | null | undefined> | null;
    sections?: Record<string, string | null | undefined> | null;
    subjectDefaults?: { value?: string | null }[] | null;
    success?: {
      title?: string | null;
      body?: string | null;
      resetLabel?: string | null;
    } | null;
    errors?: {
      submissionFailed?: string | null;
      network?: string | null;
      server?: string | null;
    } | null;
    submit?: { idle?: string | null; pending?: string | null } | null;
  } | null;
};

function requireGroup(
  group: Record<string, string | null | undefined> | null | undefined,
  keys: readonly string[],
): Record<string, string> | null {
  if (!group) {
    return null;
  }

  const result: Record<string, string> = {};
  for (const key of keys) {
    const value = group[key];
    if (!hasText(value)) {
      return null;
    }
    result[key] = value;
  }
  return result;
}

const LABEL_KEYS = [
  "fullName",
  "email",
  "phone",
  "guardianPhone",
  "target",
  "board",
  "schoolName",
  "class8Percentage",
  "class9Percentage",
  "class10PreBoardPercentage",
  "class10TotalMarks",
  "class10MaxMarks",
  "subjectName",
  "subjectObtained",
  "subjectMax",
  "academicAchievements",
  "address",
  "parentsName",
  "parentsProfession",
  "householdIncome",
  "selectPlaceholder",
] as const;

const OPTION_KEYS = [
  "targetJee",
  "targetNeet",
  "boardWbbse",
  "boardCbse",
  "boardIcse",
  "boardOther",
] as const;

const SECTION_KEYS = [
  "personalTitle",
  "familyTitle",
  "percentagesTitle",
  "percentagesHelp",
  "totalsTitle",
  "subjectsTitle",
  "subjectsHelp",
] as const;

export function toApplyContent(doc: ApplyDoc): ApplyContent | null {
  if (!hasText(doc.meta?.title) || !hasText(doc.heading?.title)) {
    return null;
  }

  const labels = requireGroup(doc.form?.labels ?? undefined, LABEL_KEYS);
  const options = requireGroup(doc.form?.options ?? undefined, OPTION_KEYS);
  const sections = requireGroup(doc.form?.sections ?? undefined, SECTION_KEYS);
  const success = doc.form?.success;
  const errors = doc.form?.errors;
  const submit = doc.form?.submit;

  if (
    !labels ||
    !options ||
    !sections ||
    !hasText(success?.title) ||
    !hasText(success.body) ||
    !hasText(success.resetLabel) ||
    !hasText(errors?.submissionFailed) ||
    !hasText(errors.network) ||
    !hasText(errors.server) ||
    !hasText(submit?.idle) ||
    !hasText(submit.pending)
  ) {
    return null;
  }

  const subjectDefaults =
    doc.form?.subjectDefaults
      ?.map((row) => row?.value?.trim())
      .filter((value): value is string => Boolean(value)) ?? [];

  if (subjectDefaults.length !== 5) {
    return null;
  }

  const form: ApplyFormContent = {
    labels: {
      fullName: labels.fullName,
      email: labels.email,
      phone: labels.phone,
      guardianPhone: labels.guardianPhone,
      target: labels.target,
      board: labels.board,
      schoolName: labels.schoolName,
      class8Percentage: labels.class8Percentage,
      class9Percentage: labels.class9Percentage,
      class10PreBoardPercentage: labels.class10PreBoardPercentage,
      class10TotalMarks: labels.class10TotalMarks,
      class10MaxMarks: labels.class10MaxMarks,
      subjectName: labels.subjectName,
      subjectObtained: labels.subjectObtained,
      subjectMax: labels.subjectMax,
      academicAchievements: labels.academicAchievements,
      address: labels.address,
      parentsName: labels.parentsName,
      parentsProfession: labels.parentsProfession,
      householdIncome: labels.householdIncome,
      selectPlaceholder: labels.selectPlaceholder,
    },
    options: {
      targetJee: options.targetJee,
      targetNeet: options.targetNeet,
      boardWbbse: options.boardWbbse,
      boardCbse: options.boardCbse,
      boardIcse: options.boardIcse,
      boardOther: options.boardOther,
    },
    sections: {
      personalTitle: sections.personalTitle,
      familyTitle: sections.familyTitle,
      percentagesTitle: sections.percentagesTitle,
      percentagesHelp: sections.percentagesHelp,
      totalsTitle: sections.totalsTitle,
      subjectsTitle: sections.subjectsTitle,
      subjectsHelp: sections.subjectsHelp,
    },
    subjectDefaults: [
      subjectDefaults[0]!,
      subjectDefaults[1]!,
      subjectDefaults[2]!,
      subjectDefaults[3]!,
      subjectDefaults[4]!,
    ],
    success: {
      title: success.title,
      body: success.body,
      resetLabel: success.resetLabel,
    },
    errors: {
      submissionFailed: errors.submissionFailed,
      network: errors.network,
      server: errors.server,
    },
    submit: {
      idle: submit.idle,
      pending: submit.pending,
    },
  };

  return {
    meta: {
      title: doc.meta.title,
      description: doc.meta.description ?? undefined,
    },
    heading: {
      title: doc.heading.title,
      description: doc.heading.description ?? undefined,
    },
    form,
  };
}

export function fromApplyContent(content: ApplyContent) {
  return {
    meta: { ...content.meta },
    heading: { ...content.heading },
    form: {
      labels: { ...content.form.labels },
      options: { ...content.form.options },
      sections: { ...content.form.sections },
      subjectDefaults: content.form.subjectDefaults.map((value) => ({ value })),
      success: { ...content.form.success },
      errors: { ...content.form.errors },
      submit: { ...content.form.submit },
    },
  };
}
