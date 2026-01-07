import "./globals.css"
import type { Metadata } from "next";
import Header from "@/src/components/header/Header";

export const metadata: Metadata = {
  title: {
    default: "Mi App",
    template: "%s | Mi App",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Header />

        <main className="mx-auto max-w-7xl px-6 py-12">{children}</main>
      </body>
    </html>
  );
}
