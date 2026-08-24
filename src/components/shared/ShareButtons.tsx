"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { Icon } from "@iconify/react";
import type { ReactNode } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

export function ShareButtons({ url, title, className }: ShareButtonsProps): ReactNode {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={className}>
      <span className="text-sm text-[rgb(var(--color-fg-tertiary))] mr-3">Share:</span>
      <div className="inline-flex gap-2">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] transition-colors"
          aria-label="Share on Twitter"
        >
          <Icon icon="mdi:twitter" className="w-4 h-4 text-[rgb(var(--color-fg-secondary))]" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Icon icon="mdi:linkedin" className="w-4 h-4 text-[rgb(var(--color-fg-secondary))]" />
        </a>
        <button
          onClick={copyLink}
          className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] transition-colors"
          aria-label="Copy link"
        >
          {copied ? (
            <Check className="w-4 h-4 text-[rgb(var(--color-success))]" />
          ) : (
            <Link2 className="w-4 h-4 text-[rgb(var(--color-fg-secondary))]" />
          )}
        </button>
      </div>
    </div>
  );
}
