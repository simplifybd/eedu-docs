"use client";

import { ErrorDocument } from "@/components/error-document";
import "./global.css";

export default function RootError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return <ErrorDocument error={error} retry={retry} />;
}
