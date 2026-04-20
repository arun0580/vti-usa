import type { Metadata } from "next";
import { Geist_Mono, Urbanist } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VTI — Interactive Displays for Education, Business & Government",
  description:
    "Interactive panels, LED posters, and digital signage solutions for education, business, government, and public spaces — delivered through a nationwide partner network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
