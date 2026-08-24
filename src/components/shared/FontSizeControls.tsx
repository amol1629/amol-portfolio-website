"use client";

import { useState, useEffect } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface FontSizeControlsProps {
  className?: string;
}

const FONT_SIZE_KEY = "font-size-scale";
const MIN_SCALE = 0.85;
const MAX_SCALE = 1.25;
const STEP = 0.05;
const DEFAULT_SCALE = 1;

export function FontSizeControls({ className }: FontSizeControlsProps): ReactNode {
  const [scale, setScale] = useState(DEFAULT_SCALE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(FONT_SIZE_KEY);
    if (stored) {
      const parsed = parseFloat(stored);
      if (!isNaN(parsed) && parsed >= MIN_SCALE && parsed <= MAX_SCALE) {
        setScale(parsed);
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.style.fontSize = `${scale * 100}%`;
    localStorage.setItem(FONT_SIZE_KEY, scale.toString());
  }, [scale, mounted]);

  const decrease = () => setScale((s) => Math.max(MIN_SCALE, s - STEP));
  const increase = () => setScale((s) => Math.min(MAX_SCALE, s + STEP));
  const reset = () => setScale(DEFAULT_SCALE);

  if (!mounted) return null;

  const isMin = scale <= MIN_SCALE;
  const isMax = scale >= MAX_SCALE;
  const isDefault = Math.abs(scale - DEFAULT_SCALE) < 0.001;

  return (
    <div
      className={cn(
        "flex items-center gap-1 p-1 rounded-lg bg-[rgb(var(--color-bg-tertiary))] border border-white/5",
        className
      )}
    >
      <button
        onClick={decrease}
        disabled={isMin}
        className="min-w-[44px] min-h-[44px] rounded-md hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        aria-label="Decrease font size"
      >
        <Minus className="w-4 h-4 text-[rgb(var(--color-fg-tertiary))]" />
      </button>

      <span className="px-2 text-xs font-mono text-[rgb(var(--color-fg-secondary))] min-w-[3rem] text-center">
        {Math.round(scale * 100)}%
      </span>

      <button
        onClick={increase}
        disabled={isMax}
        className="min-w-[44px] min-h-[44px] rounded-md hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        aria-label="Increase font size"
      >
        <Plus className="w-4 h-4 text-[rgb(var(--color-fg-tertiary))]" />
      </button>

      {!isDefault && (
        <button
          onClick={reset}
          className="min-w-[44px] min-h-[44px] rounded-md hover:bg-white/5 transition-colors flex items-center justify-center"
          aria-label="Reset font size"
        >
          <RotateCcw className="w-4 h-4 text-[rgb(var(--color-fg-tertiary))]" />
        </button>
      )}
    </div>
  );
}
