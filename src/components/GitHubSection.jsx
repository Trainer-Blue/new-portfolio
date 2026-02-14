
import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "@/components/theme-provider";
export const GitHubSection = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-y-3 pb-10">
      <h2 className="text-xl font-bold">Github</h2>
      <div className="w-full flex justify-center overflow-hidden">
        <div className="flex justify-center max-w-full overflow-x-auto hide-scrollbar">
            <GitHubCalendar
            username="Trainer-Blue"
            colorScheme={theme === "dark" ? "dark" : "light"}
            blockSize={13}
            blockMargin={4}
            fontSize={14}
            showColorLegend={true}
            showTotalCount={true}
            labels={{
                legend: {
                    less: null,
                    more: null
                },
                months: [
                  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ],
                totalCount: null,
                weekdays: [
                  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
                ]
            }}
            />
        </div>
      </div>
    </div>
  );
};

export default GitHubSection;
