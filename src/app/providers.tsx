"use client";

import { Suspense, type ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/providers";
import { RouteScrollReset } from "@/components/providers/RouteScrollReset";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps): ReactNode {
  return (
    <SmoothScrollProvider>
      <Suspense fallback={null}>
        <RouteScrollReset />
      </Suspense>
      {children}
    </SmoothScrollProvider>
  );
}
