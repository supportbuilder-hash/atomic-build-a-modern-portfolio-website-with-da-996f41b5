export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  category: string;
}

export interface Experience {
  period: string;
  title: string;
  company: string;
  description: string;
}

export interface Skill {
  name: string;
  category: string;
  description: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  description: string;
  key?: string;
}

export const BRAND = {
  name: "Afzal Rao",
  title: "Full Stack Developer",
  tagline: "Building fast, scalable, and beautiful web applications.",
  email: "afzal@afzalrao.dev",
  resumeUrl: "/resume-afzal-rao.pdf",
} as const;

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Projects", href: "/projects", key: "projects" },
  { label: "About", href: "/about", key: "about" },
  { label: "Contact", href: "/contact", key: "contact" },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/afzalrao",
    handle: "github.com/afzalrao",
    description: "Browse my open-source projects, contributions, and code experiments",
    key: "github",
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/afzalrao",
    handle: "linkedin.com/in/afzalrao",
    description: "Professional background, recommendations, and career updates",
    key: "linkedin",
  },
  {
    platform: "Twitter",
    url: "https://twitter.com/afzalrao_dev",
    handle: "@afzalrao_dev",
    description: "Quick thoughts on full-stack development, tooling, and the web platform",
    key: "twitter",
  },
];
