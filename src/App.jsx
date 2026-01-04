import { useState } from "react";
import "./App.css";
import HexTechBackground from "@/components/ui/hex-grid-background";
import { BongoThemeToggle } from "@/components/bongo-theme-toggle";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>

      <BongoThemeToggle />
      <HexTechBackground className="pointer-events-none dark:mask-radial-to-150% dark:mask-radial-at-center" />
      {/* no mask in light mode */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        hehe boi
      </div>
    </>
  );
}

export default App;
