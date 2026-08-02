import type { Field } from "payload";

import { CMS_ICON_OPTIONS } from "@/constants/cms-icons";

type IconSelectFieldOptions = {
  readonly name?: string;
  readonly required?: boolean;
};

export function iconSelectField({
  name = "icon",
  required = true,
}: IconSelectFieldOptions = {}): Field {
  return {
    name,
    type: "select",
    required,
    options: CMS_ICON_OPTIONS.map((value) => ({
      label: value,
      value,
    })),
    admin: {
      components: {
        Field: "/components/payload/IconSelectField#IconSelectField",
      },
    },
  };
}
