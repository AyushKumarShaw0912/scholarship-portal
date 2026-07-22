import { ROUTES } from "@/constants/routes";

export const navigation = [
  {
    title: "Home",
    href: ROUTES.HOME,
  },
  {
    title: "Scholarships",
    href: ROUTES.SCHOLARSHIPS,
  },
  {
    title: "About",
    href: ROUTES.ABOUT,
  },
  {
    title: "Contact",
    href: ROUTES.CONTACT,
  },
] as const;
