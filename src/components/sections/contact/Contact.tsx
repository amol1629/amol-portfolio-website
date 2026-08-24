import { SectionWrapper, SectionHeading } from "@/components/shared";
import { ContactClient } from "./ContactClient";
import { CONTACT_HEADING } from "./contact.data";
import { siteConfig, socialLinks } from "@/config";
import type { ReactNode } from "react";

export function Contact(): ReactNode {
  return (
    <SectionWrapper
      id="contact"
      background={
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-accent-cyan))/0.05] to-transparent" />
      }
    >
      <SectionHeading
        label={CONTACT_HEADING.label}
        title={CONTACT_HEADING.title}
        description={CONTACT_HEADING.description}
        align="center"
        animate={false}
      />
      <ContactClient email={siteConfig.email} socialLinks={socialLinks} />
    </SectionWrapper>
  );
}
