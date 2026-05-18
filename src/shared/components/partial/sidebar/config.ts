import { Upload, History, Component, ShieldAlert, Users } from "lucide-react";
import type { NavGroup } from "./types";

export type UserRole = "superadmin" | "technician";

export const sidebarNav: NavGroup[] = [
  {
    title: "Master Data",
    items: [
      {
        title: "Komponen",
        href: "/master-data/component",
        icon: Component,
        roles: ["superadmin"],
      },
      {
        title: "Data Kerusakan",
        href: "/master-data/damage-record",
        icon: ShieldAlert,
        roles: ["superadmin"],
      },
      {
        title: "Tim",
        href: "/settings/team",
        icon: Users,
        roles: ["superadmin"],
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
        roles: ["superadmin", "technician"],
      },
      {
        title: "Riwayat",
        href: "/analysis/history",
        icon: History,
        roles: ["superadmin", "technician"],
      },
    ],
  },
];
