"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export function Reveal({ children, className, delay = 0, direction = "up" }: RevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants =
    direction === "left"
      ? {
          hidden: { opacity: 0, x: -32 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
        }
      : direction === "right"
      ? {
          hidden: { opacity: 0, x: 32 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
        }
      : direction === "none"
      ? {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
        }
      : reveal;

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}