import {
  LayoutDashboard,
  Upload,
  History,
  Settings,
  HelpCircle,
  Users,
  FileBarChart,
  Component,
  ShieldAlert,
} from "lucide-react";
import type { NavGroup } from "./types";

export const sidebarNav: NavGroup[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Master Data",
    items: [
      {
        title: "Component",
        href: "/master-data/component",
        icon: Component,
      },
      {
        title: "Damage Record",
        href: "/master-data/damage-record",
        icon: ShieldAlert,
      },
    ],
  },
  {
    title: "Analysis",
    items: [
      {
        title: "New Analysis",
        href: "/analysis",
        icon: Upload,
      },
      {
        title: "History",
        href: "/analysis/history",
        icon: History,
      },
      {
        title: "Reports",
        href: "/reports",
        icon: FileBarChart,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Team",
        href: "/settings/team",
        icon: Users,
      },
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
      {
        title: "Help",
        href: "/help",
        icon: HelpCircle,
      },
    ],
  },
];
