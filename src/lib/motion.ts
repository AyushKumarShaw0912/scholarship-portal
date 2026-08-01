import type { Transition, Variants } from "motion/react";

import { ANIMATION } from "@/constants/animation";

export const transition = {
  duration: ANIMATION.REVEAL / 1000,
  ease: [0.22, 1, 0.36, 1],
} satisfies Transition;

export const fadeUp: Variants = {
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
      staggerChildren: ANIMATION.STAGGER / 1000,
      delayChildren: 0.04,
    },
  },
};

export const heroContainer: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: ANIMATION.STAGGER / 1000,
    },
  },
};

export const heroItem: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
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
      duration: ANIMATION.DEFAULT / 1000,
    },
  },

  whileTap: {
    scale: 0.98,
  },
};
