import type { Metadata } from "next";
import { generatePageMetadata } from "@/config";
import { WorkWithMeContent } from "./WorkWithMeContent";

export const metadata: Metadata = generatePageMetadata({
  title: "Work With Me",
  description:
    "Partner with a technical consultant specializing in frontend architecture, performance optimization, and team enablement. Book a discovery call to discuss your project.",
  path: "/work-with-me",
});

export default function WorkWithMePage(): React.ReactNode {
  return <WorkWithMeContent />;
}
