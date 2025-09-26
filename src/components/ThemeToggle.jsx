import { Moon, Sun } from "lucide-react"; // Icon components
import { useEffect, useState } from "react"; // React hooks
import { cn } from "@/lib/utils"; // Utility function for merging classNames

// Component: ThemeToggle
// Provides a floating button to toggle between light and dark mode.
// Stores the user's preference in localStorage so it persists across sessions.
export const ThemeToggle = () => {
  // State: whether dark mode is currently active
  const [isDarkMode, setIsDarkMode] = useState(false);

  // On mount: check localStorage and set the theme accordingly
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark"); // enable dark mode
    } else {
      localStorage.setItem("theme", "light"); // default to light
      setIsDarkMode(false);
    }
  }, []);

  // Handler: toggles theme between light and dark
  const toggleTheme = () => {
    if (isDarkMode) {
      // Switch to light mode
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      // Switch to dark mode
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        // Floating button fixed at top-right
        "fixed max-sm:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration-300",
        // 🔧 Typo here: should be "focus:outline-none"
        "focus:outlin-hidden"
      )}
      aria-label="Toggle theme" // accessibility: screen readers
    >
      {isDarkMode ? (
        // Show sun icon in dark mode (to suggest switching back to light)
        <Sun className="h-6 w-6 text-yellow-300" />
      ) : (
        // Show moon icon in light mode (to suggest switching to dark)
        <Moon className="h-6 w-6 text-blue-900" />
      )}
    </button>
  );
};

