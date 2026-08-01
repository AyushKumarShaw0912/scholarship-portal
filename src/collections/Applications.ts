import type { CollectionConfig, Validate } from "payload";

import { anyone, authenticated } from "@/access";
import {
  APPLY_LIMITS,
  validateAddress,
  validateAcademicAchievements,
  validateFullName,
  validateHouseholdIncome,
  validateParentsName,
  validateParentsProfession,
  validateTarget,
} from "@/lib/apply-validation";

const validateText =
  (validator: (value: string) => string | null): Validate =>
  (value) => {
    if (typeof value !== "string") {
      return "This field is required.";
    }
    return validator(value) ?? true;
  };

const validateOptionalAchievements: Validate = (value) => {
  if (value == null || value === "") {
    return true;
  }
  if (typeof value !== "string") {
    return "Invalid value.";
  }
  return validateAcademicAchievements(value) ?? true;
};

const validateIncome: Validate = (value) => {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "Household income must be a number.";
  }
  return validateHouseholdIncome(String(Math.trunc(value))) ?? true;
};

export const Applications: CollectionConfig = {
  slug: "applications",
  labels: {
    singular: "Application",
    plural: "Applications",
  },
  admin: {
    useAsTitle: "fullName",
    defaultColumns: ["fullName", "target", "status", "createdAt"],
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
  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
      label: "Name",
      maxLength: APPLY_LIMITS.fullName.max,
      validate: validateText(validateFullName),
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
      validate: validateText(validateTarget),
    },
    {
      name: "class10BoardMarksheet",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Class 10 board exam marksheet",
    },
    {
      name: "class10PreBoardMarksheet",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Class 10 pre-board exam marksheet",
    },
    {
      name: "class8Marksheet",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Class 8 results marksheet",
    },
    {
      name: "class9Marksheet",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Class 9 results marksheet",
    },
    {
      name: "academicAchievements",
      type: "textarea",
      label: "Any other academic achievements",
      maxLength: APPLY_LIMITS.academicAchievements.max,
      validate: validateOptionalAchievements,
    },
    {
      name: "address",
      type: "textarea",
      required: true,
      label: "Full address (with local landmark)",
      maxLength: APPLY_LIMITS.address.max,
      validate: validateText(validateAddress),
    },
    {
      name: "parentsName",
      type: "text",
      required: true,
      label: "Name of parents",
      maxLength: APPLY_LIMITS.parentsName.max,
      validate: validateText(validateParentsName),
    },
    {
      name: "parentsProfession",
      type: "text",
      required: true,
      label: "Parents profession",
      maxLength: APPLY_LIMITS.parentsProfession.max,
      validate: validateText(validateParentsProfession),
    },
    {
      name: "householdIncome",
      type: "number",
      required: true,
      label: "Gross approx household income (both parents combined)",
      min: APPLY_LIMITS.householdIncome.min,
      max: APPLY_LIMITS.householdIncome.max,
      validate: validateIncome,
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
