import type { Field } from "payload";

type SectionCopyFieldsOptions = {
  readonly name: string;
  readonly label?: string;
  readonly descriptionRequired?: boolean;
  readonly includeDescription?: boolean;
};

export function sectionCopyFields({
  name,
  label,
  descriptionRequired = false,
  includeDescription = true,
}: SectionCopyFieldsOptions): Field {
  const fields: Field[] = [
    {
      name: "title",
      type: "text",
      required: true,
    },
  ];

  if (includeDescription) {
    fields.push({
      name: "description",
      type: "textarea",
      required: descriptionRequired,
    });
  }

  return {
    name,
    type: "group",
    label: label ?? name,
    fields,
  };
}
