export interface NavLink {
  label: string;
  href: string;
  isSection?: boolean;
  isExternal?: boolean;
}

export interface SocialLink {
  platform: string;
  label: string;
  href: string;
  icon: string;
}
