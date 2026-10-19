"use client";

import { ErrorDocument } from "@/components/error-document";
import "./global.css";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return <ErrorDocument error={error} retry={retry} />;
}
