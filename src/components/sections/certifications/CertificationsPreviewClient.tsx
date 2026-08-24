"use client";

import { memo } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@iconify/react";
import { useReducedMotion } from "@/hooks";
import { Button } from "@/components/shared";
import type { ProviderWithCount } from "./certifications.data";
import type { ReactNode } from "react";

interface CertificationsPreviewClientProps {
  providers: ProviderWithCount[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotateY: -90 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { type: "spring", stiffness: 200, damping: 15 },
  },
};

interface ProviderBadgeProps {
  provider: string;
  count: number;
  info: ProviderWithCount["info"];
  variants: Variants | Record<string, never>;
}

const ProviderBadge = memo(function ProviderBadge({
  provider,
  count,
  info,
  variants,
}: ProviderBadgeProps): ReactNode {
  return (
    <Link href={`/certifications?provider=${provider}`} prefetch scroll={false}>
      <motion.div
        variants={variants}
        whileHover={{ scale: 1.08, y: -8 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="group cursor-pointer"
      >
        <div className="relative flex flex-col items-center">
          <div
            className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(145deg,
                rgba(255,255,255,0.1) 0%,
                rgba(255,255,255,0.05) 50%,
                rgba(0,0,0,0.1) 100%)`,
              boxShadow: `
                inset 0 2px 4px rgba(255,255,255,0.1),
                inset 0 -2px 4px rgba(0,0,0,0.2),
                0 4px 20px rgba(0,0,0,0.3),
                0 0 0 1px rgba(255,255,255,0.1)
              `,
            }}
          >
            <div
              className="absolute inset-2 rounded-xl"
              style={{
                background: `linear-gradient(145deg,
                  ${info.color}20 0%,
                  ${info.color}10 50%,
                  ${info.color}05 100%)`,
                boxShadow: `
                  inset 0 1px 2px rgba(255,255,255,0.1),
                  inset 0 0 0 1px ${info.color}30
                `,
              }}
            />

            {info.logo ? (
              <Image
                src={info.logo}
                alt={info.name}
                width={40}
                height={40}
                className="relative w-8 h-8 md:w-10 md:h-10 transition-all duration-300 group-hover:scale-110 object-contain"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
              />
            ) : (
              <Icon
                icon={info.icon}
                className="relative w-8 h-8 md:w-10 md:h-10 transition-all duration-300 group-hover:scale-110"
                style={{
                  color: info.color,
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                }}
              />
            )}

            <div
              className="absolute -top-1 -right-1 w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: `linear-gradient(145deg, ${info.color}, ${info.color}cc)`,
                boxShadow: `0 2px 8px ${info.color}60, inset 0 1px 2px rgba(255,255,255,0.3)`,
                color: "#fff",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              {count}
            </div>

            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: `
                  0 0 30px ${info.color}50,
                  0 0 60px ${info.color}30,
                  inset 0 0 20px ${info.color}20
                `,
              }}
            />

            <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div
                className="absolute -inset-full rotate-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  width: "50%",
                }}
              />
            </div>
          </div>

          <span className="mt-3 text-sm font-medium text-[rgb(var(--color-fg-secondary))] group-hover:text-white transition-colors">
            {info.name}
          </span>
        </div>
      </motion.div>
    </Link>
  );
});

function CertificationsPreviewClientComponent({ providers }: CertificationsPreviewClientProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? {} : containerVariants;
  const childVariants = prefersReducedMotion ? {} : badgeVariants;

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={variants}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-12"
      >
        {providers.map(({ provider, count, info }) => (
          <ProviderBadge
            key={provider}
            provider={provider}
            count={count}
            info={info}
            variants={childVariants}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex justify-center"
      >
        <Button href="/certifications" variant="primary" size="md">
          View all certificates
          <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
        </Button>
      </motion.div>
    </>
  );
}

export const CertificationsPreviewClient = memo(CertificationsPreviewClientComponent);
