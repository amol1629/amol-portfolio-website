import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/**
 * SectionWrapper
 *
 * Provides consistent section layout with padding, max-width container,
 * and optional background. Use for all homepage sections.
 *
 * Props:
 * - id: Section ID for navigation anchoring
 * - className: Additional classes
 * - children: Section content
 * - background: Optional background element/class
 * - fullWidth: If true, removes max-width constraint
 */
interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: ReactNode;
  background?: ReactNode;
  fullWidth?: boolean;
}

export function SectionWrapper({
  id,
  className,
  children,
  background,
  fullWidth = false,
}: SectionWrapperProps): ReactNode {
  return (
    <section
      id={id}
      className={cn("relative section-padding", className)}
    >
      {background && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {background}
        </div>
      )}
      <div
        className={cn(
          "container-custom",
          fullWidth && "max-w-none px-0"
        )}
      >
        {children}
      </div>
    </section>
  );
}
