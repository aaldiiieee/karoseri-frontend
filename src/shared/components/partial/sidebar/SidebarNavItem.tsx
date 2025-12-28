import { NavLink } from "react-router";
import { cn } from "@/shared/lib/utils";
import type { NavItem } from "./types";

interface SidebarNavItemProps {
  item: NavItem;
  collapsed?: boolean;
}

export const SidebarNavItem = ({ item, collapsed }: SidebarNavItemProps) => {
  return (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          isActive
            ? "bg-accent text-accent-foreground font-medium"
            : "text-muted-foreground",
          collapsed && "justify-center px-2"
        )
      }
      title={collapsed ? item.title : undefined}
    >
      <item.icon className="h-5 w-5 shrink-0" />

      {!collapsed && (
        <>
          <span className="flex-1">{item.title}</span>
          {item.badge && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {item.badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
};
