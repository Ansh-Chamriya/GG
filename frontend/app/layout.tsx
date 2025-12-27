import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GearGuard - Intelligent Maintenance Management System",
  description:
    "Track, maintain, and protect every asset effortlessly. A smart maintenance management system that connects equipment, teams, and repair workflows in one place.",
  keywords: [
    "maintenance management",
    "equipment tracking",
    "asset management",
    "preventive maintenance",
    "CMMS",
    "facility management",
  ],
  openGraph: {
    title: "GearGuard - Intelligent Maintenance Management System",
    description: "Track, maintain, and protect every asset effortlessly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
