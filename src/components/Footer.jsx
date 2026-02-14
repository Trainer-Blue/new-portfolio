import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const Footer = () => {
  const [visits, setVisits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisitCount = async () => {
      try {
        // Fetch SVG from visitorbadge.io (less likely to be blocked than dedicated "trackers")
        const response = await fetch(
          "https://api.visitorbadge.io/api/visitors?path=trainer-blue-portfolio&count=true"
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();
        
        // Extract number from <title>VISITORS: 7</title>
        const match = text.match(/<title>VISITORS: (\d+)<\/title>/);
        if (match && match[1]) {
          setVisits(parseInt(match[1], 10));
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching visit count:", error);
      }
    };

    fetchVisitCount();
  }, []);

  return (
    <footer className="w-full flex justify-center border-t border-black dark:border-white pt-6">
      <div className="w-full mx-auto px-4 md:px-6 flex items-center justify-between text-muted-foreground text-sm">
        <span className="font-medium">
          &copy; {new Date().getFullYear()} Ishan Siddhartha
        </span>
        
        {!loading && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 backdrop-blur-md border border-black dark:border-white text-xs font-medium hover:bg-muted transition-colors">
            <Eye className="w-3.5 h-3.5" />
            <span>{visits.toLocaleString()}</span>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
