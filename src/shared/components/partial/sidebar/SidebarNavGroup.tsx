import { SidebarNavItem } from "./SidebarNavItem";
import type { NavGroup } from "./types";

interface SidebarNavGroupProps {
  group: NavGroup;
  collapsed?: boolean;
}

export const SidebarNavGroup = ({ group, collapsed }: SidebarNavGroupProps) => {
  return (
    <div className="space-y-1">
      {!collapsed && (
        <h4 className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {group.title}
        </h4>
      )}

      <nav className="space-y-1">
        {group.items.map((item) => (
          <SidebarNavItem key={item.href} item={item} collapsed={collapsed} />
        ))}
      </nav>
    </div>
  );
};
