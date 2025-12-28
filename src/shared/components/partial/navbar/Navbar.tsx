import { Menu, Bell, Search, Sun, Moon } from "lucide-react";
import { useTheme } from "@/shared/hooks/useTheme";

interface NavbarProps {
  onMenuClick?: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card px-4 lg:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Hamburger Menu - Mobile Only */}
        <button
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Title */}
        <span className="text-lg font-semibold">
          Karoseri Damage Classification
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Search - Hidden on mobile */}
        <button className="hidden h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground sm:flex">
          <Search className="h-5 w-5" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Notifications */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
        </button>
      </div>
    </header>
  );
};
