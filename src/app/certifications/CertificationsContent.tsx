"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
// Motion used only for modal animations
import { SectionWrapper, SectionHeading, LiquidGlassCard, Badge, EmptyState, Button, glassAccentColors, type GlassAccent } from "@/components/shared";
import Image from "next/image";
import { certifications } from "@/data";
import type { CertificationProvider, Certification } from "@/types";
import { Award, ExternalLink, Calendar, X, Search, FileText } from "lucide-react";
import { Icon } from "@iconify/react";
import type { ReactNode } from "react";

interface ProviderInfo {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  logo?: string;
}

const providerInfo: Record<string, ProviderInfo> = {
  ibm: {
    name: "IBM",
    icon: "simple-icons:ibm",
    color: "#1F70C1",
    bgColor: "rgba(31, 112, 193, 0.15)",
  },
  udemy: {
    name: "Udemy",
    icon: "simple-icons:udemy",
    color: "#A435F0",
    bgColor: "rgba(164, 53, 240, 0.15)",
  },
  hackerrank: {
    name: "HackerRank",
    icon: "simple-icons:hackerrank",
    color: "#00875A",
    bgColor: "rgba(0, 135, 90, 0.15)",
  },
  aws: {
    name: "AWS",
    icon: "simple-icons:amazonaws",
    color: "#FF9900",
    bgColor: "rgba(255, 153, 0, 0.15)",
  },
  azure: {
    name: "Azure",
    icon: "simple-icons:microsoftazure",
    color: "#0078D4",
    bgColor: "rgba(0, 120, 212, 0.15)",
  },
  google: {
    name: "Google",
    icon: "simple-icons:google",
    color: "#4285F4",
    bgColor: "rgba(66, 133, 244, 0.15)",
  },
  microsoft: {
    name: "Microsoft",
    icon: "simple-icons:microsoft",
    color: "#00A4EF",
    bgColor: "rgba(0, 164, 239, 0.15)",
  },
  coursera: {
    name: "Coursera",
    icon: "simple-icons:coursera",
    color: "#0056D2",
    bgColor: "rgba(0, 86, 210, 0.15)",
  },
  oracle: {
    name: "Oracle",
    icon: "simple-icons:oracle",
    color: "#F80000",
    bgColor: "rgba(248, 0, 0, 0.15)",
  },
  meta: {
    name: "Meta",
    icon: "simple-icons:meta",
    color: "#0081FB",
    bgColor: "rgba(0, 129, 251, 0.15)",
  },
  salesforce: {
    name: "Salesforce",
    icon: "simple-icons:salesforce",
    color: "#00A1E0",
    bgColor: "rgba(0, 161, 224, 0.15)",
  },
  linkedin: {
    name: "LinkedIn",
    icon: "simple-icons:linkedin",
    color: "#0A66C2",
    bgColor: "rgba(10, 102, 194, 0.15)",
  },
  anthropic: {
    name: "Anthropic",
    icon: "simple-icons:anthropic",
    color: "#8B5A3C",
    bgColor: "rgba(139, 90, 60, 0.15)",
  },
  perficient: {
    name: "Perficient",
    icon: "",
    color: "#0D6B6E",
    bgColor: "rgba(13, 107, 110, 0.15)",
    logo: "/images/logos/perficient.png",
  },
  optimizely: {
    name: "Optimizely",
    icon: "",
    color: "#0037FF",
    bgColor: "rgba(0, 55, 255, 0.15)",
    logo: "/images/logos/optimizely.png",
  },
  un: {
    name: "United Nations",
    icon: "mdi:earth",
    color: "#5B92E5",
    bgColor: "rgba(91, 146, 229, 0.15)",
  },
  moz: {
    name: "Moz",
    icon: "simple-icons:mozilla",
    color: "#E66000",
    bgColor: "rgba(230, 96, 0, 0.15)",
  },
  mozilla: {
    name: "Mozilla",
    icon: "simple-icons:mozilla",
    color: "#E66000",
    bgColor: "rgba(230, 96, 0, 0.15)",
  },
};


export function CertificationsContent(): ReactNode {
  const searchParams = useSearchParams();
  const providerParam = searchParams.get("provider") as CertificationProvider | null;

  const [activeProvider, setActiveProvider] = useState<CertificationProvider | "all">("all");
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [showAll, setShowAll] = useState(false);
  const INITIAL_VISIBLE_COUNT = 6;

  useEffect(() => {
    if (providerParam && Object.keys(providerInfo).includes(providerParam)) {
      setActiveProvider(providerParam);
    }
  }, [providerParam]);

  const providers = useMemo(() => {
    const counts = certifications.reduce((acc, cert) => {
      acc[cert.provider] = (acc[cert.provider] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts)
      .map(([provider, count]) => ({ provider: provider as CertificationProvider, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const filteredCerts = useMemo(() => {
    return certifications.filter((cert) => {
      return activeProvider === "all" || cert.provider === activeProvider;
    });
  }, [activeProvider]);

  const featuredCerts = filteredCerts.filter((c) => c.featured);
  const allRegularCerts = filteredCerts.filter((c) => !c.featured);
  const regularCerts = showAll ? allRegularCerts : allRegularCerts.slice(0, INITIAL_VISIBLE_COUNT);
  const hasMoreCerts = allRegularCerts.length > INITIAL_VISIBLE_COUNT;

  useEffect(() => {
    setShowAll(false);
  }, [activeProvider]);

  return (
    <SectionWrapper className="pt-24 pb-20">
      <SectionHeading
        label="Certifications"
        title="Professional credentials"
        description="Industry certifications validating expertise across cloud platforms and development practices."
        animate={false}
      />

      {/* Provider Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 p-4 rounded-2xl border border-white/10"
        style={{
          background: "color-mix(in oklab, #ffffff00 5%, transparent)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <button
          onClick={() => setActiveProvider("all")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeProvider === "all"
              ? "bg-[rgb(var(--color-accent-cyan))] text-black"
              : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
            }`}
        >
          All
        </button>
        {providers.map(({ provider, count }) => {
          const info = providerInfo[provider];
          if (!info) return null;
          return (
            <button
              key={provider}
              onClick={() => setActiveProvider(provider)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${activeProvider === provider
                  ? "text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              style={activeProvider === provider ? {
                background: info.color,
              } : {}}
            >
              <span className="w-4 h-4 flex items-center justify-center shrink-0">
                {info.logo ? (
                  <Image src={info.logo} alt={info.name} width={16} height={16} className="w-4 h-4 object-contain" />
                ) : (
                  <Icon icon={info.icon} width={16} height={16} className="w-4 h-4" />
                )}
              </span>
              {info.name}
              <span className="text-xs opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {filteredCerts.length === 0 ? (
        <EmptyState
          title="No certifications found"
          description="Try adjusting your search or filter criteria."
          icon={<Award className="w-12 h-12" />}
        />
      ) : (
        <>
          {/* Featured Certs */}
          {featuredCerts.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-medium text-[rgb(var(--color-fg-tertiary))] uppercase tracking-wider mb-4">
                Featured
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredCerts.map((cert) => (
                  <div key={cert.id}>
                    <CertCard cert={cert} onClick={() => setSelectedCert(cert)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Certs */}
          {regularCerts.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-[rgb(var(--color-fg-tertiary))] uppercase tracking-wider mb-4">
                All Certifications
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularCerts.map((cert) => (
                  <div key={cert.id}>
                    <CertCard cert={cert} onClick={() => setSelectedCert(cert)} />
                  </div>
                ))}
              </div>

              {/* Show More / Show Less Button */}
              {hasMoreCerts && (
                <div className="flex justify-center mt-8">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? "Show Less" : `Show All (${allRegularCerts.length - INITIAL_VISIBLE_COUNT} more)`}
                  </Button>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}

interface CertCardProps {
  cert: Certification;
  onClick: () => void;
}

const providerAccents: Record<string, GlassAccent> = {
  ibm: "cyan",
  udemy: "purple",
  hackerrank: "emerald",
  aws: "amber",
  azure: "cyan",
  google: "cyan",
  microsoft: "cyan",
  coursera: "cyan",
  oracle: "amber",
  meta: "cyan",
  salesforce: "cyan",
  linkedin: "cyan",
  anthropic: "amber",
  perficient: "purple",
  optimizely: "cyan",
  un: "cyan",
  moz: "cyan",
  mozilla: "amber",
};

function CertCard({ cert, onClick }: CertCardProps): ReactNode {
  const info = providerInfo[cert.provider];
  const icon = info?.icon ?? "mdi:certificate";
  const logo = info?.logo;
  const accent = providerAccents[cert.provider] || "cyan";
  const colors = glassAccentColors[accent];

  return (
    <div className="h-full min-h-[280px]">
      <LiquidGlassCard
        className="h-full"
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{ background: colors.bg }}
        >
          {logo ? (
            <Image src={logo} alt={info?.name ?? ""} width={24} height={24} className="w-6 h-6 object-contain" />
          ) : (
            <Icon icon={icon} width={24} height={24} className="w-6 h-6" style={{ color: colors.text }} />
          )}
        </div>

        {/* Featured ribbon - top right corner, tilted */}
        {cert.featured && (
          <div className="absolute -top-1 -right-1 overflow-hidden w-24 h-24 pointer-events-none">
            <div className="absolute top-4 -right-6 rotate-45 w-28 text-center py-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black text-[10px] font-bold uppercase tracking-wider shadow-lg">
              Featured
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold mb-2">
          {cert.shortName ?? cert.name}
        </h3>

        {/* Full name if different */}
        {cert.shortName && (
          <p className="text-sm text-[rgb(var(--color-fg-secondary))] mb-4 line-clamp-2">
            {cert.name}
          </p>
        )}

        {/* Meta info */}
        <ul className="space-y-2 mb-4">
          <li className="text-sm text-[rgb(var(--color-fg-secondary))] flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: colors.text }}
            />
            {info?.name ?? cert.provider.toUpperCase()}
          </li>
          <li className="text-sm text-[rgb(var(--color-fg-secondary))] flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: colors.text }}
            />
            Issued {new Date(cert.issueDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </li>
        </ul>

        {/* Action buttons */}
        <div className="flex flex-wrap justify-center gap-2 mt-auto pt-2">
          {cert.pdfUrl && (
            <a
              href={cert.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              View PDF
            </a>
          )}
          {cert.badgeImage && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Details
            </button>
          )}
        </div>
      </LiquidGlassCard>
    </div>
  );
}

interface CertModalProps {
  cert: Certification;
  onClose: () => void;
}

function CertModal({ cert, onClose }: CertModalProps): ReactNode {
  const info = providerInfo[cert.provider];
  const color = info?.color ?? "#06b6d4";
  const bgColor = info?.bgColor ?? "rgba(6, 182, 212, 0.15)";
  const icon = info?.icon ?? "mdi:certificate";
  const logo = info?.logo;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [shake, setShake] = useState(false);

  const handleBackdropClick = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
          x: shake ? [0, -10, 10, -10, 10, 0] : 0
        }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          x: { duration: 0.4, ease: "easeInOut" }
        }}
        className="relative w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 0 0 1px rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.2)",
            backdropFilter: "blur(16px) saturate(150%)",
            WebkitBackdropFilter: "blur(16px) saturate(150%)",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2.5 rounded-full hover:bg-red-500/20 transition-colors z-20"
          >
            <X className="w-5 h-5 text-white/70 hover:text-white" />
          </button>

          {/* Certificate Image Section */}
          {cert.badgeImage && (
            <div
              className="relative w-full h-64 bg-black/30 backdrop-blur-sm cursor-zoom-in"
              onClick={() => setShowFullImage(true)}
            >
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                </div>
              )}
              <Image
                src={cert.badgeImage}
                alt={`${cert.name} certificate`}
                fill
                className={`object-contain p-4 transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 768px) 100vw, 640px"
              />
              <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/50 text-white/70 text-xs flex items-center gap-1">
                <Search className="w-3 h-3" />
                Click to enlarge
              </div>
            </div>
          )}

          {/* PDF Section - shown when no badge image but has PDF */}
          {!cert.badgeImage && cert.pdfUrl && (
            <div className="relative w-full h-[400px] bg-black/20 backdrop-blur-sm">
              <iframe
                src={cert.pdfUrl}
                className="w-full h-full border-0"
                title={`${cert.name} certificate PDF`}
              />
              <a
                href={cert.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white/80 text-xs flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                Open in new tab
              </a>
            </div>
          )}

          {/* Content Section */}
          <div className="p-6">

            <div className="flex items-start gap-4 mb-4">
              <motion.div
                className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: bgColor }}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                {logo ? (
                  <Image src={logo} alt={info?.name ?? ""} width={32} height={32} className="w-8 h-8 object-contain" />
                ) : (
                  <Icon icon={icon} width={32} height={32} className="w-8 h-8" style={{ color }} />
                )}
              </motion.div>
              <div>
                <Badge variant="default" size="sm" className="mb-2">
                  {info?.name ?? cert.provider.toUpperCase()}
                </Badge>
                <h2 className="text-xl font-bold">{cert.shortName ?? cert.name}</h2>
              </div>
            </div>

            <p className="text-[rgb(var(--color-fg-secondary))] mb-4">{cert.name}</p>

            <div className="flex items-center gap-4 text-sm text-[rgb(var(--color-fg-tertiary))] mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Issued{" "}
                {new Date(cert.issueDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
              {cert.featured && (
                <span
                  className="flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium"
                  style={{ background: bgColor, color }}
                >
                  <Award className="w-3 h-3" />
                  Featured
                </span>
              )}
            </div>

            {cert.verificationUrl && (
              <div className="flex justify-center">
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Verify Credential
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Full Image Overlay */}
      <AnimatePresence>
        {showFullImage && cert.badgeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm"
          >
            {/* Close button - fixed position at top right of viewport */}
            <button
              onClick={() => setShowFullImage(false)}
              className="fixed top-6 right-6 p-3 rounded-full hover:bg-red-500/20 transition-colors z-[101]"
            >
              <X className="w-6 h-6 text-white/70 hover:text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full h-full max-w-5xl max-h-[90vh] m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={cert.badgeImage}
                alt={`${cert.name} certificate`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
