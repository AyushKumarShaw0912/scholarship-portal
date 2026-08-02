import type { ApplyContent } from "@/types/apply";

export const applyContent = {
  meta: {
    title: "Apply",
    description: "Submit your scholarship application online.",
  },

  heading: {
    title: "Apply for a scholarship",
    description:
      "Complete the form with Class 8–10 marks and personal details. No document uploads are required.",
  },

  form: {
    labels: {
      fullName: "Name",
      email: "Email",
      phone: "Phone number",
      guardianPhone: "Guardian phone number",
      target: "Objective / Target",
      board: "Board",
      schoolName: "School name",
      class8Percentage: "Class 8 %",
      class9Percentage: "Class 9 %",
      class10PreBoardPercentage: "Class 10 pre-board %",
      class10TotalMarks: "Total marks obtained",
      class10MaxMarks: "Maximum marks",
      subjectName: "Subject {n} name",
      subjectObtained: "Obtained",
      subjectMax: "Max",
      academicAchievements: "Any other academic achievements",
      address: "Full address (with local landmark)",
      parentsName: "Name of parents",
      parentsProfession: "Parents profession",
      householdIncome:
        "Gross approx household income (both parents combined, INR)",
      selectPlaceholder: "Select…",
    },
    options: {
      targetJee: "JEE",
      targetNeet: "NEET",
      boardWbbse: "WBBSE (Madhyamik)",
      boardCbse: "CBSE",
      boardIcse: "ICSE",
      boardOther: "Other",
    },
    sections: {
      personalTitle: "Personal details",
      familyTitle: "Address & household",
      percentagesTitle: "Academic percentages",
      percentagesHelp:
        "Enter overall percentages for Class 8, Class 9, and Class 10 pre-board. Class 10 board total is entered separately below.",
      totalsTitle: "Class 10 board totals",
      subjectsTitle: "Class 10 board subjects (5)",
      subjectsHelp:
        "Enter five subjects with marks obtained and maximum marks. Suggested names can be edited for your board.",
    },
    subjectDefaults: [
      "Mathematics",
      "Physical Science / Physics",
      "Life Science / Biology",
      "Chemistry / Science",
      "English / First Language",
    ],
    success: {
      title: "Application submitted",
      body: "Thank you. We have received your application and academic marks. Our team will review them shortly.",
      resetLabel: "Submit another application",
    },
    errors: {
      submissionFailed: "Submission failed. Please try again.",
      network: "Network error. Please try again.",
      server: "Could not submit application. Please try again.",
    },
    submit: {
      idle: "Submit application",
      pending: "Submitting…",
    },
  },
} as const satisfies ApplyContent;
