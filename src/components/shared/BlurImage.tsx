"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface BlurImageProps {
  src: string;
  alt: string;
  width?: number | undefined;
  height?: number | undefined;
  fill?: boolean | undefined;
  className?: string;
  containerClassName?: string;
  priority?: boolean | undefined;
}

export function BlurImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  containerClassName,
  priority,
}: BlurImageProps): ReactNode {
  const [isLoading, setIsLoading] = useState(true);

  const imageProps = fill
    ? { fill: true as const }
    : { width: width ?? 0, height: height ?? 0 };

  return (
    <div className={cn("overflow-hidden", containerClassName)}>
      <Image
        src={src}
        alt={alt}
        {...imageProps}
        priority={priority ?? false}
        className={cn(
          "duration-700 ease-in-out",
          isLoading ? "scale-110 blur-lg" : "scale-100 blur-0",
          className
        )}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
