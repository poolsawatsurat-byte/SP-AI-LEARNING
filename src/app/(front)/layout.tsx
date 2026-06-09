import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "ระบบ E-Commerce",
  description: "เรียนรู้การเขียน Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${inter.variable} ${jetbrainsMono.variable} font-sans dark`}>
      <body className="bg-background text-foreground">
        <Suspense fallback={<div className="h-16 border-b border-border bg-card" />}>
        <Navbar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
