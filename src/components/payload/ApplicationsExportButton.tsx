"use client";

import { useState } from "react";
import { Download } from "lucide-react";

export function ApplicationsExportButton() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onExport() {
    setPending(true);
    setError(null);

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
      setPending(false);
    }
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <button
        type="button"
        onClick={onExport}
        disabled={pending}
        style={{
          alignItems: "center",
          background: "var(--theme-elevation-800)",
          border: "none",
          borderRadius: 4,
          color: "var(--theme-elevation-0)",
          cursor: pending ? "wait" : "pointer",
          display: "inline-flex",
          fontSize: 13,
          fontWeight: 600,
          gap: 8,
          opacity: pending ? 0.7 : 1,
          padding: "8px 12px",
        }}
      >
        <Download size={14} aria-hidden />
        {pending ? "Exporting…" : "Export Excel"}
      </button>
      {error ? (
        <p style={{ color: "var(--theme-error-500)", fontSize: 13, marginTop: 8 }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
