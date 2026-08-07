"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, ExternalLink, Code2, Server, Layers, Zap, Star, CheckCircle } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { BRAND, socialLinks } from "@/lib/data";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";

// ─── Inline data ────────────────────────────────────────────────────────────────

const FEATURED_PROJECTS = [
  {
    id: "saas-dashboard",
    title: "SaaS Analytics Dashboard",
    description:
      "A real-time analytics platform built for high-growth startups. Handles millions of events per day with sub-second query latency.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/bf8f9dafbab74a88ae7797f8d833fbd6.png",
    liveUrl: "https://demo.afzalrao.dev/analytics",
    githubUrl: "https://github.com/afzalrao/analytics-dashboard",
    category: "Full Stack",
  },
  {
    id: "ecommerce-platform",
    title: "Headless E-Commerce Platform",
    description:
      "A fully headless storefront with custom CMS, Stripe payments, and edge-cached product pages that load in under 200ms.",
    tech: ["React", "Node.js", "Stripe", "Cloudflare"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/e00b737bf0b241a19a284d9608eab2fc.png",
    liveUrl: "https://demo.afzalrao.dev/shop",
    githubUrl: "https://github.com/afzalrao/headless-commerce",
    category: "Full Stack",
  },
  {
    id: "devops-pipeline",
    title: "CI/CD Automation Suite",
    description:
      "An end-to-end deployment pipeline with automated testing, preview environments, and one-click rollbacks for a team of 30 engineers.",
    tech: ["Docker", "GitHub Actions", "Terraform", "AWS"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/0502e788d8e94155924a9e5f91660ef5.jpg",
    githubUrl: "https://github.com/afzalrao/cicd-suite",
    category: "DevOps",
  },
];

const SERVICES = [
  {
    icon: Code2,
    title: "Frontend Engineering",
    description:
      "Pixel-perfect UIs built with React and Next.js. Fast, accessible, and responsive across every device.",
  },
  {
    icon: Server,
    title: "Backend Architecture",
    description:
      "Scalable APIs and microservices with Node.js, PostgreSQL, and Redis. Designed for reliability under load.",
  },
  {
    icon: Layers,
    title: "Full Stack Delivery",
    description:
      "End-to-end ownership from database schema to deployed product. One engineer, zero handoff friction.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Audits and rewrites that cut load times in half. Core Web Vitals, caching strategies, and edge delivery.",
  },
];

const STATS = [
  { value: "5+", label: "Years of experience" },
  { value: "40+", label: "Projects shipped" },
  { value: "15+", label: "Happy clients" },
  { value: "99%", label: "Uptime delivered" },
];

const TESTIMONIALS = [
  {
    quote:
      "Afzal rebuilt our entire data pipeline and frontend in six weeks. The new dashboard is faster, cleaner, and our team actually enjoys using it.",
    name: "Sarah Chen",
    role: "CTO, Luminary Analytics",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Uptime%20delivered",
  },
  {
    quote:
      "Working with Afzal felt like having a senior engineer and a product thinker in one. He pushed back on bad ideas and shipped the right ones.",
    name: "Marcus Webb",
    role: "Founder, Stackflow",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus%20Webb",
  },
  {
    quote:
      "Our checkout conversion went up 18% after Afzal optimized the storefront. He knows how performance translates to revenue.",
    name: "Priya Nair",
    role: "Head of Product, Cartly",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya%20Nair",
  },
];

// ─── Hero variants ───────────────────────────────────────────────────────────────

const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const heroLine: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const socialIconVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// ─── Social icon map ─────────────────────────────────────────────────────────────

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
};

// ─── Component ───────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-[92vh] flex items-center overflow-hidden"
      >
        {/* Background mesh */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[var(--brand-primary)]/8 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-[var(--brand-primary)]/5 blur-[100px]" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="w-full max-w-6xl mx-auto px-6 md:px-10 py-28 md:py-36">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            {/* Eyebrow */}
            <motion.div variants={heroLine} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-sm font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)] animate-pulse" />
                {t("hero.available")}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={heroLine}
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] text-balance mb-6"
            >
              {t("hero.greeting")}{" "}
              <span className="text-[var(--brand-primary)]">{BRAND.name}</span>
              {"."}
              <br />
              <span className="text-[var(--foreground)]/70">
                {t("hero.role")}
              </span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              variants={heroLine}
              className="text-lg md:text-xl text-[var(--foreground)]/60 leading-relaxed max-w-xl mb-10 text-pretty"
            >
              {t("hero.tagline")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={heroLine}
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--brand-primary)] text-[var(--brand-primary-fg)] font-semibold text-sm hover:opacity-90 transition-all duration-300 shadow-[0_0_24px_rgba(var(--brand-primary-rgb),0.35)] hover:shadow-[0_0_36px_rgba(var(--brand-primary-rgb),0.5)] hover:-translate-y-0.5"
              >
                {t("hero.cta_primary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--foreground)]/15 bg-[var(--foreground)]/5 text-[var(--foreground)] font-semibold text-sm hover:bg-[var(--foreground)]/10 hover:border-[var(--foreground)]/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                {t("hero.cta_secondary")}
              </Link>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-5"
            >
              {socialLinks.map((s) => {
                const Icon = SOCIAL_ICONS[s.platform] ?? Github;
                return (
                  <motion.a
                    key={s.key}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    variants={socialIconVariant}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-[var(--foreground)]/40 hover:text-[var(--brand-primary)] transition-colors duration-200"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
              <span className="h-px w-8 bg-[var(--foreground)]/15" />
              <span className="text-xs text-[var(--foreground)]/40 tracking-wide">
                {t("hero.social_label")}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          aria-hidden="true"
        >
          <span className="text-[10px] uppercase tracking-widest text-[var(--foreground)]/30">
            {t("hero.scroll")}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-[var(--foreground)]/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────────── */}
      <Reveal>
        <section className="border-y border-[var(--foreground)]/8 bg-[var(--foreground)]/[0.02]">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-12">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-[var(--foreground)]/10"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex flex-col items-center text-center md:px-8"
                >
                  <span className="text-4xl font-bold text-[var(--brand-primary)] tracking-tight">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-sm text-[var(--foreground)]/50">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── Services ─────────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="services" className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="mb-16">
              <span className="text-xs uppercase tracking-widest text-[var(--brand-primary)] font-semibold">
                {t("services.eyebrow")}
              </span>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-balance">
                {t("services.heading")}
              </h2>
              <p className="mt-4 text-[var(--foreground)]/55 max-w-xl leading-relaxed text-pretty">
                {t("services.subheading")}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {SERVICES.map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <motion.div
                    key={i}
                    variants={scaleIn}
                    whileHover={{ y: -4 }}
                    className="group relative p-7 rounded-2xl border border-[var(--foreground)]/8 bg-[var(--foreground)]/[0.03] hover:border-[var(--brand-primary)]/30 hover:bg-[var(--brand-primary)]/5 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]"
                  >
                    <div className="mb-5 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--brand-primary)]/15 text-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)]/25 transition-colors duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{svc.title}</h3>
                    <p className="text-sm text-[var(--foreground)]/55 leading-relaxed">
                      {svc.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── Featured Projects ─────────────────────────────────────────────────── */}
      <Reveal>
        <section
          id="projects"
          className="py-24 md:py-32 bg-[var(--foreground)]/[0.025] border-y border-[var(--foreground)]/8"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
              <div>
                <span className="text-xs uppercase tracking-widest text-[var(--brand-primary)] font-semibold">
                  {t("projects.eyebrow")}
                </span>
                <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-balance">
                  {t("projects.heading")}
                </h2>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-primary)] hover:gap-2.5 transition-all duration-200 shrink-0"
              >
                {t("projects.view_all")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex flex-col gap-8">
              {FEATURED_PROJECTS.map((project, i) => (
                <Reveal key={project.id} delay={i * 0.08}>
                  <motion.article
                    whileHover={{ y: -3 }}
                    className="group grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-0 rounded-2xl border border-[var(--foreground)]/8 bg-[var(--background)] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.14)] hover:border-[var(--brand-primary)]/25 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-52 md:h-auto overflow-hidden bg-[var(--foreground)]/5">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display =
                            "none";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--background)]/20" />
                    </div>

                    {/* Content */}
                    <div className="p-7 md:p-9 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--brand-primary)]/12 text-[var(--brand-primary)]">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--brand-primary)] transition-colors duration-200">
                          {project.title}
                        </h3>
                        <p className="text-sm text-[var(--foreground)]/55 leading-relaxed mb-5">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="text-xs px-2.5 py-1 rounded-md border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 text-[var(--foreground)]/60"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-6 pt-6 border-t border-[var(--foreground)]/8">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--foreground)]/50 hover:text-[var(--foreground)] transition-colors duration-200"
                          >
                            <Github className="h-3.5 w-3.5" />
                            {t("projects.source")}
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--brand-primary)] hover:opacity-80 transition-opacity duration-200"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            {t("projects.live_demo")}
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Testimonials ─────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="testimonials" className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="mb-16 text-center">
              <span className="text-xs uppercase tracking-widest text-[var(--brand-primary)] font-semibold">
                {t("testimonials.eyebrow")}
              </span>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-balance">
                {t("testimonials.heading")}
              </h2>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {TESTIMONIALS.map((item, i) => (
                <motion.figure
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className="relative flex flex-col p-7 rounded-2xl border border-[var(--foreground)]/8 bg-[var(--foreground)]/[0.03] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] hover:border-[var(--brand-primary)]/25 transition-all duration-300"
                >
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        className="h-3.5 w-3.5 fill-[var(--brand-primary)] text-[var(--brand-primary)]"
                      />
                    ))}
                  </div>
                  <blockquote className="flex-1 text-sm text-[var(--foreground)]/70 leading-relaxed mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-3 pt-5 border-t border-[var(--foreground)]/8">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-[var(--foreground)]/10"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        el.style.display = "none";
                      }}
                    />
                    <div>
                      <div className="text-sm font-semibold">{item.name}</div>
                      <div className="text-xs text-[var(--foreground)]/45">
                        {item.role}
                      </div>
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <Reveal>
        <section
          id="contact"
          className="py-24 md:py-32 border-t border-[var(--foreground)]/8"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="relative rounded-3xl overflow-hidden border border-[var(--brand-primary)]/20 bg-[var(--brand-primary)]/8 px-8 md:px-16 py-16 md:py-20 text-center">
              {/* Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[var(--brand-primary)]/15 blur-[80px]" />
              </div>

              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs font-medium tracking-wide">
                <CheckCircle className="h-3.5 w-3.5" />
                {t("cta.badge")}
              </div>

              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-5">
                {t("cta.heading")}
              </h2>
              <p className="text-[var(--foreground)]/60 max-w-lg mx-auto leading-relaxed mb-10 text-pretty">
                {t("cta.subheading")}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--brand-primary)] text-[var(--brand-primary-fg)] font-semibold text-sm hover:opacity-90 transition-all duration-300 shadow-[0_0_28px_rgba(var(--brand-primary-rgb),0.4)] hover:shadow-[0_0_40px_rgba(var(--brand-primary-rgb),0.55)] hover:-translate-y-0.5"
                >
                  {t("cta.button_primary")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={BRAND.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[var(--foreground)]/15 bg-[var(--foreground)]/5 text-[var(--foreground)] font-semibold text-sm hover:bg-[var(--foreground)]/10 transition-all duration-300 hover:-translate-y-0.5"
                >
                  {t("cta.button_secondary")}
                </a>
              </div>

              <p className="mt-8 text-xs text-[var(--foreground)]/35">
                {t("cta.footnote")}{" "}
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-[var(--brand-primary)] hover:underline"
                >
                  {BRAND.email}
                </a>
              </p>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}