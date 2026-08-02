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

    isActive: true,

    eligibility: [
      "Female student",
      "Passed Class 10 (WBBSE / CBSE / ICSE or equivalent)",
      "Class 11 or 12 Science student (PCM / PCB) in West Bengal",
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
        id: "class-marks",
        title: "Class 8, 9 percentages and Class 10 board marks (5 subjects + totals)",
        description: "Entered in the online application form — no marksheet upload",
        required: true,
      },
      {
        id: "class-board-school",
        title: "Board and school name",
        required: true,
      },
      {
        id: "achievement",
        title: "Academic achievements (optional notes)",
        required: false,
      },
    ],

    selectionProcess: [
      "Submit the online application with Class 10 marks",
      "Marks and details review",
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

    isActive: true,

    eligibility: [
      "Completed Class 10 (WBBSE / CBSE / ICSE or equivalent)",
      "Class 11 or 12 Science student (PCM / PCB) in West Bengal",
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
        id: "class-marks",
        title: "Class 8, 9 percentages and Class 10 board marks (5 subjects + totals)",
        description: "Entered in the online application form — no marksheet upload",
        required: true,
      },
      {
        id: "class-board-school",
        title: "Board and school name",
        required: true,
      },
      {
        id: "achievement",
        title: "Academic achievements (optional notes)",
        required: false,
      },
    ],

    selectionProcess: [
      "Submit the online application with Class 10 marks",
      "Marks and details review",
      "Selection examination",
      "Merit list",
    ],
  },
];
