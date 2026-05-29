import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Tapro IT Digital Vesak Thorana",
  description: "A premium digital Vesak thorana experience based on the Nandivisala Jataka.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}