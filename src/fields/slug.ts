import type { Field } from "payload";

type SlugFieldOptions = {
  readonly unique?: boolean;
  readonly required?: boolean;
};

export function slugField({
  unique = true,
  required = true,
}: SlugFieldOptions = {}): Field {
  return {
    name: "slug",
    type: "text",
    required,
    unique,
    index: true,
    admin: {
      position: "sidebar",
    },
  };
}
