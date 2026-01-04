import { useState } from "react";
import "./App.css";
import HexTechBackground from "@/components/ui/hex-grid-background";
import { BongoThemeToggle } from "@/components/bongo-theme-toggle";
import { CustomDock } from "@/components/custom-dock";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>

      <BongoThemeToggle />
      <HexTechBackground className="pointer-events-none dark:mask-radial-to-150% dark:mask-radial-at-center" />
      {/* no mask in light mode */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pb-20">
        hehe boi
      </div>
      
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <CustomDock />
      </div>
    </>
  );
}

export default App;
