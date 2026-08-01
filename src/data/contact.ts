import { Mail, MapPin } from "lucide-react";

import type { ContactContent } from "@/types/contact";

export const contactContent = {
  meta: {
    title: "Contact",
    description: "Get in touch with the scholarship team.",
  },

  heading: {
    title: "Contact Us",
    description:
      "Have questions about our scholarship programs? We'd be happy to help.",
  },

  infoItems: [
    {
      id: "email",
      title: "Email",
      icon: Mail,
      type: "email",
    },
    {
      id: "address",
      title: "Address",
      icon: MapPin,
      type: "address",
      lines: ["Kolkata, West Bengal", "India"],
    },
  ],

  enquiry: {
    title: "Scholarship Enquiries",
    body: "If you have any questions regarding eligibility, required documents, the selection process, or the application procedure, please contact us via email. We will respond as soon as possible.",
  },
} as const satisfies ContactContent;
