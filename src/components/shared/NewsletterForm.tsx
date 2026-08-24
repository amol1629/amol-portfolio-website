"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, AlertCircle } from "lucide-react";
import type { ReactNode, FormEvent } from "react";

interface NewsletterFormProps {
  className?: string;
}

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({ className }: NewsletterFormProps): ReactNode {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // Simulate API call - replace with actual newsletter subscription
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className={className}>
      <h4 className="text-sm font-semibold text-[rgb(var(--color-fg-primary))] mb-2">
        Stay updated
      </h4>
      <p className="text-sm text-[rgb(var(--color-fg-tertiary))] mb-4">
        Get notified about new projects and articles.
      </p>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={status === "loading" || status === "success"}
          className="w-full px-4 py-3 pr-12 rounded-lg bg-[rgb(var(--color-bg-tertiary))] border border-[rgb(var(--color-border-default))] text-[rgb(var(--color-fg-primary))] placeholder:text-[rgb(var(--color-fg-tertiary))] focus:outline-none focus:border-[rgb(var(--color-accent-cyan))] disabled:opacity-50 text-sm"
        />
        <button
          type="submit"
          disabled={!email || status === "loading" || status === "success"}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md bg-[rgb(var(--color-accent-cyan))] text-[rgb(var(--color-bg-primary))] disabled:opacity-50 hover:opacity-90 transition-opacity"
          aria-label="Subscribe"
        >
          <AnimatePresence mode="wait">
            {status === "loading" ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{ rotate: { repeat: Infinity, duration: 1, ease: "linear" } }}
                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              />
            ) : status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <Check className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                key="send"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Send className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </form>

      <AnimatePresence>
        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-[rgb(var(--color-success))] flex items-center gap-1"
          >
            <Check className="w-3 h-3" /> Thanks for subscribing!
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-[rgb(var(--color-error))] flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" /> Something went wrong. Try again.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
