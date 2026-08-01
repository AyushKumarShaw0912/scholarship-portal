/**
 * Central animation control.
 * Set `ENABLED` to `false` to disable site-wide motion (CSS + Reveal).
 */
export const ANIMATION = {
  ENABLED: true,

  FAST: 150,
  DEFAULT: 200,
  SLOW: 300,
  EXTRA_SLOW: 500,

  /** Scroll / entrance reveal duration (ms) */
  REVEAL: 450,

  /** Stagger between sibling reveals (ms) */
  STAGGER: 70,
} as const;
