import type { Field } from "payload";

export function navLinkFields(): Field[] {
  return [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "href",
      type: "text",
      required: true,
    },
  ];
}
