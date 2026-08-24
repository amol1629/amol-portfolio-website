"use client";

import { type ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/providers";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps): ReactNode {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
