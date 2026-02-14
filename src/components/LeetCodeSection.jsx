
import React, { useEffect, useState, useMemo } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { useTheme } from "@/components/theme-provider";
import { Link, Link2 } from "lucide-react";

// Move static content outside the component to prevent recreation on every render
const THEME_COLORS = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

const LABELS = {
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
};

export const LeetCodeSection = () => {
    const { theme } = useTheme();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://leetcode-sub-endpoint.vercel.app/leetcode/ishansiddhartha");
                const json = await response.json();
                
                // Get date range for the last year
                const today = new Date();
                const lastYear = new Date(today);
                lastYear.setFullYear(today.getFullYear() - 1);
                
                // Transform object { "YYYY-MM-DD": count } to Array<{ date, count, level }>
                const transformed = [];
                let currentDate = new Date(lastYear);
                
                // Pre-calculate loop to avoid Date object churn if possible, but standard while is fine here
                // Optimization: avoid splitting string repeatedly if we can construct it
                while (currentDate <= today) {
                    const dateStr = currentDate.toISOString().split('T')[0];
                    const count = json[dateStr] || 0;
                    
                    // Level calculation
                    let level = 0;
                    if (count > 0) level = 1;
                    if (count > 2) level = 2;
                    if (count > 5) level = 3;
                    if (count > 10) level = 4;
                    
                    transformed.push({ date: dateStr, count, level });
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                
                setData(transformed);
            } catch (error) {
                console.error("Error fetching LeetCode data:", error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Memoize the style object to prevent unnecessary re-renders of child components
    const calendarStyle = useMemo(() => ({
        color: theme === "dark" ? "#e0e0e0" : "#1a1a1a",
        display: 'block', 
        paddingBottom: '10px'
    }), [theme]);

    const totalSubmissions = useMemo(() => data.reduce((acc, curr) => acc + curr.count, 0), [data]);

    if (loading) {
        return (
            <div className="flex flex-col gap-y-3 pb-6 animate-pulse">
                <div className="h-6 w-48 bg-muted rounded"></div>
                <div className="h-32 w-full bg-muted/20 rounded-lg"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-3 pb-6">
            <div className="flex flex-col items-left gap-1">
                <h2 className="text-xl font-bold">A glimpse of consistency</h2>
                <a 
                    href="https://leetcode.com/u/ishansiddhartha/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
                >
                    {totalSubmissions} submissions in the past year
                    <svg 
                        role="img" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 h-3.5 ml-1 inline-block -mt-1 fill-current"
                    >
                        <title>LeetCode</title>
                        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                    </svg>
                </a>
            </div>
            <div className="w-full flex justify-center overflow-hidden">
                <div className="flex justify-center max-w-full overflow-x-auto hide-scrollbar">
                     <ActivityCalendar
                        data={data}
                        theme={THEME_COLORS}
                        colorScheme={theme === "dark" ? "dark" : "light"}
                        blockSize={13}
                        blockMargin={4}
                        fontSize={14}
                        hideColorLegend={true}
                        showTotalCount={false}
                        labels={LABELS}
                        style={calendarStyle}
                    />
                </div>
            </div>
        </div>
    );
};

export default LeetCodeSection;
