import { ExternalLink, FileText, GraduationCap, Trophy } from "lucide-react";

import type { Scholarship } from "@/types";

import { siteConfig } from "@/config";

interface ScholarshipSidebarProps {
  readonly scholarship: Scholarship;
}

export function ScholarshipSidebar({ scholarship }: ScholarshipSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-28">
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Apply for this Scholarship</h2>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Complete the online application form. The selection committee will
          determine the most suitable scholarship program based on your
          eligibility and performance.
        </p>

        <div className="mt-8 space-y-5">
          <div className="flex items-center gap-3">
            <GraduationCap className="size-5 text-primary" />
            <span className="text-sm">100% Tuition Support</span>
          </div>

          <div className="flex items-center gap-3">
            <Trophy className="size-5 text-primary" />
            <span className="text-sm">Merit Based Selection</span>
          </div>

          <div className="flex items-center gap-3">
            <FileText className="size-5 text-primary" />
            <span className="text-sm">Required Documents Verification</span>
          </div>
        </div>

        <a
          href={siteConfig.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Apply Now
          <ExternalLink className="ml-2 size-4" />
        </a>

        <p className="mt-6 text-xs leading-6 text-muted-foreground">
          One common application form is used for all scholarship programs. The
          scholarship committee will evaluate every application individually.
        </p>
      </div>
    </aside>
  );
}
