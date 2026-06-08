import type { Metadata } from "next";
import { Geist_Mono, Urbanist } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site/SiteChrome";
import { MotionProvider } from "@/components/motion";

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
  icons: {
    icon: "/fav_icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${geistMono.variable} h-full overflow-x-hidden antialiased`}
    >
      <body className="min-h-full w-full min-w-0 flex flex-col overflow-x-hidden bg-white text-zinc-950">
        <MotionProvider>
          <SiteChrome>
            <main className="min-w-0 flex-1">{children}</main>
          </SiteChrome>
        </MotionProvider>
      </body>
    </html>
  );
}
