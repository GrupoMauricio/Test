import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Live Shopping Feed",
  description: "Live shopping feed with product cards and live streams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
