import type { Scholarship } from "@/types";

export const scholarships: Scholarship[] = [
  {
    id: "fazil-science-scholarship",

    slug: "fazil-science-scholarship",

    title: "Fazil Science Scholarship for Girls",

    shortDescription:
      "Full tution and coaching scholarship for girls pursuing science in Class 11 and 12 for 3 subjects (PCM/PCB) including preparation for competitive entrance examinations (JEE and NEET)",

    description:
      "The Fazil Science Scholarship for Girls supports academically promising female students by covering the complete tuition fees for science coaching and providing career guidance for higher education.",

    applyUrl: "https://forms.google.com/YOUR_FORM_LINK",

    isActive: true,

    eligibility: [
      "Female student",
      "Passed Class 10",
      "Class 11 (Science) student",
      "Must qualify the scholarship selection examination",
    ],

    benefits: [
      {
        id: "tuition",
        title: "100% Tuition Fee Coverage",
      },
      {
        id: "career-guidance",
        title: "Career Guidance for Higher Studies",
      },
      {
        id: "mentorship",
        title: "Academic Mentorship",
      },
    ],

    teachers: [
      {
        subject: "Physics",
        name: "Tanveer Sir",
      },
      {
        subject: "Chemistry",
        name: "XYZ Sir/Ma'am",
      },
      {
        subject: "Mathematics",
        name: "ABC Sir/Ma'am",
      },
      {
        subject: "Biology",
        name: "123 Sir/Ma'am",
      },
    ],

    requiredDocuments: [
      {
        id: "class10",
        title: "Class 10 Board Marksheet",
        required: true,
      },
      {
        id: "preboard",
        title: "Class 10 Pre-board Marksheet",
        required: true,
      },
      {
        id: "class89",
        title: "Class 8 & Class 9 Marksheets",
        required: true,
      },
      {
        id: "achievement",
        title: "Academic Achievement Certificates (if any)",
        required: false,
      },
    ],

    selectionProcess: [
      "Submit the application form",
      "Document verification",
      "Scholarship selection examination",
      "Final merit-based selection",
    ],
  },

  {
    id: "shaw-foundation-future-science-scholars",

    slug: "shaw-foundation-future-science-scholars",

    title: "Shaw Foundation for Future Science Scholars",

    shortDescription:
      "Supporting talented students pursuing science education with full scholarship for tution and coaching for Class 11 and 12 for 3 subjects (PCM/PCB) including preparation for competitive entrance examinations (JEE and NEET)",

    description:
      "The Shaw Foundation for Future Science Scholars aims to help meritorious students prepare for engineering and medical entrance examinations by providing complete coaching support and academic guidance.",

    applyUrl: "https://forms.google.com/YOUR_FORM_LINK",

    isActive: true,

    eligibility: [
      "Completed Class 10",
      "Taking admission in Class 11 (Science)",
      "Selection based on merit and scholarship examination",
    ],

    benefits: [
      {
        id: "tuition",
        title: "100% Tuition Fee Coverage",
      },
      {
        id: "career-guidance",
        title: "Career Guidance",
      },
      {
        id: "mentorship",
        title: "Faculty Mentorship",
      },
    ],

    teachers: [
      {
        subject: "Physics",
        name: "Tanveer Sir",
      },
      {
        subject: "Chemistry",
        name: "XYZ Sir/Ma'am",
      },
      {
        subject: "Mathematics",
        name: "ABC Sir/Ma'am",
      },
      {
        subject: "Biology",
        name: "123 Sir/Ma'am",
      },
    ],

    requiredDocuments: [
      {
        id: "class10",
        title: "Class 10 Board Marksheet",
        required: true,
      },
      {
        id: "preboard",
        title: "Class 10 Pre-board Marksheet",
        required: true,
      },
      {
        id: "class89",
        title: "Class 8 & Class 9 Marksheets",
        required: true,
      },
      {
        id: "achievement",
        title: "Academic Achievement Certificates (if any)",
        required: false,
      },
    ],

    selectionProcess: [
      "Application review",
      "Selection examination",
      "Merit list",
    ],
  },
];
