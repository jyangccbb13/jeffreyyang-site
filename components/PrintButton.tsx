"use client";

export default function PrintButton({ className = "" }: { className?: string }) {
  return (
    <button
      onClick={() => window.print()}
      className={
        className ||
        "rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
      }
    >
      Download PDF
    </button>
  );
}
