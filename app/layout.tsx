import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-grotesk"
});

export const metadata: Metadata = {
  title: "Data Analyst Fresher Job Agent",
  description:
    "Stay ahead with curated data analyst job alerts tailored for freshers."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${grotesk.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
