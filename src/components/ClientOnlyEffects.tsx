"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const CustomCursor = dynamic(
  () => import("@/components/effects").then((mod) => mod.CustomCursor),
  { ssr: false }
);

const KeyboardShortcuts = dynamic(
  () => import("@/components/shared").then((mod) => mod.KeyboardShortcuts),
  { ssr: false }
);

export function ClientOnlyEffects(): ReactNode {
  return (
    <>
      <CustomCursor />
      <KeyboardShortcuts />
    </>
  );
}
