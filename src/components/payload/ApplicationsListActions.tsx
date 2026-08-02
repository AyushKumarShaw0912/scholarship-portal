"use client";

import { useState, type CSSProperties } from "react";
import { Download, Mail } from "lucide-react";
import { useSelection } from "@payloadcms/ui";

const buttonStyle = (pending: boolean, disabled?: boolean): CSSProperties => ({
  alignItems: "center",
  background: "var(--theme-elevation-800)",
  border: "none",
  borderRadius: 4,
  color: "var(--theme-elevation-0)",
  cursor: pending || disabled ? "not-allowed" : "pointer",
  display: "inline-flex",
  fontSize: 13,
  fontWeight: 600,
  gap: 8,
  opacity: pending || disabled ? 0.55 : 1,
  padding: "8px 12px",
});

type SendResponse = {
  error?: string;
  queued?: number;
  skipped?: number;
  skippedReasons?: Array<{ id: string; reason: string }>;
};

function summarizeSkipped(reasons: Array<{ reason: string }> | undefined): string {
  if (!reasons?.length) {
    return "";
  }
  const counts = reasons.reduce<Record<string, number>>((acc, item) => {
    acc[item.reason] = (acc[item.reason] ?? 0) + 1;
    return acc;
  }, {});
  const parts = Object.entries(counts).map(([reason, count]) => {
    switch (reason) {
      case "not_shortlisted":
        return `${count} not shortlisted`;
      case "already_invited":
        return `${count} already invited`;
      case "missing_email":
        return `${count} missing email`;
      case "not_found":
        return `${count} not found`;
      default:
        return `${count} ${reason}`;
    }
  });
  return parts.join(", ");
}

export function ApplicationsListActions() {
  const { count, selectedIDs } = useSelection();
  const [exportPending, setExportPending] = useState(false);
  const [sendPending, setSendPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onExport() {
    setExportPending(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/applications/export", {
        credentials: "include",
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error || "Export failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      const disposition = response.headers.get("Content-Disposition");
      const match = disposition?.match(/filename="(.+)"/);
      anchor.href = url;
      anchor.download = match?.[1] ?? "applications.xlsx";
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed");
    } finally {
      setExportPending(false);
    }
  }

  async function sendInvites(ids: Array<number | string>, forceResend: boolean) {
    const response = await fetch("/api/applications/send-form-invite", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids, forceResend }),
    });

    const body = (await response.json().catch(() => null)) as SendResponse | null;

    if (!response.ok) {
      throw new Error(body?.error || "Send failed");
    }

    return body;
  }

  async function onSend() {
    if (count === 0 || selectedIDs.length === 0) {
      setError("Select at least one application");
      return;
    }

    const confirmed = window.confirm(
      `Send Google Form email to ${count} selected application(s)?\n\nOnly shortlisted applicants are emailed. Already-invited applicants will be skipped.`,
    );
    if (!confirmed) {
      return;
    }

    setSendPending(true);
    setError(null);
    setMessage(null);

    try {
      const first = await sendInvites(selectedIDs, false);
      let queued = first?.queued ?? 0;
      let skippedReasons = first?.skippedReasons ?? [];

      const alreadyInvited =
        skippedReasons.filter((item) => item.reason === "already_invited") ?? [];

      if (alreadyInvited.length > 0) {
        const resend = window.confirm(
          `${alreadyInvited.length} selected applicant(s) already received this invite and were skipped.\n\nResend to them now?`,
        );
        if (resend) {
          const second = await sendInvites(
            alreadyInvited.map((item) => item.id),
            true,
          );
          queued += second?.queued ?? 0;
          skippedReasons = (second?.skippedReasons ?? []).concat(
            skippedReasons.filter((item) => item.reason !== "already_invited"),
          );
        }
      }

      const skippedSummary = summarizeSkipped(
        skippedReasons.filter((item) => item.reason !== "already_invited"),
      );
      const stillSkipped = skippedReasons.filter(
        (item) => item.reason !== "already_invited",
      ).length;
      const parts = [`Queued ${queued} email(s) for background sending.`];
      if (stillSkipped > 0) {
        parts.push(`Skipped ${stillSkipped}: ${skippedSummary}.`);
      }
      setMessage(parts.join(" "));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Send failed");
    } finally {
      setSendPending(false);
    }
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <button
          type="button"
          onClick={onExport}
          disabled={exportPending}
          style={buttonStyle(exportPending)}
        >
          <Download size={14} aria-hidden />
          {exportPending ? "Exporting…" : "Export Excel"}
        </button>
        <button
          type="button"
          onClick={onSend}
          disabled={sendPending || count === 0}
          style={buttonStyle(sendPending, count === 0)}
          title={
            count === 0
              ? "Select one or more applications first"
              : `Send form email to ${count} selected`
          }
        >
          <Mail size={14} aria-hidden />
          {sendPending
            ? "Queuing…"
            : count > 0
              ? `Send form email (${count})`
              : "Send form email"}
        </button>
      </div>
      {message ? (
        <p
          style={{
            color: "var(--theme-success-500)",
            fontSize: 13,
            marginTop: 8,
          }}
        >
          {message}
        </p>
      ) : null}
      {error ? (
        <p style={{ color: "var(--theme-error-500)", fontSize: 13, marginTop: 8 }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
