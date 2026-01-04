import { useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon } from "lucide-react";
import styles from "./ThreeDButton.module.css";

export function BongoThemeToggle({ scale = 0.5 }) {
  const { theme, setTheme } = useTheme();
  const [isPressing, setIsPressing] = useState(false);


  const handleThemeToggle = (event) => {
    const newTheme = theme === "dark" ? "light" : "dark";

    // Trigger paw press animation
    setIsPressing(true);
    setTimeout(() => {
      setIsPressing(false);
    }, 200);

    // Fallback for browsers that don't support View Transitions API
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    // Get click coordinates
    const x = event.clientX;
    const y = event.clientY;

    // Calculate the radius needed to cover the entire screen from click point
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Start view transition
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    });

    // Animate the ripple effect when transition is ready
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 origin-bottom-right scale-[0.6] md:bottom-8 md:right-8 md:scale-100 transition-all duration-300 pointer-events-none">
      {/* Container for Cat - Absolute positioning relative to the fixed anchor */}
      <div
        className="absolute bottom-[-79px] right-[-80px] w-[800px] h-[450px] origin-bottom-right pointer-events-none z-20"
        style={{
          transform: `scale(${scale})`,
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
          onClick={handleThemeToggle}
          className={styles.button}
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
