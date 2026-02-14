import { useState, useRef } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon } from "lucide-react";
import styles from "./ThreeDButton.module.css";

export function BongoThemeToggle({ scale = 0.5, staticPosition = false }) {
  const { theme, setTheme } = useTheme();
  const [isPressing, setIsPressing] = useState(false);
  const [isButtonHeld, setIsButtonHeld] = useState(false);

  const buttonRef = useRef(null);

  const handleThemeToggle = async () => {
    // Prevent double-clicks
    if (document.startViewTransition && document.documentElement.dataset.transitioning) return;
    
    // Haptics
    if (navigator.vibrate) navigator.vibrate(10);

    const newTheme = theme === "dark" ? "light" : "dark";

    // 1. Paw moves down START
    setIsPressing(true);

    // 2. Short delay for paw to "reach" the button (visual sync)
    // Assuming paw animation/transition takes ~50-100ms
    await new Promise(resolve => setTimeout(resolve, 50)); 
    setIsButtonHeld(true); // Button presses DOWN

    // 3. Hold for a moment
    await new Promise(resolve => setTimeout(resolve, 150));

    // 4. Release both (Paw lifts, Button springs up)
    setIsButtonHeld(false);
    setIsPressing(false);

    // Run transition concurrently (no await)
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    // Enable performance mode
    document.body.classList.add('is-transitioning');

    // Mark transitioning state
    document.documentElement.dataset.transitioning = "true";

    // Hint browser to promote layer
    document.documentElement.style.willChange = "clip-path";

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    }).ready;

    // Get button center coordinates (standardized per user request)
    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const animation = document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700, 
        easing: "cubic-bezier(0.4, 0, 0.2, 1)", // Material Design standard motion
        pseudoElement: "::view-transition-new(root)",
      }
    );

    animation.finished.finally(() => {
      document.documentElement.dataset.transitioning = "";
      document.documentElement.style.willChange = "";
      document.body.classList.remove('is-transitioning');
    });
  };

  const containerClasses = staticPosition 
    ? "relative w-[140px] h-[80px] flex items-center justify-center mt-7 scale-80 md:scale-100 z-10 mx-auto"
    : "fixed bottom-4 right-4 z-50 origin-bottom-right scale-[0.6] md:bottom-8 md:right-8 md:scale-100 transition-all duration-300 pointer-events-none";

  return (
    <div className={containerClasses}>
      {/* Container for Cat - Absolute positioning relative to the fixed anchor */}
      <div
        className="absolute bottom-[-79px] right-[-80px] w-[800px] h-[450px] origin-bottom-right pointer-events-none z-20"
        style={{
          transform: `scale(${scale}) translateZ(0)`, // Force GPU acceleration
          backfaceVisibility: "hidden",
          willChange: "transform", // Ensure browser optimizes for transform changes (zoom/scale)
        }}
      >
        {/* Cat Head */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-no-repeat"
          style={{
            backgroundImage: "url(/images/cat.png)",
            backgroundPositionY: theme === "dark" ? "-450px" : "0",
            backgroundPositionX: "0",
            zIndex: 10,
          }}
        />

        {/* Mouth */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-no-repeat"
          style={{
            backgroundImage: "url(/images/mouth.png)",
            backgroundPositionY: theme === "dark" ? "-450px" : "0",
            backgroundPositionX: "0",
            zIndex: 20,
          }}
        />

        {/* Left Paw */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-no-repeat"
          style={{
            backgroundImage: "url(/images/paw-left.png)",
            backgroundPositionY: theme === "dark" ? "-450px" : "0",
            backgroundPositionX: isPressing ? "-800px" : "0",
            zIndex: 30,
          }}
        />

        {/* Right Paw */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-no-repeat"
          style={{
            backgroundImage: "url(/images/paw-right.png)",
            backgroundPositionY: theme === "dark" ? "-450px" : "0",
            backgroundPositionX: "0",
            zIndex: 30,
          }}
        />
      </div>

      {/* Theme Toggle Button - 3D design */}
      <div className="absolute bottom-0 right-0 pointer-events-auto z-10">
        <button
          ref={buttonRef}
          onClick={handleThemeToggle}
          className={`${styles.button} ${isButtonHeld ? styles.pressed : ''}`}
          type="button"
          aria-label="Toggle theme"
          data-theme={theme}
        >
          <div className={styles.top}>
            {theme === "dark" ? (
              <div className="flex items-center gap-2">
                <Sun size={20} strokeWidth={2.5} />
                <span>Theme</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Moon size={20} strokeWidth={2.5} />
                <span>Theme</span>
              </div>
            )}
          </div>
          <div className={styles.bottom}></div>
        </button>
      </div>
    </div>
  );
}
