/**
 * Centralized Asset Configuration
 *
 * Asset Status:
 * - DRAFT: Concept only, no file exists
 * - PLACEHOLDER: Generic placeholder in use
 * - READY: Real asset exists, needs review
 * - FINAL: Production-ready, approved
 */

export type AssetStatus = "DRAFT" | "PLACEHOLDER" | "READY" | "FINAL";

export interface AssetConfig {
  src: string;
  alt: string;
  status: AssetStatus;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface ProjectAssets {
  hero: AssetConfig;
  thumbnail: AssetConfig;
  mockups: AssetConfig[];
  screenshots: AssetConfig[];
  video?: AssetConfig;
  architecture?: AssetConfig;
}

// Placeholder base path
const PLACEHOLDER_BASE = "/placeholders";

// Default placeholder images
export const placeholders = {
  projectHero: `${PLACEHOLDER_BASE}/project-hero.svg`,
  projectThumbnail: `${PLACEHOLDER_BASE}/project-thumbnail.svg`,
  deviceLaptop: `${PLACEHOLDER_BASE}/device-laptop.svg`,
  deviceMobile: `${PLACEHOLDER_BASE}/device-mobile.svg`,
  architecture: `${PLACEHOLDER_BASE}/architecture.svg`,
  screenshot: `${PLACEHOLDER_BASE}/screenshot.svg`,
  avatar: `${PLACEHOLDER_BASE}/avatar.svg`,
  companyLogo: `${PLACEHOLDER_BASE}/company-logo.svg`,
} as const;

// Project-specific asset configurations
export const projectAssets: Record<string, ProjectAssets> = {
  "enterprise-transformation": {
    hero: {
      src: placeholders.projectHero,
      alt: "Enterprise Frontend Transformation - Fortune 500 Project",
      status: "PLACEHOLDER",
      width: 1920,
      height: 1080,
    },
    thumbnail: {
      src: placeholders.projectThumbnail,
      alt: "Enterprise Transformation Thumbnail",
      status: "PLACEHOLDER",
      width: 800,
      height: 600,
    },
    mockups: [
      {
        src: placeholders.deviceLaptop,
        alt: "Enterprise Dashboard - Laptop View",
        status: "PLACEHOLDER",
        width: 1440,
        height: 900,
      },
      {
        src: placeholders.deviceMobile,
        alt: "Enterprise Dashboard - Mobile View",
        status: "PLACEHOLDER",
        width: 375,
        height: 812,
      },
    ],
    screenshots: [],
    architecture: {
      src: placeholders.architecture,
      alt: "Enterprise Architecture Diagram",
      status: "PLACEHOLDER",
      width: 1200,
      height: 800,
    },
  },
  "ai-question-generator": {
    hero: {
      src: placeholders.projectHero,
      alt: "AI Question Generator - Quillionz Platform",
      status: "PLACEHOLDER",
      width: 1920,
      height: 1080,
    },
    thumbnail: {
      src: placeholders.projectThumbnail,
      alt: "AI Question Generator Thumbnail",
      status: "PLACEHOLDER",
      width: 800,
      height: 600,
    },
    mockups: [
      {
        src: placeholders.deviceLaptop,
        alt: "Quillionz Editor - Laptop View",
        status: "PLACEHOLDER",
        width: 1440,
        height: 900,
      },
    ],
    screenshots: [],
    architecture: {
      src: placeholders.architecture,
      alt: "Migration Architecture - ASP.NET to React",
      status: "PLACEHOLDER",
      width: 1200,
      height: 800,
    },
  },
  "component-library": {
    hero: {
      src: placeholders.projectHero,
      alt: "Enterprise Component Library - Design System",
      status: "PLACEHOLDER",
      width: 1920,
      height: 1080,
    },
    thumbnail: {
      src: placeholders.projectThumbnail,
      alt: "Component Library Thumbnail",
      status: "PLACEHOLDER",
      width: 800,
      height: 600,
    },
    mockups: [
      {
        src: placeholders.deviceLaptop,
        alt: "Storybook Interface",
        status: "PLACEHOLDER",
        width: 1440,
        height: 900,
      },
    ],
    screenshots: [],
    architecture: {
      src: placeholders.architecture,
      alt: "Component Library Architecture",
      status: "PLACEHOLDER",
      width: 1200,
      height: 800,
    },
  },
  "true-feedback": {
    hero: {
      src: placeholders.projectHero,
      alt: "True Feedback - AI-Powered Anonymous Feedback",
      status: "PLACEHOLDER",
      width: 1920,
      height: 1080,
    },
    thumbnail: {
      src: placeholders.projectThumbnail,
      alt: "True Feedback Thumbnail",
      status: "PLACEHOLDER",
      width: 800,
      height: 600,
    },
    mockups: [],
    screenshots: [],
  },
  "hotel-management": {
    hero: {
      src: placeholders.projectHero,
      alt: "Hotel Management System",
      status: "PLACEHOLDER",
      width: 1920,
      height: 1080,
    },
    thumbnail: {
      src: placeholders.projectThumbnail,
      alt: "Hotel Management Thumbnail",
      status: "PLACEHOLDER",
      width: 800,
      height: 600,
    },
    mockups: [],
    screenshots: [],
  },
};

// Helper to get asset with fallback
export function getAsset(
  projectId: string,
  assetType: keyof ProjectAssets,
  index = 0
): AssetConfig | undefined {
  const project = projectAssets[projectId];
  if (!project) return undefined;

  const asset = project[assetType];
  if (Array.isArray(asset)) {
    return asset[index];
  }
  return asset as AssetConfig | undefined;
}

// Helper to check if asset is ready for production
export function isAssetReady(asset: AssetConfig): boolean {
  return asset.status === "READY" || asset.status === "FINAL";
}

// Helper to get all placeholder assets (for tracking)
export function getPlaceholderAssets(): Array<{
  project: string;
  type: string;
  asset: AssetConfig;
}> {
  const results: Array<{ project: string; type: string; asset: AssetConfig }> = [];

  for (const [projectId, assets] of Object.entries(projectAssets)) {
    for (const [type, asset] of Object.entries(assets)) {
      if (Array.isArray(asset)) {
        asset.forEach((a, i) => {
          if (a.status === "PLACEHOLDER") {
            results.push({ project: projectId, type: `${type}[${i}]`, asset: a });
          }
        });
      } else if (asset && (asset as AssetConfig).status === "PLACEHOLDER") {
        results.push({ project: projectId, type, asset: asset as AssetConfig });
      }
    }
  }

  return results;
}
