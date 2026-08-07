import type { Metadata } from "next";
import "./globals.css";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: {
    default: "Afzal Rao — Full Stack Developer",
    template: "%s | Afzal Rao",
  },
  description:
    "Full stack developer building fast, scalable, and beautiful web applications. Specializing in Next.js, TypeScript, Node.js, and PostgreSQL.",
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "Web Developer",
    "Afzal Rao",
  ],
  authors: [{ name: "Afzal Rao" }],
  creator: "Afzal Rao",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Afzal Rao — Full Stack Developer",
    description:
      "Full stack developer building fast, scalable, and beautiful web applications.",
    siteName: "Afzal Rao Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Afzal Rao — Full Stack Developer",
    description:
      "Full stack developer building fast, scalable, and beautiful web applications.",
    creator: "@afzalrao_dev",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Quicksand:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased">
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}