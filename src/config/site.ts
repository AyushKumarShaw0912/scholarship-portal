export const siteConfig = {
  name: "Scholarship Portal",

  shortName: "Scholarships",

  description:
    "Find scholarships, check eligibility, review required documents, and apply easily.",

  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",

  /** No static logo asset — Brand falls back to Lucide when null. */
  logoUrl: null as string | null,

  /** No static favicon asset — metadata omits icons when null. */
  faviconUrl: null as string | null,

  email: "futuresciencescholars@gmail.com",

  phone: "9230888155",

  address: "India",

  copyright: `© ${new Date().getFullYear()} Scholarship Portal. All rights reserved.`,
  applyUrl: "/apply",
  tagline: "Empowering Future Scientists",

  locale: "en-IN",

  author: "Scholarship Portal",

  keywords: [
    "Scholarship",
    "Science Scholarship",
    "JEE Scholarship",
    "NEET Scholarship",
    "Education",
    "India",
    "Class 11",
    "Class 12",
  ],
} as const;
