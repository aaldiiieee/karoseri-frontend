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
        title: "Komponen",
        href: "/master-data/component",
        icon: Component,
      },
      {
        title: "Data Kerusakan",
        href: "/master-data/damage-record",
        icon: ShieldAlert,
      },
    ],
  },
  {
    title: "Analisis",
    items: [
      {
        title: "Klasifikasi Baru",
        href: "/analysis",
        icon: Upload,
      },
      {
        title: "Riwayat",
        href: "/analysis/history",
        icon: History,
      },
      {
        title: "Laporan",
        href: "/reports",
        icon: FileBarChart,
      },
    ],
  },
  {
    title: "Pengaturan",
    items: [
      {
        title: "Tim",
        href: "/settings/team",
        icon: Users,
      },
      {
        title: "Pengaturan",
        href: "/settings",
        icon: Settings,
      },
      {
        title: "Bantuan",
        href: "/help",
        icon: HelpCircle,
      },
    ],
  },
];
