"use client";

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, defaultTransition } from "@/lib/animations";
import { useReducedMotion } from "@/hooks";
import { Button, Badge, Tooltip } from "@/components/shared";
import { Check, Copy, Clock, MapPin } from "lucide-react";
import { Icon } from "@iconify/react";
import { SOCIAL_ICON_MAP } from "./contact.data";
import type { ReactNode } from "react";

interface SocialLink {
  platform: string;
  href: string;
  label: string;
}

interface ContactClientProps {
  email: string;
  socialLinks: SocialLink[];
}

interface CopyEmailButtonProps {
  email: string;
}

const CopyEmailButton = memo(function CopyEmailButton({ email }: CopyEmailButtonProps): ReactNode {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setShowToast(true);
      setTimeout(() => {
        setCopied(false);
        setShowToast(false);
      }, 2000);
    } catch {
      window.open(`mailto:${email}`);
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={handleCopy}
        variant="outline"
        size="lg"
        aria-label={copied ? "Email copied to clipboard" : `Copy email address ${email}`}
      >
        {copied ? (
          <>
            <Check className="mr-2 w-5 h-5 text-emerald-400" aria-hidden="true" />
            <span aria-live="polite">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="mr-2 w-5 h-5" aria-hidden="true" />
            Copy Email
          </>
        )}
      </Button>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm whitespace-nowrap"
          >
            <div className="flex items-center gap-2 text-sm text-emerald-400">
              <Check className="w-4 h-4" />
              <span>Email copied to clipboard!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

function ContactClientComponent({ email, socialLinks }: ContactClientProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const containerVariants = prefersReducedMotion ? {} : staggerContainer;
  const itemVariants = prefersReducedMotion ? {} : fadeUp;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="max-w-2xl mx-auto text-center"
    >
      <motion.div variants={itemVariants} transition={defaultTransition}>
        <Badge variant="success" className="mb-6">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Available for new projects
        </Badge>
      </motion.div>

      <motion.div
        variants={itemVariants}
        transition={defaultTransition}
        className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8 text-sm text-[rgb(var(--color-fg-tertiary))]"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>Usually responds within 24 hours</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <span>Based in India (IST)</span>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        transition={defaultTransition}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
      >
        <Button href="/work-with-me" size="lg">
          Work With Me
        </Button>
        <CopyEmailButton email={email} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        transition={defaultTransition}
        className="flex justify-center gap-3"
      >
        {socialLinks.map((social) => {
          const iconName = SOCIAL_ICON_MAP[social.platform] ?? "mdi:link";
          return (
            <Tooltip key={social.platform} content={social.label} position="top">
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-cyan-500/30 transition-all group"
                aria-label={social.label}
              >
                <Icon
                  icon={iconName}
                  className="w-5 h-5 text-[rgb(var(--color-fg-secondary))] group-hover:text-cyan-400 transition-colors"
                />
              </a>
            </Tooltip>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export const ContactClient = memo(ContactClientComponent);
