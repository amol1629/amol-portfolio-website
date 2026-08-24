/**
 * GPU capability tiers
 */
export type GPUTier = "high" | "medium" | "low" | "fallback";

/**
 * Device capability assessment
 */
export interface DeviceCapability {
  tier: GPUTier;
  is3DCapable: boolean;
  maxParticles: number;
  maxComplexity: number;
  shouldUse3D: boolean;
}

/**
 * Detect GPU capabilities (basic detection without drei)
 * More sophisticated detection will use @react-three/drei detectGPU
 */
export function detectBasicGPU(): DeviceCapability {
  if (typeof window === "undefined") {
    return {
      tier: "fallback",
      is3DCapable: false,
      maxParticles: 0,
      maxComplexity: 0,
      shouldUse3D: false,
    };
  }

  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");

  if (!gl) {
    return {
      tier: "fallback",
      is3DCapable: false,
      maxParticles: 0,
      maxComplexity: 0,
      shouldUse3D: false,
    };
  }

  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer: string = debugInfo
    ? (gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string)
    : "";

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion || isMobile) {
    return {
      tier: "fallback",
      is3DCapable: false,
      maxParticles: 0,
      maxComplexity: 0,
      shouldUse3D: false,
    };
  }

  const isIntegrated =
    /Intel|HD Graphics|UHD Graphics|Iris/i.test(renderer) &&
    !/NVIDIA|AMD|Radeon/i.test(renderer);

  if (isIntegrated) {
    return {
      tier: "medium",
      is3DCapable: true,
      maxParticles: 500,
      maxComplexity: 5,
      shouldUse3D: true,
    };
  }

  return {
    tier: "high",
    is3DCapable: true,
    maxParticles: 1000,
    maxComplexity: 10,
    shouldUse3D: true,
  };
}

/**
 * Check if device should render 3D content
 */
export function shouldRender3D(): boolean {
  return detectBasicGPU().shouldUse3D;
}
