"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { placeholders, type AssetConfig } from "@/config/assets";

type DeviceType = "laptop" | "mobile" | "tablet" | "browser";

interface DeviceMockupProps {
  type: DeviceType;
  asset?: AssetConfig;
  children?: ReactNode;
  className?: string;
  animate?: boolean;
}

export function DeviceMockup({
  type,
  asset,
  children,
  className = "",
  animate = true,
}: DeviceMockupProps) {
  const MotionWrapper = animate ? motion.div : "div";
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
      }
    : {};

  if (type === "laptop") {
    return (
      <MotionWrapper {...motionProps} className={`relative ${className}`}>
        <div className="relative">
          {/* Screen bezel */}
          <div className="relative bg-gradient-to-b from-[#2a2a3a] to-[#1a1a2a] rounded-t-2xl p-3 pb-0">
            {/* Camera notch */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0a0a0f]" />
            {/* Screen */}
            <div className="relative bg-[#111118] rounded-t-lg overflow-hidden aspect-[16/10]">
              {asset ? (
                <Image
                  src={asset.src}
                  alt={asset.alt}
                  fill
                  className="object-cover"
                  priority={asset.status === "FINAL"}
                />
              ) : children ? (
                children
              ) : (
                <Image
                  src={placeholders.deviceLaptop}
                  alt="Laptop mockup placeholder"
                  fill
                  className="object-cover"
                />
              )}
              {/* Screen glare */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
          {/* Base */}
          <div className="relative">
            <div className="h-3 bg-gradient-to-b from-[#2a2a3a] to-[#1a1a2a] rounded-b-sm" />
            <div className="h-1 bg-[#1a1a2a] mx-[10%] rounded-b-lg" />
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1/4 h-1 bg-[#0a0a0f]/50 rounded-b" />
          </div>
        </div>
        {/* Shadow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-black/20 blur-xl rounded-full" />
      </MotionWrapper>
    );
  }

  if (type === "mobile") {
    return (
      <MotionWrapper {...motionProps} className={`relative ${className}`}>
        <div className="relative w-[280px]">
          {/* Phone frame */}
          <div className="relative bg-gradient-to-b from-[#2a2a3a] to-[#1a1a2a] rounded-[3rem] p-2">
            {/* Screen */}
            <div className="relative bg-[#111118] rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#0a0a0f] rounded-full z-10" />
              {/* Content */}
              <div className="absolute inset-0 pt-10">
                {asset ? (
                  <Image
                    src={asset.src}
                    alt={asset.alt}
                    fill
                    className="object-cover"
                  />
                ) : children ? (
                  children
                ) : (
                  <Image
                    src={placeholders.deviceMobile}
                    alt="Mobile mockup placeholder"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              {/* Screen glare */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
          {/* Side buttons */}
          <div className="absolute right-0 top-24 w-0.5 h-12 bg-[#2a2a3a] rounded-r" />
          <div className="absolute left-0 top-20 w-0.5 h-8 bg-[#2a2a3a] rounded-l" />
          <div className="absolute left-0 top-32 w-0.5 h-16 bg-[#2a2a3a] rounded-l" />
        </div>
        {/* Shadow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[60%] h-4 bg-black/20 blur-xl rounded-full" />
      </MotionWrapper>
    );
  }

  if (type === "browser") {
    return (
      <MotionWrapper {...motionProps} className={`relative ${className}`}>
        <div className="relative bg-[#111118] rounded-xl overflow-hidden border border-white/10">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
            {/* Traffic lights */}
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            {/* URL bar */}
            <div className="flex-1 max-w-md mx-auto">
              <div className="bg-white/5 rounded-md px-3 py-1.5 text-xs text-white/30 font-mono">
                https://example.com
              </div>
            </div>
            <div className="w-[52px]" />
          </div>
          {/* Content */}
          <div className="relative aspect-[16/10]">
            {asset ? (
              <Image
                src={asset.src}
                alt={asset.alt}
                fill
                className="object-cover"
              />
            ) : children ? (
              children
            ) : (
              <Image
                src={placeholders.screenshot}
                alt="Browser mockup placeholder"
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
        {/* Shadow */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[95%] h-6 bg-black/20 blur-2xl rounded-full" />
      </MotionWrapper>
    );
  }

  if (type === "tablet") {
    return (
      <MotionWrapper {...motionProps} className={`relative ${className}`}>
        <div className="relative w-[600px]">
          {/* Tablet frame */}
          <div className="relative bg-gradient-to-b from-[#2a2a3a] to-[#1a1a2a] rounded-[2rem] p-3">
            {/* Camera */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0a0a0f]" />
            {/* Screen */}
            <div className="relative bg-[#111118] rounded-xl overflow-hidden aspect-[4/3]">
              {asset ? (
                <Image
                  src={asset.src}
                  alt={asset.alt}
                  fill
                  className="object-cover"
                />
              ) : children ? (
                children
              ) : (
                <Image
                  src={placeholders.screenshot}
                  alt="Tablet mockup placeholder"
                  fill
                  className="object-cover"
                />
              )}
              {/* Screen glare */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
        {/* Shadow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-4 bg-black/20 blur-xl rounded-full" />
      </MotionWrapper>
    );
  }

  return null;
}
