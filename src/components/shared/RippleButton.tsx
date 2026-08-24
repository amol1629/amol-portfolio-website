"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import type { ReactNode, MouseEvent } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface RippleButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function RippleButton({
  children,
  className,
  onClick,
  disabled,
}: RippleButtonProps): ReactNode {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();

      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);

      onClick?.();
    },
    [onClick]
  );

  return (
    <button
      className={cn("relative overflow-hidden", className)}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute w-12 h-12 rounded-full bg-white/30 pointer-events-none"
            style={{
              left: ripple.x - 24,
              top: ripple.y - 24,
            }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
}
