import type { CollectionBeforeValidateHook, CollectionConfig } from "payload";

import { anyone, authenticated } from "@/access";
import { APPLY_LIMITS, computeAcademicTrend } from "@/lib/apply-validation";

const setAcademicTrend: CollectionBeforeValidateHook = ({ data }) => {
  if (!data) {
    return data;
  }

  const class8 = data.class8Percentage;
  const class9 = data.class9Percentage;
  const total = data.class10TotalMarks;
  const max = data.class10MaxMarks;

  if (
    typeof class8 === "number" &&
    typeof class9 === "number" &&
    typeof total === "number" &&
    typeof max === "number" &&
    max > 0
  ) {
    const trend = computeAcademicTrend({
      class8Percentage: class8,
      class9Percentage: class9,
      class10TotalMarks: total,
      class10MaxMarks: max,
    });
    data.academicTrend = trend.academicTrend;
    data.trendScore = trend.trendScore;
  }

  return data;
};

function subjectFields(index: 1 | 2 | 3 | 4 | 5) {
  return [
    {
      name: `subject${index}Name`,
      type: "text" as const,
      required: true,
      label: `Subject ${index} name`,
      maxLength: APPLY_LIMITS.subjectName.max,
    },
    {
      name: `subject${index}Obtained`,
      type: "number" as const,
      required: true,
      label: `Subject ${index} marks obtained`,
      min: APPLY_LIMITS.marks.min,
      max: APPLY_LIMITS.marks.max,
    },
    {
      name: `subject${index}Max`,
      type: "number" as const,
      required: true,
      label: `Subject ${index} maximum marks`,
      min: APPLY_LIMITS.marks.min,
      max: APPLY_LIMITS.marks.max,
    },
  ];
}

export const Applications: CollectionConfig = {
  slug: "applications",
  labels: {
    singular: "Application",
    plural: "Applications",
  },
  admin: {
    useAsTitle: "fullName",
    defaultColumns: [
      "fullName",
      "email",
      "phone",
      "target",
      "board",
      "schoolName",
      "academicTrend",
      "status",
      "createdAt",
    ],
    group: "Submissions",
    components: {
      beforeListTable: [
        "/components/payload/ApplicationsExportButton#ApplicationsExportButton",
      ],
    },
  },
  access: {
    create: anyone,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    beforeValidate: [setAcademicTrend],
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
      label: "Name",
      maxLength: APPLY_LIMITS.fullName.max,
    },
    {
      name: "email",
      type: "email",
      required: true,
      label: "Email",
    },
    {
      type: "row",
      fields: [
        {
          name: "phone",
          type: "text",
          required: true,
          label: "Phone number",
          maxLength: APPLY_LIMITS.phone.max,
        },
        {
          name: "guardianPhone",
          type: "text",
          required: true,
          label: "Guardian phone number",
          maxLength: APPLY_LIMITS.phone.max,
        },
      ],
    },
    {
      name: "target",
      type: "select",
      required: true,
      label: "Objective / Target",
      options: [
        { label: "JEE", value: "jee" },
        { label: "NEET", value: "neet" },
      ],
    },
    {
      name: "board",
      type: "select",
      required: true,
      label: "Board",
      options: [
        { label: "WBBSE (Madhyamik)", value: "wbbse" },
        { label: "CBSE", value: "cbse" },
        { label: "ICSE", value: "icse" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "schoolName",
      type: "text",
      required: true,
      label: "School name",
      maxLength: APPLY_LIMITS.schoolName.max,
    },
    {
      type: "row",
      fields: [
        {
          name: "class8Percentage",
          type: "number",
          required: true,
          label: "Class 8 percentage",
          min: APPLY_LIMITS.percent.min,
          max: APPLY_LIMITS.percent.max,
        },
        {
          name: "class9Percentage",
          type: "number",
          required: true,
          label: "Class 9 percentage",
          min: APPLY_LIMITS.percent.min,
          max: APPLY_LIMITS.percent.max,
        },
        {
          name: "class10PreBoardPercentage",
          type: "number",
          required: true,
          label: "Class 10 pre-board percentage",
          min: APPLY_LIMITS.percent.min,
          max: APPLY_LIMITS.percent.max,
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "class10TotalMarks",
          type: "number",
          required: true,
          label: "Class 10 total marks obtained",
          min: APPLY_LIMITS.marks.min,
          max: APPLY_LIMITS.marks.max,
        },
        {
          name: "class10MaxMarks",
          type: "number",
          required: true,
          label: "Class 10 maximum marks",
          min: APPLY_LIMITS.marks.min,
          max: APPLY_LIMITS.marks.max,
        },
      ],
    },
    {
      type: "row",
      fields: subjectFields(1),
    },
    {
      type: "row",
      fields: subjectFields(2),
    },
    {
      type: "row",
      fields: subjectFields(3),
    },
    {
      type: "row",
      fields: subjectFields(4),
    },
    {
      type: "row",
      fields: subjectFields(5),
    },
    {
      name: "academicTrend",
      type: "select",
      required: true,
      label: "Academic trend",
      options: [
        { label: "Improving", value: "improving" },
        { label: "Stable", value: "stable" },
        { label: "Declining", value: "declining" },
      ],
      admin: {
        description: "Auto-calculated from Class 8 → 9 → 10 percentages.",
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "trendScore",
      type: "number",
      required: true,
      label: "Trend score",
      admin: {
        description:
          "Auto-calculated average percentage-point change (Class 8→9 and 9→10).",
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "academicAchievements",
      type: "textarea",
      label: "Any other academic achievements",
      maxLength: APPLY_LIMITS.academicAchievements.max,
    },
    {
      name: "address",
      type: "textarea",
      required: true,
      label: "Full address (with local landmark)",
      maxLength: APPLY_LIMITS.address.max,
    },
    {
      name: "parentsName",
      type: "text",
      required: true,
      label: "Name of parents",
      maxLength: APPLY_LIMITS.parentsName.max,
    },
    {
      name: "parentsProfession",
      type: "text",
      required: true,
      label: "Parents profession",
      maxLength: APPLY_LIMITS.parentsProfession.max,
    },
    {
      name: "householdIncome",
      type: "number",
      required: true,
      label: "Gross approx household income (both parents combined)",
      min: APPLY_LIMITS.householdIncome.min,
      max: APPLY_LIMITS.householdIncome.max,
      admin: {
        description: "Whole number amount in INR",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Reviewed", value: "reviewed" },
        { label: "Shortlisted", value: "shortlisted" },
        { label: "Rejected", value: "rejected" },
      ],
      access: {
        create: () => false,
        update: ({ req: { user } }) => Boolean(user),
      },
      admin: {
        position: "sidebar",
      },
    },
  ],
  timestamps: true,
};
