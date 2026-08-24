export type SkillDomain =
  | "frontend"
  | "backend"
  | "cloud-microsoft"
  | "ai-ml"
  | "architecture"
  | "testing"
  | "tools";

export type SkillLevel = "expert" | "advanced" | "proficient";

export interface Skill {
  id: string;
  name: string;
  domain: SkillDomain;
  level: SkillLevel;
  years?: number;
  description?: string;
  icon?: string;
}

export interface SkillDomainGroup {
  domain: SkillDomain;
  label: string;
  skills: Skill[];
}
