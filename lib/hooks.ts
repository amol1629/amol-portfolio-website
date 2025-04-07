import { useActiveSectionContext } from "@/context/active-section-context";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { SectionName } from "./types";

export function useSectionInView(sectionName: SectionName, threshold = 0.75) {
	const { ref, inView } = useInView({
		threshold,
	});
	const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

	useEffect(() => {
		if (inView) {
			console.log(`🔍 ${sectionName} in view`);
		}

		if (inView && Date.now() - timeOfLastClick > 1000) {
			console.log(`✅ Setting active section: ${sectionName}`);
			setActiveSection(sectionName);
		}
	}, [inView, setActiveSection, timeOfLastClick, sectionName]);

	return {
		ref,
	};
}
