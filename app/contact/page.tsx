"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, Send, CheckCircle, AlertCircle, Loader2, MapPin, Clock } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { BRAND, socialLinks } from "@/lib/data";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Types ──────────────────────────────────────────────────────────────────────
interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

// ─── Social icon map ─────────────────────────────────────────────────────────────
const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  GitHub: <Github className="h-5 w-5" aria-hidden="true" />,
  LinkedIn: <Linkedin className="h-5 w-5" aria-hidden="true" />,
  Twitter: <Twitter className="h-5 w-5" aria-hidden="true" />,
};

// ─── Field animation variants ────────────────────────────────────────────────────
const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.08 },
  }),
};

const toastVariants: Variants = {
  hidden: { opacity: 0, y: -16, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, scale: 0.96, transition: { duration: 0.25, ease: "easeIn" } },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────────
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── Contact Form ─────────────────────────────────────────────────────────────────
function ContactForm() {
  const t = useTranslations();
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = t("contact.form.errors.nameRequired");
    if (!form.email.trim()) newErrors.email = t("contact.form.errors.emailRequired");
    else if (!validateEmail(form.email)) newErrors.email = t("contact.form.errors.emailInvalid");
    if (!form.subject.trim()) newErrors.subject = t("contact.form.errors.subjectRequired");
    if (!form.message.trim()) newErrors.message = t("contact.form.errors.messageRequired");
    else if (form.message.trim().length < 20) newErrors.message = t("contact.form.errors.messageTooShort");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    // Simulate EmailJS send (mock — replace with real emailjs.send() call)
    await new Promise((res) => setTimeout(res, 1600));
    const success = Math.random() > 0.1; // 90% success in demo
    if (success) {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } else {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  }

  function handleChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  const fields = [
    { key: "name" as const, label: t("contact.form.nameLabel"), type: "text", placeholder: t("contact.form.namePlaceholder"), index: 0 },
    { key: "email" as const, label: t("contact.form.emailLabel"), type: "email", placeholder: t("contact.form.emailPlaceholder"), index: 1 },
    { key: "subject" as const, label: t("contact.form.subjectLabel"), type: "text", placeholder: t("contact.form.subjectPlaceholder"), index: 2 },
  ];

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Toast */}
      <AnimatePresence>
        {(status === "success" || status === "error") && (
          <motion.div
            key={status}
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="alert"
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium border ${
              status === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            {status === "success" ? (
              <CheckCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            )}
            {status === "success" ? t("contact.form.successMessage") : t("contact.form.errorMessage")}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name, Email, Subject */}
      {fields.map(({ key, label, type, placeholder, index }) => (
        <motion.div
          key={key}
          custom={index}
          variants={fieldVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-1.5"
        >
          <label htmlFor={`contact-${key}`} className="text-sm font-medium text-white/70">
            {label}
          </label>
          <input
            id={`contact-${key}`}
            type={type}
            value={form[key]}
            onChange={handleChange(key)}
            placeholder={placeholder}
            disabled={status === "loading"}
            autoComplete={key === "email" ? "email" : key === "name" ? "name" : "off"}
            className={`rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--brand-accent)]/50 focus:border-[var(--brand-accent)]/60 disabled:opacity-50 ${
              errors[key] ? "border-red-500/60" : "border-white/10 hover:border-white/20"
            }`}
          />
          {errors[key] && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" aria-hidden="true" />
              {errors[key]}
            </p>
          )}
        </motion.div>
      ))}

      {/* Message */}
      <motion.div
        custom={3}
        variants={fieldVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col gap-1.5"
      >
        <label htmlFor="contact-message" className="text-sm font-medium text-white/70">
          {t("contact.form.messageLabel")}
        </label>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={handleChange("message")}
          placeholder={t("contact.form.messagePlaceholder")}
          disabled={status === "loading"}
          rows={5}
          className={`rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--brand-accent)]/50 focus:border-[var(--brand-accent)]/60 resize-none disabled:opacity-50 ${
            errors.message ? "border-red-500/60" : "border-white/10 hover:border-white/20"
          }`}
        />
        {errors.message && (
          <p className="text-xs text-red-400 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" aria-hidden="true" />
            {errors.message}
          </p>
        )}
      </motion.div>

      {/* Submit */}
      <motion.div
        custom={4}
        variants={fieldVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.button
          type="submit"
          disabled={status === "loading"}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-accent)] px-6 py-3.5 text-sm font-semibold text-[var(--brand-accent-fg)] transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {t("contact.form.sending")}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              {t("contact.form.sendButton")}
            </>
          )}
        </motion.button>
      </motion.div>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const t = useTranslations();

  const socialIconMap: Record<string, React.ReactNode> = SOCIAL_ICONS;

  return (
    <main className="min-h-screen bg-[var(--background)] pt-28 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <Reveal className="mb-16 text-center">
          <span className="inline-block rounded-full border border-[var(--brand-accent)]/30 bg-[var(--brand-accent)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--brand-accent)] mb-5">
            {t("contact.eyebrow")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white text-balance mb-4">
            {t("contact.heading")}
          </h1>
          <p className="mx-auto max-w-xl text-base text-white/60 leading-relaxed text-pretty">
            {t("contact.subheading")}
          </p>
        </Reveal>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Left: Info card */}
          <Reveal className="lg:col-span-2" delay={0.05}>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex flex-col gap-8 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_12px_40px_-12px_rgba(0,0,0,0.5)]">

              {/* Availability */}
              <div>
                <h2 className="text-lg font-semibold text-white mb-3">{t("contact.info.availabilityTitle")}</h2>
                <div className="flex items-start gap-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" aria-hidden="true" />
                  <p className="text-sm text-emerald-300 leading-relaxed">
                    {t("contact.info.availabilityText")}
                  </p>
                </div>
              </div>

              {/* Location & timezone */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <MapPin className="h-4 w-4 text-[var(--brand-accent)] shrink-0" aria-hidden="true" />
                  <span>{t("contact.info.location")}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <Clock className="h-4 w-4 text-[var(--brand-accent)] shrink-0" aria-hidden="true" />
                  <span>{t("contact.info.timezone")}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/10" />

              {/* Social links */}
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">{t("contact.info.socialTitle")}</h2>
                <motion.ul
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col gap-3"
                >
                  {socialLinks.map((link) => (
                    <motion.li key={link.key} variants={fadeInUp}>
                      <motion.a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${link.platform} — ${link.handle}`}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:text-white hover:border-[var(--brand-accent)]/40 hover:bg-[var(--brand-accent)]/5 transition-all duration-200 group"
                      >
                        <span className="text-[var(--brand-accent)] group-hover:scale-110 transition-transform duration-200">
                          {socialIconMap[link.platform] ?? <Mail className="h-5 w-5" aria-hidden="true" />}
                        </span>
                        <span className="flex flex-col">
                          <span className="font-medium text-white text-xs">{link.platform}</span>
                          <span className="text-white/50 text-xs">{link.handle}</span>
                        </span>
                      </motion.a>
                    </motion.li>
                  ))}

                  {/* Email */}
                  <motion.li variants={fadeInUp}>
                    <motion.a
                      href={`mailto:${BRAND.email}`}
                      aria-label={`Email — ${BRAND.email}`}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:text-white hover:border-[var(--brand-accent)]/40 hover:bg-[var(--brand-accent)]/5 transition-all duration-200 group"
                    >
                      <span className="text-[var(--brand-accent)] group-hover:scale-110 transition-transform duration-200">
                        <Mail className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-medium text-white text-xs">{t("contact.info.emailLabel")}</span>
                        <span className="text-white/50 text-xs">{BRAND.email}</span>
                      </span>
                    </motion.a>
                  </motion.li>
                </motion.ul>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/10" />

              {/* Response time */}
              <p className="text-xs text-white/40 leading-relaxed">
                {t("contact.info.responseNote")}
              </p>
            </div>
          </Reveal>

          {/* Right: Form */}
          <Reveal className="lg:col-span-3" delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_12px_40px_-12px_rgba(0,0,0,0.5)]">
              <h2 className="text-xl font-semibold text-white mb-1">{t("contact.form.heading")}</h2>
              <p className="text-sm text-white/50 mb-7">{t("contact.form.subheading")}</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}