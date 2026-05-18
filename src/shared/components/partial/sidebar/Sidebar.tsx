import { Link } from "react-router";
import { PanelLeftClose, PanelLeft, LogOut } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { sidebarNav, type UserRole } from "./config";
import { SidebarNavGroup } from "./SidebarNavGroup";
import CompanyLogo from "/images/logo-karoseri.png";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  userRole?: UserRole;
  onLogout?: () => void;
}

export const Sidebar = ({
  collapsed,
  onToggle,
  userRole,
  onLogout,
}: SidebarProps) => {
  const filteredNav = sidebarNav
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => !item.roles || !userRole || item.roles.includes(userRole),
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r bg-card transition-all duration-300 md:static absolute z-10",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex h-16 items-center border-b px-4",
          collapsed ? "justify-center" : "justify-between",
        )}
      >
        {!collapsed && (
          <Link to="/" className="text-xl font-bold">
            <img src={CompanyLogo} alt="Logo" className="w-16" />
          </Link>
        )}
        <button
          onClick={onToggle}
          className="rounded-lg p-2 hover:bg-accent"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeft className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-6">
          {filteredNav.map((group) => (
            <SidebarNavGroup
              key={group.title}
              group={group}
              collapsed={collapsed}
            />
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className={cn("border-t", collapsed ? "p-0" : "p-3")}>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-accent"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
};
