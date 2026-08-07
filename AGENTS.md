# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
Build a modern portfolio website with dark mode

Additional details provided by the user:
- What's your name or professional alias?: Afzal Rao
- What is your role or title?: Full stack developer

## Goal
Build a modern dark-mode portfolio website for Afzal Rao, a full stack developer, with animated hero, projects showcase, about/timeline, and contact form across four pages.

## Project type
portfolio

## Design system — match this exactly
- Color tokens: `--background: #0A0A0F`, `--foreground: #E8EAF0`, `--card: #13131F`, `--border: #2A2A40`, `--muted-foreground: #8B8FAD`, `--primary: #7C3AED`, `--accent: #A78BFA`, `--brand-primary: #18181B`, `--brand-on-primary: #FFFFFF`, `--brand-secondary: #3F3F46`, `--brand-accent: #2563EB`, `--brand-background: #0A0A0F`

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`about`, `about-hero`, `contact`, `contact-hero`, `cta`, `footer`, `hero`, `nav`, `projects`, `projects-hero`, `services`, `testimonials`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
