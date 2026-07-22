"use client";

import type { PropsWithChildren } from "react";

import { motion, useReducedMotion } from "motion/react";

import { fadeUp } from "@/lib/motion";

interface RevealProps extends PropsWithChildren {
  readonly className?: string;
}

export function Reveal({ children, className }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
}
