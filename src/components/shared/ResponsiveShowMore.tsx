"use client";

import { useState, type ReactNode, Children } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useMediaQuery } from "@/hooks";

interface ResponsiveShowMoreProps {
  children: ReactNode;
  collapsedContent?: ReactNode;
  breakpoint?: "md" | "lg";
  showMoreText?: string;
  showLessText?: string;
  initialCount?: number;
  className?: string;
}

export function ResponsiveShowMore({
  children,
  collapsedContent,
  breakpoint = "md",
  showMoreText = "Show More",
  showLessText = "Show Less",
  initialCount,
  className = "",
}: ResponsiveShowMoreProps): ReactNode {
  const [isExpanded, setIsExpanded] = useState(false);

  const breakpointQuery = breakpoint === "md" ? "(min-width: 768px)" : "(min-width: 1024px)";
  const isDesktop = useMediaQuery(breakpointQuery);

  if (isDesktop) {
    return <div className={className}>{children}</div>;
  }

  if (initialCount !== undefined) {
    const childArray = Children.toArray(children);
    const visibleChildren = childArray.slice(0, initialCount);
    const hiddenChildren = childArray.slice(initialCount);
    const hasMore = hiddenChildren.length > 0;

    return (
      <>
        <div className={className}>
          {visibleChildren}
          {isExpanded && hiddenChildren}
        </div>

        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white rounded-full border border-white/15 hover:border-white/25 transition-all duration-300 mt-4"
            style={{
              background: "linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(139, 92, 246, 0.15))",
            }}
          >
            {isExpanded ? (
              <>
                {showLessText} <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                {showMoreText} ({hiddenChildren.length} more) <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </>
    );
  }

  return (
    <>
      <div className={className}>
        {collapsedContent}
        {isExpanded && children}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white rounded-full border border-white/15 hover:border-white/25 transition-all duration-300 mt-4"
        style={{
          background: "linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(139, 92, 246, 0.15))",
        }}
      >
        {isExpanded ? (
          <>
            {showLessText} <ChevronUp className="w-4 h-4" />
          </>
        ) : (
          <>
            {showMoreText} <ChevronDown className="w-4 h-4" />
          </>
        )}
      </button>
    </>
  );
}
