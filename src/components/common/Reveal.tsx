"use client";

import type { PropsWithChildren } from "react";

import { motion, useReducedMotion } from "motion/react";

import { ANIMATION } from "@/constants/animation";
import { fadeUp, transition } from "@/lib/motion";

interface RevealProps extends PropsWithChildren {
  readonly className?: string;
  /** Extra delay in seconds (useful for staggered siblings). */
  readonly delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (!ANIMATION.ENABLED || reduceMotion) {
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
        amount: 0.15,
      }}
      transition={{ ...transition, delay }}
    >
      {children}
    </motion.div>
  );
}
