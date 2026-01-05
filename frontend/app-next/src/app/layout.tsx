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

        <main className="p-7">{children}</main>
      </body>
    </html>
  );
}
