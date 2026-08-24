"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import type { ReactNode } from "react";

export function ScrollProgress(): ReactNode {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[rgb(var(--color-accent-cyan))] to-[rgb(var(--color-accent-purple))] origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}
