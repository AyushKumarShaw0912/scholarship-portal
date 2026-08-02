import type { GlobalConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "@/access";
import { revalidateApplyGlobal } from "@/cms/revalidate";
import { contentVersions } from "@/cms/versions";
import { sectionCopyFields } from "@/fields";

const requiredText = (name: string, label: string) => ({
  name,
  type: "text" as const,
  required: true,
  label,
});

const requiredTextarea = (name: string, label: string) => ({
  name,
  type: "textarea" as const,
  required: true,
  label,
});

export const Apply: GlobalConfig = {
  slug: "apply",
  label: "Apply Page",
  versions: contentVersions,
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateApplyGlobal],
  },
  fields: [
    sectionCopyFields({
      name: "meta",
      label: "SEO Meta",
      descriptionRequired: true,
    }),
    sectionCopyFields({ name: "heading", label: "Page Heading" }),
    {
      name: "form",
      type: "group",
      label: "Application form copy",
      fields: [
        {
          name: "labels",
          type: "group",
          label: "Field labels",
          fields: [
            requiredText("fullName", "Name"),
            requiredText("email", "Email"),
            requiredText("phone", "Phone number"),
            requiredText("guardianPhone", "Guardian phone number"),
            requiredText("target", "Target"),
            requiredText("board", "Board"),
            requiredText("schoolName", "School name"),
            requiredText("class8Percentage", "Class 8 percentage"),
            requiredText("class9Percentage", "Class 9 percentage"),
            requiredText(
              "class10PreBoardPercentage",
              "Class 10 pre-board percentage",
            ),
            requiredText("class10TotalMarks", "Class 10 total marks"),
            requiredText("class10MaxMarks", "Class 10 maximum marks"),
            requiredText(
              "subjectName",
              "Subject name label (use {n} for number)",
            ),
            requiredText("subjectObtained", "Subject obtained"),
            requiredText("subjectMax", "Subject max"),
            requiredText("academicAchievements", "Academic achievements"),
            requiredText("address", "Address"),
            requiredText("parentsName", "Parents name"),
            requiredText("parentsProfession", "Parents profession"),
            requiredText("householdIncome", "Household income"),
            requiredText("selectPlaceholder", "Select placeholder"),
          ],
        },
        {
          name: "options",
          type: "group",
          label: "Select option labels",
          fields: [
            requiredText("targetJee", "JEE label"),
            requiredText("targetNeet", "NEET label"),
            requiredText("boardWbbse", "WBBSE label"),
            requiredText("boardCbse", "CBSE label"),
            requiredText("boardIcse", "ICSE label"),
            requiredText("boardOther", "Other board label"),
          ],
        },
        {
          name: "sections",
          type: "group",
          label: "Form sections",
          fields: [
            requiredText("percentagesTitle", "Percentages section title"),
            requiredTextarea("percentagesHelp", "Percentages help text"),
            requiredText("totalsTitle", "Totals section title"),
            requiredText("subjectsTitle", "Subjects section title"),
            requiredTextarea("subjectsHelp", "Subjects help text"),
          ],
        },
        {
          name: "subjectDefaults",
          type: "array",
          required: true,
          minRows: 5,
          maxRows: 5,
          labels: {
            singular: "Subject default",
            plural: "Subject defaults (exactly 5)",
          },
          fields: [requiredText("value", "Default subject name")],
        },
        {
          name: "success",
          type: "group",
          label: "Success state",
          fields: [
            requiredText("title", "Title"),
            requiredTextarea("body", "Body"),
            requiredText("resetLabel", "Reset button label"),
          ],
        },
        {
          name: "errors",
          type: "group",
          label: "Error messages",
          fields: [
            requiredText("submissionFailed", "Submission failed"),
            requiredText("network", "Network error"),
            requiredText("server", "Server error"),
          ],
        },
        {
          name: "submit",
          type: "group",
          label: "Submit button",
          fields: [
            requiredText("idle", "Idle label"),
            requiredText("pending", "Pending label"),
          ],
        },
      ],
    },
  ],
};
