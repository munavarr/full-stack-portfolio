import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fullstack Developer Portfolio",
  description: "A Next.js and TypeScript project.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
