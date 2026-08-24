import type { Transition } from "framer-motion";

/**
 * Default transition
 */
export const defaultTransition: Transition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1],
};

/**
 * Fast transition
 */
export const fastTransition: Transition = {
  duration: 0.2,
  ease: [0.4, 0, 0.2, 1],
};

/**
 * Slow transition
 */
export const slowTransition: Transition = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1],
};

/**
 * Spring transition
 */
export const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

/**
 * Bounce transition
 */
export const bounceTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 10,
};

/**
 * Smooth spring
 */
export const smoothSpring: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};
