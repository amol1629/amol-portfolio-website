"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function RouteScrollReset(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const search = searchParams.toString();
    const currentUrl = search ? `${pathname}?${search}` : pathname;

    if (previousUrlRef.current === null) {
      previousUrlRef.current = currentUrl;
      return;
    }

    if (previousUrlRef.current === currentUrl) return;

    previousUrlRef.current = currentUrl;

    if (window.location.hash) return;

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, [pathname, searchParams]);

  return null;
}
