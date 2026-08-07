"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Download, Mail, Calendar, MapPin, Code, Server, GitBranch, Settings, ExternalLink } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

// ─── Inline mock data ──────────────────────────────────────────────────────────

interface TimelineItem {
  id: string;
  period: string;
  title: string;
  company: string;
  location: string;
  bullets: string[];
  side: "left" | "right";
}

const TIMELINE: TimelineItem[] = [
  {
    id: "exp-1",
    period: "2022 – Present",
    title: "Senior Full Stack Developer",
    company: "TechNova Labs",
    location: "Remote",
    bullets: [
      "Architected a multi-tenant SaaS platform serving 40,000+ active users using Next.js and Node.js.",
      "Reduced API response times by 60% through Redis caching and query optimisation.",
      "Led a team of 4 engineers, conducting code reviews and defining engineering standards.",
      "Integrated Stripe billing, Clerk auth, and Resend transactional email into the core product.",
    ],
    side: "right",
  },
  {
    id: "exp-2",
    period: "2020 – 2022",
    title: "Full Stack Developer",
    company: "Pixel & Byte Agency",
    location: "Lahore, PK",
    bullets: [
      "Delivered 20+ client projects spanning e-commerce, dashboards, and marketing sites.",
      "Built a headless Shopify storefront with Next.js that increased client conversion by 35%.",
      "Introduced CI/CD pipelines with GitHub Actions, cutting deployment time from hours to minutes.",
      "Mentored two junior developers and ran weekly knowledge-sharing sessions.",
    ],
    side: "left",
  },
  {
    id: "exp-3",
    period: "2019 – 2020",
    title: "Frontend Developer",
    company: "Startup Foundry",
    location: "Lahore, PK",
    bullets: [
      "Built React SPAs for three early-stage startups from zero to launch.",
      "Implemented design systems using Tailwind CSS and Storybook.",
      "Collaborated directly with founders to translate product requirements into working features.",
    ],
    side: "right",
  },
  {
    id: "exp-4",
    period: "2018 – 2019",
    title: "Junior Web Developer",
    company: "Freelance",
    location: "Remote",
    bullets: [
      "Developed WordPress and custom PHP sites for local businesses.",
      "Learned React and Node.js through self-directed study and shipped first full-stack project.",
    ],
    side: "left",
  },
];

interface SkillItem {
  name: string;
  category: "frontend" | "backend" | "devops" | "tools";
  level: number;
}

const SKILLS: SkillItem[] = [
  { name: "React / Next.js", category: "frontend", level: 96 },
  { name: "TypeScript", category: "frontend", level: 92 },
  { name: "Tailwind CSS", category: "frontend", level: 94 },
  { name: "Framer Motion", category: "frontend", level: 82 },
  { name: "Node.js / Express", category: "backend", level: 90 },
  { name: "PostgreSQL", category: "backend", level: 85 },
  { name: "Prisma ORM", category: "backend", level: 88 },
  { name: "Redis", category: "backend", level: 78 },
  { name: "Docker", category: "devops", level: 80 },
  { name: "GitHub Actions", category: "devops", level: 84 },
  { name: "Vercel / Railway", category: "devops", level: 90 },
  { name: "AWS (EC2, S3, RDS)", category: "devops", level: 72 },
  { name: "Figma", category: "tools", level: 76 },
  { name: "Git", category: "tools", level: 95 },
  { name: "Postman / Insomnia", category: "tools", level: 88 },
  { name: "Linear / Jira", category: "tools", level: 80 },
];

const CATEGORY_META: Record<
  SkillItem["category"],
  { label: string; icon: React.ReactNode; color: string }
> = {
  frontend: {
    label: "Frontend",
    icon: <Code className="h-4 w-4" />,
    color: "text-violet-400",
  },
  backend: {
    label: "Backend",
    icon: <Server className="h-4 w-4" />,
    color: "text-sky-400",
  },
  devops: {
    label: "DevOps",
    icon: <GitBranch className="h-4 w-4" />,
    color: "text-emerald-400",
  },
  tools: {
    label: "Tools",
    icon: <Settings className="h-4 w-4" />,
    color: "text-amber-400",
  },
};

const STATS = [
  { value: 5, suffix: "+", label: "Years experience" },
  { value: 40, suffix: "+", label: "Projects shipped" },
  { value: 20, suffix: "+", label: "Happy clients" },
  { value: 3, suffix: "", label: "Open-source libs" },
];

// ─── Animated counter ──────────────────────────────────────────────────────────

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Proficiency bar ───────────────────────────────────────────────────────────

function ProficiencyBar({ level, color }: { level: number; color: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setTimeout(() => setWidth(level), 100);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [level]);

  const barColor =
    color === "text-violet-400"
      ? "bg-violet-500"
      : color === "text-sky-400"
      ? "bg-sky-500"
      : color === "text-emerald-400"
      ? "bg-emerald-500"
      : "bg-amber-500";

  return (
    <div
      ref={ref}
      className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden"
    >
      <div
        className={cn("h-full rounded-full transition-all duration-1000 ease-out", barColor)}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

// ─── Page component ────────────────────────────────────────────────────────────

export default function AboutPage() {
  const t = useTranslations();
  const categories = (["frontend", "backend", "devops", "tools"] as const);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* ── Hero / Intro split ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--brand-accent) 0%, transparent 70%)",
          }}
        />

        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — avatar */}
            <Reveal>
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                animate="visible"
                className="flex justify-center lg:justify-end"
              >
                <div className="relative">
                  {/* Gradient ring */}
                  <div
                    className="absolute -inset-1 rounded-2xl opacity-70"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--brand-accent), transparent 60%)",
                    }}
                  />
                  <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
                    <img
                      src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/56e2a196afb04971945665f7ca9ae4d8.jpg"
                      alt="Afzal Rao — Full Stack Developer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.classList.add(
                            "flex",
                            "items-center",
                            "justify-center",
                            "bg-white/5"
                          );
                          const initials = document.createElement("span");
                          initials.textContent = "AR";
                          initials.className =
                            "text-5xl font-bold text-white/30 select-none";
                          parent.appendChild(initials);
                        }
                      }}
                    />
                  </div>
                  {/* Floating badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
                    className="absolute -bottom-4 -right-4 flex items-center gap-2 rounded-xl border border-white/10 bg-[var(--card)] px-4 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm font-medium text-white/80">
                      {t("about.badge")}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </Reveal>

            {/* Right — bio + stats */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeInUp}>
                <span
                  className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full border"
                  style={{
                    color: "var(--brand-accent)",
                    borderColor: "color-mix(in srgb, var(--brand-accent) 30%, transparent)",
                    background: "color-mix(in srgb, var(--brand-accent) 8%, transparent)",
                  }}
                >
                  {t("about.eyebrow")}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                  {t("about.heading")}
                </h1>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-base md:text-lg text-white/60 leading-relaxed"
              >
                {t("about.bio1")}
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="text-base text-white/50 leading-relaxed"
              >
                {t("about.bio2")}
              </motion.p>

              {/* Meta info */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-4 text-sm text-white/50"
              >
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-violet-400" aria-hidden="true" />
                  {t("about.location")}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-violet-400" aria-hidden="true" />
                  {t("about.available")}
                </span>
              </motion.div>

              {/* Stats row */}
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2"
              >
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-center"
                  >
                    <p className="text-2xl font-bold text-white">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-0.5 text-xs text-white/50">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Experience timeline ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white/2">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <div className="mb-14 text-center">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full border"
                style={{
                  color: "var(--brand-accent)",
                  borderColor: "color-mix(in srgb, var(--brand-accent) 30%, transparent)",
                  background: "color-mix(in srgb, var(--brand-accent) 8%, transparent)",
                }}
              >
                {t("about.expEyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                {t("about.expHeading")}
              </h2>
            </div>
          </Reveal>

          {/* Timeline */}
          <div className="relative">
            {/* Center line */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, var(--brand-accent), transparent)",
                opacity: 0.3,
              }}
            />

            <div className="flex flex-col gap-12">
              {TIMELINE.map((item, i) => (
                <Reveal key={item.id} delay={i * 0.08}>
                  <div
                    className={cn(
                      "relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start",
                      item.side === "left" ? "md:text-right" : ""
                    )}
                  >
                    {/* Dot on center line */}
                    <div
                      aria-hidden="true"
                      className="absolute left-1/2 top-6 -translate-x-1/2 hidden md:flex h-3 w-3 rounded-full border-2 items-center justify-center"
                      style={{
                        borderColor: "var(--brand-accent)",
                        background: "var(--background)",
                        boxShadow: "0 0 8px color-mix(in srgb, var(--brand-accent) 60%, transparent)",
                      }}
                    />

                    {/* Left column */}
                    <div
                      className={cn(
                        item.side === "right"
                          ? "md:text-right md:pr-8"
                          : "md:col-start-2 md:pl-8 md:row-start-1"
                      )}
                    >
                      <span
                        className="inline-block text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md mb-3"
                        style={{
                          color: "var(--brand-accent)",
                          background: "color-mix(in srgb, var(--brand-accent) 10%, transparent)",
                        }}
                      >
                        {item.period}
                      </span>
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      <p className="text-sm font-medium text-white/60 mt-0.5">
                        {item.company}
                      </p>
                      <p className="text-xs text-white/40 mt-1 flex items-center gap-1 justify-start md:justify-end">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {item.location}
                      </p>
                    </div>

                    {/* Right column — bullets */}
                    <div
                      className={cn(
                        "rounded-xl border border-white/8 bg-white/3 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.2)]",
                        item.side === "right"
                          ? "md:col-start-2 md:pl-8"
                          : "md:col-start-1 md:pr-8 md:row-start-1"
                      )}
                    >
                      <ul className="space-y-2">
                        {item.bullets.map((bullet, bi) => (
                          <li
                            key={bi}
                            className="flex items-start gap-2 text-sm text-white/60 leading-relaxed"
                          >
                            <span
                              className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                              style={{ background: "var(--brand-accent)" }}
                              aria-hidden="true"
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills grid ────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="mb-14 text-center">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full border"
                style={{
                  color: "var(--brand-accent)",
                  borderColor: "color-mix(in srgb, var(--brand-accent) 30%, transparent)",
                  background: "color-mix(in srgb, var(--brand-accent) 8%, transparent)",
                }}
              >
                {t("about.skillsEyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                {t("about.skillsHeading")}
              </h2>
              <p className="mt-3 text-white/50 max-w-xl mx-auto">
                {t("about.skillsSubhead")}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, ci) => {
              const meta = CATEGORY_META[cat];
              const catSkills = SKILLS.filter((s) => s.category === cat);
              return (
                <Reveal key={cat} delay={ci * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="rounded-2xl border border-white/8 bg-white/3 p-5 shadow-[0_2px_16px_rgba(0,0,0,0.2)] h-full"
                  >
                    <div className="flex items-center gap-2 mb-5">
                      <span className={meta.color} aria-hidden="true">
                        {meta.icon}
                      </span>
                      <h3 className={cn("text-sm font-semibold", meta.color)}>
                        {meta.label}
                      </h3>
                    </div>
                    <ul className="space-y-4">
                      {catSkills.map((skill) => (
                        <li key={skill.name}>
                          <div className="flex justify-between mb-1.5">
                            <span className="text-xs font-medium text-white/70">
                              {skill.name}
                            </span>
                            <span className="text-xs text-white/40">
                              {skill.level}%
                            </span>
                          </div>
                          <ProficiencyBar
                            level={skill.level}
                            color={meta.color}
                          />
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Resume CTA card ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white/2">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden">
              {/* Gradient border via pseudo-element trick using a wrapper */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  padding: "1px",
                  background:
                    "linear-gradient(135deg, var(--brand-accent), #7c3aed, transparent 70%)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
                aria-hidden="true"
              />
              <div className="relative rounded-2xl border border-white/8 bg-[var(--card)] px-8 py-10 md:px-12 md:py-12 text-center shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
                {/* Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-10"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 0%, var(--brand-accent), transparent 60%)",
                  }}
                />
                <ArrowDown
                  className="mx-auto mb-4 h-8 w-8 text-violet-400"
                  aria-hidden="true"
                />
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
                  {t("about.resumeHeading")}
                </h2>
                <p className="text-white/55 mb-8 max-w-md mx-auto leading-relaxed">
                  {t("about.resumeBody")}
                </p>
                <a
                  href={BRAND.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-[var(--background)] transition-all duration-300 hover:opacity-90 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                  style={{ background: "var(--brand-accent)" }}
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {t("about.resumeBtn")}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Let's Connect strip ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl border border-white/8 bg-white/3 px-8 py-10 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
                  {t("about.connectHeading")}
                </h2>
                <p className="text-white/55 leading-relaxed max-w-sm">
                  {t("about.connectBody")}
                </p>
              </div>
              <Link
                href="/contact"
                className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold border border-white/15 text-white bg-white/8 transition-all duration-300 hover:bg-white/15 hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {t("about.connectBtn")}
                <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}