"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "typescript",
  filename,
  className,
  showLineNumbers = true,
}: CodeBlockProps): ReactNode {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lines = code.split("\n");

  return (
    <div className={cn("rounded-xl overflow-hidden bg-[rgb(var(--color-bg-tertiary))] border border-white/5", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          {filename && (
            <span className="ml-2 text-xs text-[rgb(var(--color-fg-tertiary))] font-mono">
              {filename}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[rgb(var(--color-fg-tertiary))] uppercase">
            {language}
          </span>
          <button
            onClick={copyCode}
            className="p-1.5 rounded hover:bg-white/5 transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="w-4 h-4 text-[rgb(var(--color-success))]" />
            ) : (
              <Copy className="w-4 h-4 text-[rgb(var(--color-fg-tertiary))]" />
            )}
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="table-row">
                {showLineNumbers && (
                  <span className="table-cell pr-4 text-[rgb(var(--color-fg-tertiary))] select-none text-right w-8">
                    {i + 1}
                  </span>
                )}
                <span className="table-cell text-[rgb(var(--color-fg-secondary))]">
                  {line || " "}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
