import type { UserRole } from "./config";

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  roles?: UserRole[];
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}