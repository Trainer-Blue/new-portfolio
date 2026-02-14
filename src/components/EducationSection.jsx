
import React from "react";
import { PORFOLIO_DATA } from "../data/portfolio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ChevronRightIcon } from "lucide-react";

export const EducationSection = () => {
  const { education } = PORFOLIO_DATA;
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="flex flex-col gap-y-3">
      <h2 className="text-xl font-bold">Education</h2>
      <a
        href="https://www.bitmesra.ac.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer"
      >
        <Card className="flex items-center p-4">
          <div className="flex-none">
            <Avatar className="border size-12 bg-muted-background dark:bg-foreground">
              <AvatarImage
                src="/Birla_Institute_of_Technology_Mesra.png"
                alt={education.institution}
                className="object-contain"
              />
              <AvatarFallback>{education.institution[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="grow ml-4 flex-col group">
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                {education.institution}
                <ChevronRightIcon
                  className={cn(
                    "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                />
              </h3>
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right whitespace-nowrap">
                {education.year}
              </div>
            </div>
            <div className="font-sans text-xs mt-1">{education.degree}</div>
          </div>
        </Card>
      </a>
    </div>
  );
};

export default EducationSection;
