"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { APPLY_LIMITS } from "@/lib/apply-validation";
import type { ApplyFormContent } from "@/types/apply";

const fieldClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

const labelClass = "mb-1.5 block text-sm font-medium";

type ApplyFormProps = {
  readonly content: ApplyFormContent;
};

function subjectLabel(template: string, n: number): string {
  return template.replaceAll("{n}", String(n));
}

export function ApplyForm({ content }: ApplyFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();
  const { labels, options, sections, subjectDefaults, success, errors, submit } =
    content;

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

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
          setError(payload.error || errors.submissionFailed);
          return;
        }

        setDone(true);
        form.reset();
        router.refresh();
      } catch {
        setError(errors.network);
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

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="fullName">
            {labels.fullName}
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            minLength={APPLY_LIMITS.fullName.min}
            maxLength={APPLY_LIMITS.fullName.max}
            className={fieldClass}
            autoComplete="name"
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="email">
            {labels.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={APPLY_LIMITS.email.max}
            className={fieldClass}
            autoComplete="email"
            inputMode="email"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            {labels.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            minLength={APPLY_LIMITS.phone.min}
            maxLength={APPLY_LIMITS.phone.max}
            className={fieldClass}
            autoComplete="tel"
            inputMode="tel"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="guardianPhone">
            {labels.guardianPhone}
          </label>
          <input
            id="guardianPhone"
            name="guardianPhone"
            type="tel"
            required
            minLength={APPLY_LIMITS.phone.min}
            maxLength={APPLY_LIMITS.phone.max}
            className={fieldClass}
            autoComplete="tel"
            inputMode="tel"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="target">
            {labels.target}
          </label>
          <select
            id="target"
            name="target"
            required
            className={fieldClass}
            defaultValue=""
          >
            <option value="" disabled>
              {labels.selectPlaceholder}
            </option>
            <option value="jee">{options.targetJee}</option>
            <option value="neet">{options.targetNeet}</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="board">
            {labels.board}
          </label>
          <select
            id="board"
            name="board"
            required
            className={fieldClass}
            defaultValue=""
          >
            <option value="" disabled>
              {labels.selectPlaceholder}
            </option>
            <option value="wbbse">{options.boardWbbse}</option>
            <option value="cbse">{options.boardCbse}</option>
            <option value="icse">{options.boardIcse}</option>
            <option value="other">{options.boardOther}</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="schoolName">
            {labels.schoolName}
          </label>
          <input
            id="schoolName"
            name="schoolName"
            required
            minLength={APPLY_LIMITS.schoolName.min}
            maxLength={APPLY_LIMITS.schoolName.max}
            className={fieldClass}
          />
        </div>
      </div>

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
                required
                min={APPLY_LIMITS.percent.min}
                max={APPLY_LIMITS.percent.max}
                step="0.01"
                inputMode="decimal"
                className={fieldClass}
              />
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
              required
              min={APPLY_LIMITS.marks.min}
              max={APPLY_LIMITS.marks.max}
              step="0.01"
              inputMode="decimal"
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="class10MaxMarks">
              {labels.class10MaxMarks}
            </label>
            <input
              id="class10MaxMarks"
              name="class10MaxMarks"
              type="number"
              required
              min={1}
              max={APPLY_LIMITS.marks.max}
              step="0.01"
              inputMode="decimal"
              className={fieldClass}
            />
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
            return (
              <div
                key={n}
                className="grid gap-3 sm:grid-cols-[1.4fr_1fr_1fr]"
              >
                <div>
                  <label className={labelClass} htmlFor={`subject${n}Name`}>
                    {subjectLabel(labels.subjectName, n)}
                  </label>
                  <input
                    id={`subject${n}Name`}
                    name={`subject${n}Name`}
                    required
                    defaultValue={defaultName}
                    minLength={APPLY_LIMITS.subjectName.min}
                    maxLength={APPLY_LIMITS.subjectName.max}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label
                    className={labelClass}
                    htmlFor={`subject${n}Obtained`}
                  >
                    {labels.subjectObtained}
                  </label>
                  <input
                    id={`subject${n}Obtained`}
                    name={`subject${n}Obtained`}
                    type="number"
                    required
                    min={APPLY_LIMITS.marks.min}
                    max={APPLY_LIMITS.marks.max}
                    step="0.01"
                    inputMode="decimal"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor={`subject${n}Max`}>
                    {labels.subjectMax}
                  </label>
                  <input
                    id={`subject${n}Max`}
                    name={`subject${n}Max`}
                    type="number"
                    required
                    min={1}
                    max={APPLY_LIMITS.marks.max}
                    step="0.01"
                    inputMode="decimal"
                    className={fieldClass}
                  />
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
          maxLength={APPLY_LIMITS.academicAchievements.max}
          className={fieldClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="address">
          {labels.address}
        </label>
        <textarea
          id="address"
          name="address"
          rows={3}
          required
          minLength={APPLY_LIMITS.address.min}
          maxLength={APPLY_LIMITS.address.max}
          className={fieldClass}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="parentsName">
            {labels.parentsName}
          </label>
          <input
            id="parentsName"
            name="parentsName"
            required
            minLength={APPLY_LIMITS.parentsName.min}
            maxLength={APPLY_LIMITS.parentsName.max}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="parentsProfession">
            {labels.parentsProfession}
          </label>
          <input
            id="parentsProfession"
            name="parentsProfession"
            required
            minLength={APPLY_LIMITS.parentsProfession.min}
            maxLength={APPLY_LIMITS.parentsProfession.max}
            className={fieldClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="householdIncome">
            {labels.householdIncome}
          </label>
          <input
            id="householdIncome"
            name="householdIncome"
            type="number"
            min={APPLY_LIMITS.householdIncome.min}
            max={APPLY_LIMITS.householdIncome.max}
            step={1}
            required
            inputMode="numeric"
            className={fieldClass}
          />
        </div>
      </div>

      {error ? (
        <p
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          {error}
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
