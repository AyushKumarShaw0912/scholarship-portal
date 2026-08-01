"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { APPLY_LIMITS } from "@/lib/apply-validation";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

const labelClass = "mb-1.5 block text-sm font-medium";

const MARKSHEET_INPUTS = [
  {
    name: "class10BoardMarksheet",
    label: "Class 10 board exam marksheet",
  },
  {
    name: "class10PreBoardMarksheet",
    label: "Class 10 pre-board exam marksheet",
  },
  {
    name: "class8Marksheet",
    label: "Class 8 results marksheet",
  },
  {
    name: "class9Marksheet",
    label: "Class 9 results marksheet",
  },
] as const;

export function ApplyForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

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
          setError(payload.error || "Submission failed. Please try again.");
          return;
        }

        setDone(true);
        form.reset();
        router.refresh();
      } catch {
        setError("Network error. Please try again.");
      }
    });
  }

  if (done) {
    return (
      <div className="rounded-xl border bg-muted/30 p-8 text-center">
        <h2 className="text-xl font-semibold">Application submitted</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you. We have received your application and marksheet images.
          Our team will review them shortly.
        </p>
        <Button className="mt-6" type="button" onClick={() => setDone(false)}>
          Submit another application
        </Button>
      </div>
    );
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

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="fullName">
            Name
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
          <label className={labelClass} htmlFor="target">
            Objective / Target
          </label>
          <select
            id="target"
            name="target"
            required
            className={fieldClass}
            defaultValue=""
          >
            <option value="" disabled>
              Select…
            </option>
            <option value="jee">JEE</option>
            <option value="neet">NEET</option>
          </select>
        </div>
      </div>

      <fieldset className="space-y-4 rounded-xl border p-4 sm:p-5">
        <legend className="px-1 text-sm font-semibold">Marksheet snapshots</legend>
        <p className="text-xs text-muted-foreground">
          Upload clear photos or scans (JPEG, PNG, or WebP, max 5 MB each).
          Files are stored in media storage, not in the database.
        </p>
        {MARKSHEET_INPUTS.map((input) => (
          <div key={input.name}>
            <label className={labelClass} htmlFor={input.name}>
              {input.label}
            </label>
            <input
              id={input.name}
              name={input.name}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required
              className={cn(
                fieldClass,
                "cursor-pointer file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium",
              )}
            />
          </div>
        ))}
      </fieldset>

      <div>
        <label className={labelClass} htmlFor="academicAchievements">
          Any other academic achievements
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
          Full address (with local landmark)
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
            Name of parents
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
            Parents profession
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
            Gross approx household income (both parents combined, INR)
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
        {pending ? "Submitting…" : "Submit application"}
      </Button>
    </form>
  );
}
