"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, AlertCircle } from "lucide-react";
import { LiquidGlassCard } from "../glass";
import type { ReactNode, FormEvent } from "react";

interface ContactFormProps {
  className?: string;
}

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm({ className }: ContactFormProps): ReactNode {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");

    // Simulate API call - replace with actual form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-lg bg-[rgb(var(--color-bg-tertiary))] border border-[rgb(var(--color-border-default))] text-[rgb(var(--color-fg-primary))] placeholder:text-[rgb(var(--color-fg-tertiary))] focus:outline-none focus:border-[rgb(var(--color-accent-cyan))] disabled:opacity-50 text-sm transition-colors";

  if (status === "success") {
    return (
      <LiquidGlassCard className={className}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[rgb(var(--color-success))]/10 flex items-center justify-center">
            <Check className="w-8 h-8 text-[rgb(var(--color-success))]" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
          <p className="text-[rgb(var(--color-fg-secondary))]">
            Thanks for reaching out. I&apos;ll get back to you within 24-48 hours.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 text-sm text-[rgb(var(--color-accent-cyan))] hover:underline"
          >
            Send another message
          </button>
        </motion.div>
      </LiquidGlassCard>
    );
  }

  return (
    <LiquidGlassCard className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[rgb(var(--color-fg-secondary))] mb-1"
            >
              Name *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
              disabled={status === "loading"}
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[rgb(var(--color-fg-secondary))] mb-1"
            >
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@company.com"
              disabled={status === "loading"}
              required
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-[rgb(var(--color-fg-secondary))] mb-1"
          >
            Company
          </label>
          <input
            id="company"
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Your company (optional)"
            disabled={status === "loading"}
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-[rgb(var(--color-fg-secondary))] mb-1"
          >
            Message *
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell me about your project..."
            disabled={status === "loading"}
            required
            rows={5}
            className={inputClasses}
          />
        </div>

        <div aria-live="polite" aria-atomic="true">
          <AnimatePresence>
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-[rgb(var(--color-error))] flex items-center gap-2"
                role="alert"
              >
                <AlertCircle className="w-4 h-4" /> Something went wrong. Please try again.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 rounded-lg bg-[rgb(var(--color-accent-cyan))] text-[rgb(var(--color-bg-primary))] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Message
            </>
          )}
        </button>
      </form>
    </LiquidGlassCard>
  );
}
