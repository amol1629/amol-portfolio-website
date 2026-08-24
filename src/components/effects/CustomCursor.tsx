"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useMediaQuery, useReducedMotion } from "@/hooks";
import type { ReactNode } from "react";

interface CustomCursorProps {
  color?: string;
  size?: number;
  ringSize?: number;
}

export function CustomCursor({
  color = "rgb(6, 182, 212)",
  size = 8,
  ringSize = 40,
}: CustomCursorProps): ReactNode {
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const isMobilePointer = useMediaQuery("(max-width: 767px), (hover: none), (pointer: coarse)");

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const hoverTargetRef = useRef<string | null>(null);

  useEffect(() => {
    if (prefersReducedMotion || isMobilePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        window.getComputedStyle(target).cursor === "pointer";

      const isInteractive =
        target.hasAttribute("data-cursor-hover") ||
        target.closest("[data-cursor-hover]");

      setIsHovering(!!isInteractive || !!isClickable);

      if (isInteractive || isClickable) {
        hoverTargetRef.current = (target.closest("[data-cursor-hover]") as HTMLElement)?.getAttribute("data-cursor-hover") ?? "default";
      } else {
        hoverTargetRef.current = null;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleElementHover);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleElementHover);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, prefersReducedMotion, isMobilePointer]);

  if (prefersReducedMotion || isMobilePointer) return null;

  return (
    <>
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Dot - hide when hovering clickable */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 0 : 1,
            opacity: isHidden ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: "50%",
          }}
        />
      </motion.div>

      {/* Ring - hide when hovering clickable */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 0 : 1,
            opacity: isHidden || isHovering ? 0 : 0.4,
          }}
          transition={{ duration: 0.2 }}
          style={{
            width: ringSize,
            height: ringSize,
            border: `1.5px solid ${color}`,
            borderRadius: "50%",
          }}
        />
      </motion.div>

      {/* Filled circle with ring - for hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1 : 0,
            opacity: isHidden ? 0 : isHovering ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="relative flex items-center justify-center"
          style={{
            width: ringSize,
            height: ringSize,
          }}
        >
          {/* Outer ring */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: `2px solid ${color}`,
              opacity: 0.6,
            }}
          />
          {/* Inner filled circle */}
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: color,
              opacity: 0.9,
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
