import {
  Component,
  ShieldAlert,
  Users,
  LayoutDashboard,
  Sparkles,
  // Brain,
} from "lucide-react";
import type { NavGroup } from "./types";

export type UserRole = "admin" | "technician";

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
        title: "User",
        href: "/master-data/user",
        icon: Users,
        roles: ["admin"],
      },
      {
        title: "Komponen",
        href: "/master-data/component",
        icon: Component,
        roles: ["admin"],
      },
      {
        title: "Data Kerusakan",
        href: "/master-data/damage-record",
        icon: ShieldAlert,
        roles: ["admin"],
      },
    ],
  },
  {
    title: "Analisis",
    items: [
      {
        title: "Klasifikasi Kerusakan",
        href: "/analysis",
        icon: Sparkles,
        roles: ["admin", "technician"],
      },
      // {
      //   title: "Model & Pelatihan",
      //   href: "/analysis/reports",
      //   icon: Brain,
      //   roles: ["admin"],
      // },
    ],
  },
];
