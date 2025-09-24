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
  title: "Portfolio Andri | Creative Developer",
  description:
    "Selamat datang di portfolio Andri. Seorang Web Developer kreatif dengan fokus pada teknologi modern, desain interaktif, dan pengalaman pengguna yang menarik.",
  keywords: [
    "Andri",
    "Portfolio Andri",
    "Web Developer",
    "Creative Developer",
    "Next.js",
    "Frontend Developer",
    "Fullstack Developer",
  ],
  authors: [{ name: "Andri" }],
  openGraph: {
    title: "Portfolio Andri | Creative Developer",
    description:
      "Eksplorasi karya, pengalaman, dan keahlian Andri dalam pengembangan web modern.",
    url: "https://yourdomain.com",
    siteName: "Portfolio Andri",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg", // ganti dengan gambar preview
        width: 1200,
        height: 630,
        alt: "Portfolio Andri",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Andri | Creative Developer",
    description:
      "Web Developer kreatif dengan fokus pada desain interaktif & teknologi modern.",
    images: ["https://yourdomain.com/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://yourdomain.com"),
};

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ActiveThemeProvider } from "@/components/active-theme";
import { SkeletonProvider } from "@/context/SkeletonProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          "bg-background font-sans antialiased",
          geistSans.variable,
          geistMono.variable
        )}
      >
        <SkeletonProvider duration={3000}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ActiveThemeProvider>{children}</ActiveThemeProvider>
          </ThemeProvider>
        </SkeletonProvider>
      </body>
    </html>
  );
}
