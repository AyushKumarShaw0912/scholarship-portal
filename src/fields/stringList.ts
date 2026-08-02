import type { Field } from "payload";

type StringListFieldOptions = {
  readonly name: string;
  readonly label?: string;
  readonly rowLabel?: string;
  readonly required?: boolean;
};

export function stringListField({
  name,
  label,
  rowLabel = "Item",
  required = false,
}: StringListFieldOptions): Field {
  return {
    name,
    type: "array",
    label,
    required,
    labels: {
      singular: rowLabel,
      plural: `${rowLabel}s`,
    },
    fields: [
      {
        name: "value",
        type: "text",
        required: true,
      },
    ],
  };
}
