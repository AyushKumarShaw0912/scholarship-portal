import type { Transition, Variants } from "motion/react";

export const transition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
} satisfies Transition;

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition,
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition,
  },
};

export const staggerContainer: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const heroContainer: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const heroItem: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition,
  },
};

export const hoverLift = {
  whileHover: {
    y: -4,
    transition: {
      duration: 0.18,
    },
  },

  whileTap: {
    scale: 0.98,
  },
};
