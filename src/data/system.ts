import { ROUTES } from "@/constants/routes";
import type { SystemCopy } from "@/types/system";

import { uiCopy } from "./ui";

export const systemCopy = {
  notFound: {
    code: "404",
    title: "Page Not Found",
    description:
      "The page you are looking for doesn't exist or may have been moved.",
    primaryAction: {
      label: uiCopy.backToHome,
      href: ROUTES.HOME,
      variant: "default",
    },
    secondaryAction: {
      label: uiCopy.scholarships,
      href: ROUTES.SCHOLARSHIPS,
      variant: "outline",
    },
  },

  error: {
    title: "Something went wrong",
    description: "An unexpected error occurred while loading this page.",
    primaryAction: {
      label: uiCopy.tryAgain,
      action: "reset",
      variant: "default",
    },
    secondaryAction: {
      label: uiCopy.home,
      href: ROUTES.HOME,
      variant: "outline",
    },
  },

  loading: uiCopy.loading,
} as const satisfies SystemCopy;
