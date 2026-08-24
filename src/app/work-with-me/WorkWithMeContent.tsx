"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { SectionWrapper, SectionHeading, LiquidGlassCard, Button, Badge, glassAccentColors, type GlassAccent } from "@/components/shared";
import { engagementProcess, faqs } from "@/data";
import { siteConfig } from "@/config";
import { ChevronDown, ArrowRight, Check, Copy, Phone, FileText, Rocket, HeartHandshake } from "lucide-react";
import type { ReactNode } from "react";

const CALENDLY_URL = "https://calendly.com/rathodamol1554/discovery-call";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

const processIcons = [Phone, FileText, Rocket, HeartHandshake];

export function WorkWithMeContent(): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? {} : containerVariants;
  const childVariants = prefersReducedMotion ? {} : itemVariants;

  return (
    <>
      <HeroSection />

      {/* Process Section with connecting line */}
      <SectionWrapper className="py-20">
        <SectionHeading
          label="Process"
          title="How engagements work"
          description="A structured approach that ensures clarity and success."
          align="center"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={variants}
          className="grid md:grid-cols-4 gap-6"
        >
          {engagementProcess.map((step, index) => {
            const accents: GlassAccent[] = ["cyan", "purple", "emerald", "amber"];
            const accent = accents[index % accents.length] ?? "cyan";
            const colors = glassAccentColors[accent];
            const Icon = processIcons[index] ?? Phone;

            return (
              <motion.div
                key={step.step}
                variants={childVariants}
              >
                <LiquidGlassCard className="text-center h-full">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: colors.bg }}
                  >
                    <Icon className="w-7 h-7" style={{ color: colors.text }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-[rgb(var(--color-fg-secondary))]">
                    {step.description}
                  </p>
                </LiquidGlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </SectionWrapper>

      <FAQSection />

      <CTASection />
    </>
  );
}

function HeroSection(): ReactNode {
  return (
    <SectionWrapper className="pt-24 pb-12">
      <div className="max-w-3xl mx-auto text-center">
        {/* Pulsing green dot badge */}
        <Badge variant="success" className="mb-6">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Currently accepting new projects
        </Badge>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Let&apos;s build something{" "}
          <span className="gradient-text">exceptional</span>
        </h1>

        <p className="text-xl text-[rgb(var(--color-fg-secondary))] mb-4">
          Partner with a technical consultant who understands both the code and
          the business. From architecture to implementation, I help teams build
          software that scales.
        </p>

        {/* Social proof line */}
        <p className="text-sm text-[rgb(var(--color-fg-tertiary))] mb-8">
          10+ enterprise projects &bull; Fortune 500 clients &bull; 5+ years experience
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            Book a Discovery Call
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}

function FAQSection(): ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? {} : containerVariants;
  const childVariants = prefersReducedMotion ? {} : itemVariants;

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionWrapper className="py-20">
      <SectionHeading
        label="FAQ"
        title="Common questions"
        description="Answers to frequently asked questions about working together."
        align="center"
        className="mb-12"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={variants}
        className="max-w-3xl mx-auto space-y-4"
      >
        {faqs.map((faq, index) => (
          <motion.div key={index} variants={childVariants}>
            <FAQItem
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps): ReactNode {
  return (
    <LiquidGlassCard
      className={`group cursor-pointer transition-all duration-300 ${isOpen ? "ring-1 ring-cyan-500/30" : ""}`}
      padding="none"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className={`font-semibold pr-4 transition-colors ${isOpen ? "text-cyan-400" : ""}`}>
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-cyan-400" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 text-[rgb(var(--color-fg-secondary))]">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LiquidGlassCard>
  );
}

function CTASection(): ReactNode {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setShowToast(true);
      setTimeout(() => {
        setCopied(false);
        setShowToast(false);
      }, 2000);
    } catch {
      window.open(`mailto:${siteConfig.email}`);
    }
  };

  return (
    <SectionWrapper
      className="py-20"
      background={
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-accent-cyan))/0.05] to-transparent" />
      }
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to get started?
        </h2>
        <p className="text-lg text-[rgb(var(--color-fg-secondary))] mb-8">
          Book a free 30-minute discovery call to discuss your project and see
          how I can help.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            Schedule a Call
          </Button>
          <div className="relative">
            <Button onClick={handleCopy} variant="outline" size="lg">
              {copied ? (
                <>
                  <Check className="mr-2 w-5 h-5 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 w-5 h-5" />
                  Copy Email
                </>
              )}
            </Button>

            {/* Toast notification */}
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
                    <span>Email copied!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
