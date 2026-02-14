import { useEffect, Suspense, lazy } from "react";
import Lenis from "lenis";

import HexTechBackground from "@/components/ui/hex-grid-background";
import { BongoThemeToggle } from "@/components/bongo-theme-toggle";
import { CustomDock } from "@/components/custom-dock";

// Keep Hero eager for LCP
import { HeroSection } from "@/components/HeroSection";

// Lazy load below-the-fold content
const EducationSection = lazy(() => import("@/components/EducationSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const LeetCodeSection = lazy(() => import("@/components/LeetCodeSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const GitHubSection = lazy(() => import("@/components/GitHubSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
  return (
    <div className="relative min-h-screen">
      <HexTechBackground className="pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-[760px] mx-auto px-3 md:px-4 py-12 md:py-20 pb-28 md:pb-32">
        <div className="rounded-xl p-4 md:p-8 flex flex-col gap-8 md:gap-10">
          <HeroSection />
          <Suspense fallback={<div className="min-h-[200px]" />}>
            <EducationSection />
            <SkillsSection />
            <LeetCodeSection />
            <ProjectsSection />
            <GitHubSection />
            <div className="flex justify-center py-4">
              <BongoThemeToggle staticPosition />
            </div>
            <ContactSection />
            <Footer />
          </Suspense>
        </div>
      </div>
      
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <CustomDock />
      </div>
    </div>
  );
}

export default App;

