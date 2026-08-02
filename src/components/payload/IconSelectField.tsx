"use client";

import { useCallback, useMemo } from "react";
import type { OptionObject, SelectFieldClientComponent } from "payload";
import { SelectInput, useField, type ReactSelectOption } from "@payloadcms/ui";

import { CMS_ICON_NAMES, resolveCmsIcon } from "@/lib/cms/icons";

export const IconSelectField: SelectFieldClientComponent = (props) => {
  const { field, path: pathFromProps, readOnly } = props;
  const {
    name,
    admin: { className, description, isClearable = true } = {},
    label,
    required,
  } = field;

  const { disabled, path, setValue, showError, value } = useField<string>({
    potentiallyStalePath: pathFromProps,
  });

  const options = useMemo<OptionObject[]>(
    () =>
      CMS_ICON_NAMES.map((iconName) => {
        const Icon = resolveCmsIcon(iconName);

        return {
          label: (
            <span
              style={{
                alignItems: "center",
                display: "inline-flex",
                gap: "0.5rem",
              }}
            >
              <Icon aria-hidden size={16} />
              <span>{iconName}</span>
            </span>
          ),
          value: iconName,
        };
      }),
    [],
  );

  const onChange = useCallback(
    (selected: ReactSelectOption | ReactSelectOption[]) => {
      if (readOnly || disabled) {
        return;
      }

      if (Array.isArray(selected)) {
        setValue(
          typeof selected[0]?.value === "string" ? selected[0].value : null,
        );
        return;
      }

      setValue(typeof selected?.value === "string" ? selected.value : null);
    },
    [disabled, readOnly, setValue],
  );

  const filterOption = useCallback(
    (
      { value: optionValue }: { value: string },
      search: string,
    ) => {
      if (!search) {
        return true;
      }

      return optionValue.toLowerCase().includes(search.toLowerCase());
    },
    [],
  );

  return (
    <SelectInput
      className={className}
      description={description}
      filterOption={filterOption}
      isClearable={Boolean(isClearable) && !required}
      isSortable={false}
      label={label}
      name={name}
      onChange={onChange}
      options={options}
      path={path}
      readOnly={Boolean(readOnly || disabled)}
      required={Boolean(required)}
      showError={showError}
      value={value}
    />
  );
};
