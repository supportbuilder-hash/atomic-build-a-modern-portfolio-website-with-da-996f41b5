"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { X, Code2 as Github, ExternalLink, Code2, Layers, Server, Terminal } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { staggerContainer, scaleIn } from "@/lib/motion";

// ─── Inline project data ────────────────────────────────────────────────────────
interface ProjectItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  category: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "1",
    title: "NexCommerce",
    description: "A high-performance e-commerce platform with real-time inventory, Stripe payments, and a headless CMS.",
    longDescription: "NexCommerce is a production-grade e-commerce platform built with Next.js 14 App Router and TypeScript. It features real-time inventory management via WebSockets, Stripe Checkout and webhooks for payments, a headless CMS powered by Sanity, and a Redis-backed cart. The storefront achieves a Lighthouse score of 98 and handles thousands of concurrent users through edge caching.",
    tech: ["Next.js", "TypeScript", "Stripe", "Sanity", "Redis", "Tailwind CSS", "Vercel"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/fe772a25616247cdadcbfbf55de0e5c6.png",
    githubUrl: "https://github.com/afzalrao/nexcommerce",
    liveUrl: "https://nexcommerce.demo",
    featured: true,
    category: "Full Stack",
  },
  {
    id: "2",
    title: "TaskFlow",
    description: "A collaborative project management tool with drag-and-drop boards, real-time updates, and team analytics.",
    longDescription: "TaskFlow is a Kanban-style project management application inspired by Linear and Jira. It uses Supabase for real-time collaboration, allowing multiple team members to see board updates instantly. Features include drag-and-drop task management, sprint planning, burndown charts, and Slack notifications. The backend is a Node.js REST API deployed on Railway.",
    tech: ["React", "Node.js", "Supabase", "PostgreSQL", "Socket.io", "Recharts", "Railway"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/9f855b37711a4916b37bed85b01ac77f.png",
    githubUrl: "https://github.com/afzalrao/taskflow",
    liveUrl: "https://taskflow.demo",
    featured: true,
    category: "Full Stack",
  },
  {
    id: "3",
    title: "DevMetrics",
    description: "A developer analytics dashboard that aggregates GitHub, Jira, and CI/CD data into actionable insights.",
    longDescription: "DevMetrics pulls data from GitHub, Jira, and CircleCI APIs to give engineering teams a unified view of their velocity, code quality, and deployment frequency. Built with a React frontend and a FastAPI backend, it uses Celery for background data sync and stores aggregated metrics in TimescaleDB for fast time-series queries.",
    tech: ["React", "FastAPI", "Python", "TimescaleDB", "Celery", "Docker", "GitHub API"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/ac68707bc9254d99ba464aa1eb66efe7.png",
    githubUrl: "https://github.com/afzalrao/devmetrics",
    category: "Backend",
  },
  {
    id: "4",
    title: "Luminary UI",
    description: "An open-source React component library with 40+ accessible, themeable components and full Storybook docs.",
    longDescription: "Luminary UI is a fully accessible React component library built on Radix UI primitives and styled with Tailwind CSS. It ships 40+ components including complex patterns like comboboxes, date pickers, and data tables. Every component meets WCAG 2.1 AA standards, supports dark mode out of the box, and is documented with interactive Storybook stories and usage examples.",
    tech: ["React", "TypeScript", "Radix UI", "Tailwind CSS", "Storybook", "Vitest", "npm"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/ae0f5b39dd9b41ca986f23068e14ba0f.png",
    githubUrl: "https://github.com/afzalrao/luminary-ui",
    liveUrl: "https://luminary-ui.demo",
    featured: true,
    category: "Frontend",
  },
  {
    id: "5",
    title: "CloudDeploy CLI",
    description: "A zero-config CLI tool that provisions AWS infrastructure and deploys containerized apps in under 60 seconds.",
    longDescription: "CloudDeploy CLI abstracts away the complexity of AWS infrastructure provisioning. With a single command, it creates an ECS cluster, sets up an Application Load Balancer, configures auto-scaling, and deploys your Docker container. It uses Terraform under the hood and stores state in S3. Supports blue-green deployments and automatic rollback on health check failures.",
    tech: ["Node.js", "TypeScript", "AWS ECS", "Terraform", "Docker", "S3", "CloudWatch"],
    image: "https://cdn.lapa.ninja/assets/images/1x/authkit.webp",
    githubUrl: "https://github.com/afzalrao/clouddeploy-cli",
    category: "DevOps",
  },
  {
    id: "6",
    title: "AuthKit",
    description: "A plug-and-play authentication microservice with JWT, OAuth2, MFA, and a React SDK.",
    longDescription: "AuthKit is a self-hostable authentication microservice that handles the full auth lifecycle: registration, login, JWT refresh tokens, OAuth2 social login (Google, GitHub), TOTP-based MFA, and session management. It ships with a React SDK for seamless frontend integration and a Swagger-documented REST API. Deployed as a Docker container with a Postgres backend.",
    tech: ["Node.js", "Express", "PostgreSQL", "JWT", "OAuth2", "Docker", "React SDK"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/afa44eb78b0e4953bcbf373a400ab37b.png",
    githubUrl: "https://github.com/afzalrao/authkit",
    liveUrl: "https://authkit.demo",
    category: "Backend",
  },
  {
    id: "7",
    title: "PortfolioGen",
    description: "A Next.js SaaS that generates beautiful developer portfolios from a GitHub profile in seconds.",
    longDescription: "PortfolioGen reads a developer's GitHub profile, repositories, and contribution graph via the GitHub GraphQL API and generates a fully customizable portfolio site. Users can pick from 5 themes, reorder sections, and publish to a custom subdomain. Built with Next.js App Router, Prisma, and PlanetScale. Stripe handles the Pro tier subscription.",
    tech: ["Next.js", "Prisma", "PlanetScale", "GitHub GraphQL", "Stripe", "Vercel", "TypeScript"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/0ab62fb921844c89a292a138f100f177.png",
    githubUrl: "https://github.com/afzalrao/portfoliogen",
    liveUrl: "https://portfoliogen.demo",
    category: "Full Stack",
  },
  {
    id: "8",
    title: "PipelineWatch",
    description: "A real-time CI/CD monitoring dashboard with Slack alerts, failure analytics, and build time trends.",
    longDescription: "PipelineWatch aggregates build data from GitHub Actions, CircleCI, and Jenkins into a single real-time dashboard. It tracks build success rates, average build times, flaky tests, and deployment frequency. Slack and PagerDuty integrations send instant alerts on failures. The backend is a Go service using gRPC for low-latency data streaming.",
    tech: ["Go", "gRPC", "React", "InfluxDB", "Grafana", "Slack API", "Docker"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/3e2481472bc64b38aebb12eca7b08786.webp",
    githubUrl: "https://github.com/afzalrao/pipelinewatch",
    category: "DevOps",
  },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "All": <Layers className="h-3.5 w-3.5" />,
  "Frontend": <Code2 className="h-3.5 w-3.5" />,
  "Backend": <Server className="h-3.5 w-3.5" />,
  "Full Stack": <Layers className="h-3.5 w-3.5" />,
  "DevOps": <Terminal className="h-3.5 w-3.5" />,
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.94, y: 16, transition: { duration: 0.2, ease: "easeIn" } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

export default function ProjectsPage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))],
    []
  );

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] pt-24 pb-32">
      {/* ── Hero ── */}
      <Reveal>
        <section className="mx-auto max-w-5xl px-6 text-center mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)] mb-5">
            {t("projects.badge")}
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl lg:text-6xl text-balance mb-5">
            {t("projects.heading")}
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[hsl(var(--muted-foreground))] text-pretty">
            {t("projects.subheading")}
          </p>
        </section>
      </Reveal>

      {/* ── Filter pills ── */}
      <Reveal delay={0.08}>
        <div className="mx-auto max-w-5xl px-6 mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                  activeCategory === cat
                    ? "bg-[var(--accent)] text-black border-[var(--accent)] shadow-[0_0_12px_var(--accent)/30]"
                    : "bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))] hover:border-[var(--accent)]/50 hover:text-[hsl(var(--foreground))]"
                )}
              >
                {CATEGORY_ICONS[cat]}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── Project grid ── */}
      <section className="mx-auto max-w-5xl px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => setSelectedProject(project)}
                className={cn(
                  "group relative flex flex-col rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden cursor-pointer",
                  "shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.18)]",
                  "hover:border-[var(--accent)]/40 hover:shadow-[0_4px_32px_-8px_rgba(0,0,0,0.3)] transition-all duration-300",
                  project.featured && "sm:col-span-2 lg:col-span-1"
                )}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-[hsl(var(--muted))]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {project.featured && (
                    <span className="absolute top-3 left-3 rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-black">
                      Featured
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--card))]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-1.5 flex items-start justify-between gap-2">
                    <h2 className="text-base font-semibold text-[hsl(var(--foreground))] leading-snug">
                      {project.title}
                    </h2>
                    <span className="shrink-0 rounded-full border border-[hsl(var(--border))] px-2 py-0.5 text-[10px] font-medium text-[hsl(var(--muted-foreground))]">
                      {project.category}
                    </span>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))] line-clamp-2 flex-1">
                    {project.description}
                  </p>
                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-[hsl(var(--muted))] px-2 py-0.5 text-[11px] font-medium text-[hsl(var(--muted-foreground))]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="rounded-md bg-[hsl(var(--muted))] px-2 py-0.5 text-[11px] font-medium text-[hsl(var(--muted-foreground))]">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-24 text-center text-[hsl(var(--muted-foreground))]">
            <Layers className="mx-auto mb-3 h-10 w-10 opacity-30" />
            <p className="text-sm">{t("projects.empty")}</p>
          </div>
        )}
      </section>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal panel */}
            <motion.div
              key="modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
              onClick={() => setSelectedProject(null)}
            >
              <div
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-[0_24px_80px_-16px_rgba(0,0,0,0.6)]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close */}
                <button
                  onClick={() => setSelectedProject(null)}
                  aria-label={t("projects.modal.close")}
                  className="absolute top-4 right-4 z-10 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-1.5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Screenshot */}
                <div className="relative h-52 sm:h-64 overflow-hidden rounded-t-2xl bg-[hsl(var(--muted))]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--card))]/80 to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <span className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))]/80 backdrop-blur-sm px-3 py-1 text-xs font-medium text-[hsl(var(--muted-foreground))]">
                      {selectedProject.category}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-8">
                  <h2 className="mb-3 text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    {selectedProject.title}
                  </h2>
                  <p className="mb-6 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                    {selectedProject.longDescription}
                  </p>

                  {/* Tech stack */}
                  <div className="mb-6">
                    <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                      {t("projects.modal.techStack")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:opacity-90 hover:shadow-[0_0_16px_var(--accent)/40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {t("projects.modal.liveDemo")}
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-5 py-2.5 text-sm font-semibold text-[hsl(var(--foreground))] transition-all duration-200 hover:border-[var(--accent)]/50 hover:bg-[hsl(var(--card))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                      >
                        <Github className="h-4 w-4" />
                        {t("projects.modal.viewCode")}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}