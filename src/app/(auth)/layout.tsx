import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Prompt } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const prompt = Prompt({
  weight: ["400", "500", "700"],
  subsets: ["thai"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ระบบ ล็อกอิน",
  description: "เรียนรู้การเขียน Next.js",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={cn(inter.variable, jetbrainsMono.variable, prompt.variable, "font-sans dark")}
    >
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
