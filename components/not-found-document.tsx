import Link from 'next/link';

export function NotFoundDocument() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-fd-background px-6 text-center text-fd-foreground">
        <p className="text-7xl font-bold tracking-tight text-fd-muted-foreground">
          404
        </p>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Page not found</h1>
          <p className="max-w-md text-fd-muted-foreground">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col gap-2" lang="bn">
          <h2 className="text-xl font-semibold">পৃষ্ঠাটি পাওয়া যায়নি</h2>
          <p className="max-w-md text-fd-muted-foreground">
            আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়েছে, নাম পরিবর্তন হয়েছে, বা
            সাময়িকভাবে অনুপলব্ধ।
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/en/docs"
            className="rounded-lg bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground transition hover:opacity-90"
          >
            English docs
          </Link>
          <Link
            href="/bn/docs"
            className="rounded-lg border border-fd-border px-4 py-2 text-sm font-medium transition hover:bg-fd-accent hover:text-fd-accent-foreground"
          >
            বাংলা ডকস
          </Link>
        </div>
      </body>
    </html>
  );
}
