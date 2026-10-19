"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LangError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const pathname = usePathname() ?? "";
  const lang = pathname.startsWith("/bn") ? "bn" : "en";

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-16 text-center">
      <p className="text-6xl font-bold tracking-tight text-fd-muted-foreground">
        500
      </p>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="max-w-md text-fd-muted-foreground">
          An unexpected error occurred. Try again, or come back to the docs
          home.
        </p>
        {error.message ? (
          <p className="max-w-md wrap-break-word font-mono text-xs text-fd-muted-foreground">
            {error.message}
            {error.digest ? ` (digest: ${error.digest})` : ""}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2" lang="bn">
        <h2 className="text-xl font-semibold">কিছু একটা সমস্যা হয়েছে</h2>
        <p className="max-w-md text-fd-muted-foreground">
          অপ্রত্যাশিত ত্রুটি ঘটেছে। আবার চেষ্টা করুন, অথবা ডকস হোমে ফিরে যান।
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={retry}
          className="cursor-pointer rounded-lg bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground transition hover:opacity-90"
        >
          Try again / আবার চেষ্টা করুন
        </button>
        <Link
          href={`/${lang}/docs`}
          className="rounded-lg border border-fd-border px-4 py-2 text-sm font-medium transition hover:bg-fd-accent hover:text-fd-accent-foreground"
        >
          Docs home
        </Link>
      </div>
    </div>
  );
}
