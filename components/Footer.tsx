"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, ArrowUp } from 'lucide-react';
import { useTranslations } from "next-intl";
import { navLinks, BRAND } from "@/lib/data";
import { useState, useEffect } from "react";

const socialIcons: Record<string, React.ReactNode> = {
  GitHub: <Github size={18} />,
  LinkedIn: <Linkedin size={18} />,
  Twitter: <Twitter size={18} />,
  Email: <Mail size={18} />,
};

const socialLinks = [
  { platform: "GitHub", url: "https://github.com/afzalrao", key: "github" },
  { platform: "LinkedIn", url: "https://linkedin.com/in/afzalrao", key: "linkedin" },
  { platform: "Twitter", url: "https://twitter.com/afzalrao_dev", key: "twitter" },
  { platform: "Email", url: "mailto:afzal@afzalrao.dev", key: "email" },
];

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;
  const [showTop, setShowTop] = useState(false);
  const [year, setYear] = useState(2024);

  useEffect(() => {
    setYear(new Date().getFullYear());
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--card)]/50">
      {/* Glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center text-white font-bold text-sm font-mono">
                AR
              </div>
              <span
                className="font-bold text-[var(--foreground)] text-lg"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                {BRAND.name}
              </span>
            </Link>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.key}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--accent)] hover:border-[var(--primary)]/40 transition-all duration-200"
                  aria-label={s.platform}
                >
                  {socialIcons[s.platform]}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4 uppercase tracking-wider">
              {t("footer.navigation")}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors duration-200"
                  >
                    {navT[link.key] ?? link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4 uppercase tracking-wider">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors duration-200"
                >
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={BRAND.resumeUrl}
                  download
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors duration-200"
                >
                  {t("footer.downloadResume")}
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {t("footer.status")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted-foreground)]">
            {t("footer.copyright", { year: String(year), name: BRAND.name })}
          </p>
          <p className="text-xs text-[var(--muted-foreground)]">
            {t("footer.builtWith")}
          </p>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={showTop ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shadow-[var(--shadow-glow)] pointer-events-auto"
        aria-label="Back to top"
        style={{ pointerEvents: showTop ? "auto" : "none" }}
      >
        <ArrowUp size={18} />
      </motion.button>
    </footer>
  );
}