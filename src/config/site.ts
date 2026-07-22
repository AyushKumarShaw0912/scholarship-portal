export const siteConfig = {
  name: "Scholarship Portal",

  shortName: "Scholarships",

  description:
    "Find scholarships, check eligibility, review required documents, and apply easily.",

  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",

  logo: "/images/logo.svg",

  favicon: "/favicon.ico",

  email: "support@example.com",

  phone: "+91-0000000000",

  address: "India",

  copyright: `© ${new Date().getFullYear()} Scholarship Portal. All rights reserved.`,
} as const;
