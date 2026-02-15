import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "@/shared/hooks/useTheme";
import { Link } from "react-router";
import CompanyLogo from "/images/logo-karoseri.png";

interface NavbarProps {
  onMenuClick?: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        <span className="text-lg font-semibold">
          Klasifikasi Kerusakan Komponen
        </span>
      </div>

      <Link to="/dashboard" className="md:hidden">
        <img src={CompanyLogo} alt="Logo" className="w-16" />
      </Link>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
};
