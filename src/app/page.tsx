import {
  Hero,
  About,
  Services,
  CapabilityMap,
  FeaturedProjects,
  Experience,
  CertificationsPreview,
  Impact,
  Testimonials,
  Contact,
} from "@/components/sections";
import { siteConfig } from "@/config";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: siteConfig.locale,
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      jobTitle: "Technical Consultant & Frontend Specialist",
      sameAs: [siteConfig.links.linkedin, siteConfig.links.github],
    },
  ],
};

export default function Home(): React.ReactNode {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <Services />
      <CapabilityMap />
      <FeaturedProjects />
      <Experience />
      <Impact />
      <Testimonials />
      <CertificationsPreview />
      <Contact />
    </>
  );
}
