type StringListItem = {
  value?: string | null;
} | null;

export function mapStringList(
  items: StringListItem[] | null | undefined,
): string[] {
  if (!items?.length) {
    return [];
  }

  return items
    .map((item) => item?.value?.trim())
    .filter((value): value is string => Boolean(value));
}

export function toStringList(
  values: readonly string[],
): { value: string }[] {
  return values.map((value) => ({ value }));
}

export function hasText(value: string | null | undefined): value is string {
  return Boolean(value?.trim());
}
