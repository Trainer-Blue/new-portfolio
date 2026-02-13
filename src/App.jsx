import HexTechBackground from "@/components/ui/hex-grid-background";
import { BongoThemeToggle } from "@/components/bongo-theme-toggle";
import { CustomDock } from "@/components/custom-dock";
import { HeroSection } from "@/components/HeroSection";
import { EducationSection } from "@/components/EducationSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import Lenis from "lenis";
import { useEffect } from "react";

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
    <div className="relative min-h-screen transition-all duration-500 ease-in-out">
      <HexTechBackground className="pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-[760px] mx-auto px-3 md:px-4 py-12 md:py-20 pb-28 md:pb-32">
        <div className="rounded-xl p-4 md:p-8 flex flex-col gap-8 md:gap-10">
          <HeroSection />
          <EducationSection />
          <SkillsSection />
          <ProjectsSection />
          <div className="flex justify-center py-4">
            <BongoThemeToggle staticPosition />
          </div>
          <ContactSection />
        </div>
      </div>
      
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <CustomDock />
      </div>
    </div>
  );
}

export default App;

