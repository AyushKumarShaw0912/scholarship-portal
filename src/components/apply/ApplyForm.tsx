"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  validateApplicationFields,
  type ApplicationFieldErrors,
  type ApplicationInput,
} from "@/lib/apply-validation";
import type { ApplyFormContent } from "@/types/apply";

const fieldClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

const fieldErrorClass =
  "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30";

const labelClass = "mb-1.5 block text-sm font-medium";

const errorClass = "mt-1.5 text-sm text-destructive";

type ApplyFormProps = {
  readonly content: ApplyFormContent;
};

type FieldName = keyof ApplicationInput;

function subjectLabel(template: string, n: number): string {
  return template.replaceAll("{n}", String(n));
}

function readFormValues(
  formData: FormData,
): Record<FieldName, string> {
  const get = (name: FieldName) => {
    const value = formData.get(name);
    return typeof value === "string" ? value : "";
  };

  return {
    fullName: get("fullName"),
    email: get("email"),
    phone: get("phone"),
    guardianPhone: get("guardianPhone"),
    target: get("target"),
    board: get("board"),
    schoolName: get("schoolName"),
    class8Percentage: get("class8Percentage"),
    class9Percentage: get("class9Percentage"),
    class10PreBoardPercentage: get("class10PreBoardPercentage"),
    class10TotalMarks: get("class10TotalMarks"),
    class10MaxMarks: get("class10MaxMarks"),
    subject1Name: get("subject1Name"),
    subject1Obtained: get("subject1Obtained"),
    subject1Max: get("subject1Max"),
    subject2Name: get("subject2Name"),
    subject2Obtained: get("subject2Obtained"),
    subject2Max: get("subject2Max"),
    subject3Name: get("subject3Name"),
    subject3Obtained: get("subject3Obtained"),
    subject3Max: get("subject3Max"),
    subject4Name: get("subject4Name"),
    subject4Obtained: get("subject4Obtained"),
    subject4Max: get("subject4Max"),
    subject5Name: get("subject5Name"),
    subject5Obtained: get("subject5Obtained"),
    subject5Max: get("subject5Max"),
    academicAchievements: get("academicAchievements"),
    address: get("address"),
    parentsName: get("parentsName"),
    parentsProfession: get("parentsProfession"),
    householdIncome: get("householdIncome"),
  };
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p className={errorClass} role="alert">
      {message}
    </p>
  );
}

export function ApplyForm({ content }: ApplyFormProps) {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<ApplicationFieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();
  const { labels, options, sections, subjectDefaults, success, errors, submit } =
    content;

  function clearFieldError(name: FieldName) {
    setFieldErrors((current) => {
      if (!current[name]) {
        return current;
      }
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = readFormValues(formData);
    const validated = validateApplicationFields(values);

    if (!validated.success) {
      setFieldErrors(validated.fieldErrors);
      const firstKey = Object.keys(validated.fieldErrors)[0];
      if (firstKey) {
        const el = form.elements.namedItem(firstKey);
        if (el instanceof HTMLElement) {
          el.focus();
        }
      }
      return;
    }

    setFieldErrors({});

    startTransition(async () => {
      try {
        const response = await fetch("/api/apply", {
          method: "POST",
          body: formData,
        });
        const payload = (await response.json()) as {
          ok?: boolean;
          error?: string;
        };

        if (!response.ok || !payload.ok) {
          setSubmitError(payload.error || errors.submissionFailed);
          return;
        }

        setDone(true);
        form.reset();
        router.refresh();
      } catch {
        setSubmitError(errors.network);
      }
    });
  }

  if (done) {
    return (
      <div className="rounded-xl border bg-muted/30 p-8 text-center">
        <h2 className="text-xl font-semibold">{success.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{success.body}</p>
        <Button className="mt-6" type="button" onClick={() => setDone(false)}>
          {success.resetLabel}
        </Button>
      </div>
    );
  }

  const percentageFields = [
    ["class8Percentage", labels.class8Percentage],
    ["class9Percentage", labels.class9Percentage],
    ["class10PreBoardPercentage", labels.class10PreBoardPercentage],
  ] as const;

  function inputClass(name: FieldName) {
    return fieldErrors[name] ? `${fieldClass} ${fieldErrorClass}` : fieldClass;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <fieldset className="space-y-4 rounded-xl border p-4 sm:p-5">
        <legend className="px-1 text-sm font-semibold">
          {sections.personalTitle}
        </legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="fullName">
              {labels.fullName}
            </label>
            <input
              id="fullName"
              name="fullName"
              className={inputClass("fullName")}
              autoComplete="name"
              aria-invalid={Boolean(fieldErrors.fullName)}
              onChange={() => clearFieldError("fullName")}
            />
            <FieldError message={fieldErrors.fullName} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="email">
              {labels.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={inputClass("email")}
              autoComplete="email"
              inputMode="email"
              aria-invalid={Boolean(fieldErrors.email)}
              onChange={() => clearFieldError("email")}
            />
            <FieldError message={fieldErrors.email} />
          </div>

          <div>
            <label className={labelClass} htmlFor="phone">
              {labels.phone}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className={inputClass("phone")}
              autoComplete="tel"
              inputMode="tel"
              aria-invalid={Boolean(fieldErrors.phone)}
              onChange={() => clearFieldError("phone")}
            />
            <FieldError message={fieldErrors.phone} />
          </div>

          <div>
            <label className={labelClass} htmlFor="guardianPhone">
              {labels.guardianPhone}
            </label>
            <input
              id="guardianPhone"
              name="guardianPhone"
              type="tel"
              className={inputClass("guardianPhone")}
              autoComplete="tel"
              inputMode="tel"
              aria-invalid={Boolean(fieldErrors.guardianPhone)}
              onChange={() => clearFieldError("guardianPhone")}
            />
            <FieldError message={fieldErrors.guardianPhone} />
          </div>

          <div>
            <label className={labelClass} htmlFor="target">
              {labels.target}
            </label>
            <select
              id="target"
              name="target"
              className={inputClass("target")}
              defaultValue=""
              aria-invalid={Boolean(fieldErrors.target)}
              onChange={() => clearFieldError("target")}
            >
              <option value="" disabled>
                {labels.selectPlaceholder}
              </option>
              <option value="jee">{options.targetJee}</option>
              <option value="neet">{options.targetNeet}</option>
            </select>
            <FieldError message={fieldErrors.target} />
          </div>

          <div>
            <label className={labelClass} htmlFor="board">
              {labels.board}
            </label>
            <select
              id="board"
              name="board"
              className={inputClass("board")}
              defaultValue=""
              aria-invalid={Boolean(fieldErrors.board)}
              onChange={() => clearFieldError("board")}
            >
              <option value="" disabled>
                {labels.selectPlaceholder}
              </option>
              <option value="wbbse">{options.boardWbbse}</option>
              <option value="cbse">{options.boardCbse}</option>
              <option value="icse">{options.boardIcse}</option>
              <option value="other">{options.boardOther}</option>
            </select>
            <FieldError message={fieldErrors.board} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="schoolName">
              {labels.schoolName}
            </label>
            <input
              id="schoolName"
              name="schoolName"
              className={inputClass("schoolName")}
              aria-invalid={Boolean(fieldErrors.schoolName)}
              onChange={() => clearFieldError("schoolName")}
            />
            <FieldError message={fieldErrors.schoolName} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-xl border p-4 sm:p-5">
        <legend className="px-1 text-sm font-semibold">
          {sections.familyTitle}
        </legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="address">
              {labels.address}
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              className={inputClass("address")}
              aria-invalid={Boolean(fieldErrors.address)}
              onChange={() => clearFieldError("address")}
            />
            <FieldError message={fieldErrors.address} />
          </div>

          <div>
            <label className={labelClass} htmlFor="parentsName">
              {labels.parentsName}
            </label>
            <input
              id="parentsName"
              name="parentsName"
              className={inputClass("parentsName")}
              aria-invalid={Boolean(fieldErrors.parentsName)}
              onChange={() => clearFieldError("parentsName")}
            />
            <FieldError message={fieldErrors.parentsName} />
          </div>

          <div>
            <label className={labelClass} htmlFor="parentsProfession">
              {labels.parentsProfession}
            </label>
            <input
              id="parentsProfession"
              name="parentsProfession"
              className={inputClass("parentsProfession")}
              aria-invalid={Boolean(fieldErrors.parentsProfession)}
              onChange={() => clearFieldError("parentsProfession")}
            />
            <FieldError message={fieldErrors.parentsProfession} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="householdIncome">
              {labels.householdIncome}
            </label>
            <input
              id="householdIncome"
              name="householdIncome"
              type="number"
              step={1}
              inputMode="numeric"
              className={inputClass("householdIncome")}
              aria-invalid={Boolean(fieldErrors.householdIncome)}
              onChange={() => clearFieldError("householdIncome")}
            />
            <FieldError message={fieldErrors.householdIncome} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-xl border p-4 sm:p-5">
        <legend className="px-1 text-sm font-semibold">
          {sections.percentagesTitle}
        </legend>
        <p className="text-xs text-muted-foreground">
          {sections.percentagesHelp}
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {percentageFields.map(([name, label]) => (
            <div key={name}>
              <label className={labelClass} htmlFor={name}>
                {label}
              </label>
              <input
                id={name}
                name={name}
                type="number"
                step="0.01"
                inputMode="decimal"
                className={inputClass(name)}
                aria-invalid={Boolean(fieldErrors[name])}
                onChange={() => clearFieldError(name)}
              />
              <FieldError message={fieldErrors[name]} />
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-xl border p-4 sm:p-5">
        <legend className="px-1 text-sm font-semibold">
          {sections.totalsTitle}
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="class10TotalMarks">
              {labels.class10TotalMarks}
            </label>
            <input
              id="class10TotalMarks"
              name="class10TotalMarks"
              type="number"
              step="0.01"
              inputMode="decimal"
              className={inputClass("class10TotalMarks")}
              aria-invalid={Boolean(fieldErrors.class10TotalMarks)}
              onChange={() => clearFieldError("class10TotalMarks")}
            />
            <FieldError message={fieldErrors.class10TotalMarks} />
          </div>
          <div>
            <label className={labelClass} htmlFor="class10MaxMarks">
              {labels.class10MaxMarks}
            </label>
            <input
              id="class10MaxMarks"
              name="class10MaxMarks"
              type="number"
              step="0.01"
              inputMode="decimal"
              className={inputClass("class10MaxMarks")}
              aria-invalid={Boolean(fieldErrors.class10MaxMarks)}
              onChange={() => clearFieldError("class10MaxMarks")}
            />
            <FieldError message={fieldErrors.class10MaxMarks} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-xl border p-4 sm:p-5">
        <legend className="px-1 text-sm font-semibold">
          {sections.subjectsTitle}
        </legend>
        <p className="text-xs text-muted-foreground">{sections.subjectsHelp}</p>
        <div className="space-y-4">
          {subjectDefaults.map((defaultName, index) => {
            const n = (index + 1) as 1 | 2 | 3 | 4 | 5;
            const nameKey = `subject${n}Name` as const;
            const obtainedKey = `subject${n}Obtained` as const;
            const maxKey = `subject${n}Max` as const;

            return (
              <div
                key={n}
                className="grid gap-3 sm:grid-cols-[1.4fr_1fr_1fr]"
              >
                <div>
                  <label className={labelClass} htmlFor={nameKey}>
                    {subjectLabel(labels.subjectName, n)}
                  </label>
                  <input
                    id={nameKey}
                    name={nameKey}
                    defaultValue={defaultName}
                    className={inputClass(nameKey)}
                    aria-invalid={Boolean(fieldErrors[nameKey])}
                    onChange={() => clearFieldError(nameKey)}
                  />
                  <FieldError message={fieldErrors[nameKey]} />
                </div>
                <div>
                  <label className={labelClass} htmlFor={obtainedKey}>
                    {labels.subjectObtained}
                  </label>
                  <input
                    id={obtainedKey}
                    name={obtainedKey}
                    type="number"
                    step="0.01"
                    inputMode="decimal"
                    className={inputClass(obtainedKey)}
                    aria-invalid={Boolean(fieldErrors[obtainedKey])}
                    onChange={() => clearFieldError(obtainedKey)}
                  />
                  <FieldError message={fieldErrors[obtainedKey]} />
                </div>
                <div>
                  <label className={labelClass} htmlFor={maxKey}>
                    {labels.subjectMax}
                  </label>
                  <input
                    id={maxKey}
                    name={maxKey}
                    type="number"
                    step="0.01"
                    inputMode="decimal"
                    className={inputClass(maxKey)}
                    aria-invalid={Boolean(fieldErrors[maxKey])}
                    onChange={() => clearFieldError(maxKey)}
                  />
                  <FieldError message={fieldErrors[maxKey]} />
                </div>
              </div>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label className={labelClass} htmlFor="academicAchievements">
          {labels.academicAchievements}
        </label>
        <textarea
          id="academicAchievements"
          name="academicAchievements"
          rows={3}
          className={inputClass("academicAchievements")}
          aria-invalid={Boolean(fieldErrors.academicAchievements)}
          onChange={() => clearFieldError("academicAchievements")}
        />
        <FieldError message={fieldErrors.academicAchievements} />
      </div>

      {submitError ? (
        <p
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          {submitError}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={pending}
        size="lg"
        className="w-full sm:w-auto"
      >
        {pending ? submit.pending : submit.idle}
      </Button>
    </form>
  );
}
