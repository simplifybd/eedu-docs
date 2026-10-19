import type { Metadata } from "next";
import { NotFoundDocument } from "@/components/not-found-document";
import "./global.css";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return <NotFoundDocument />;
}
