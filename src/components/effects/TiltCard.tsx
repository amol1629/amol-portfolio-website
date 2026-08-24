"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import type { ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glareEnabled?: boolean;
  glareColor?: string;
  scale?: number;
}

export function TiltCard({
  children,
  className = "",
  tiltAmount = 10,
  glareEnabled = true,
  glareColor = "rgba(255, 255, 255, 0.1)",
  scale = 1.02,
}: TiltCardProps): ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltAmount;
    const rotateY = ((x - centerX) / centerX) * tiltAmount;

    setTransform({
      rotateX,
      rotateY,
      scale,
    });

    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{
          rotateX: transform.rotateX,
          rotateY: transform.rotateY,
          scale: transform.scale,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: "flat" }}
      >
        {children}
        {glareEnabled && isHovering && !prefersReducedMotion && (
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ borderRadius: "inherit" }}
          >
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor}, transparent 50%)`,
                opacity: isHovering ? 1 : 0,
              }}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}
