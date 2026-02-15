import { X } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/shared/lib/utils";
import { sidebarNav } from "./config";
import { SidebarNavGroup } from "./SidebarNavGroup";
import { SidebarUser } from "./SidebarUser";

interface SidebarMobileProps {
  open: boolean;
  onClose: () => void;
  user?: {
    name: string;
    role: string;
    avatar?: string;
  };
  onLogout?: () => void;
}

export const SidebarMobile = ({
  open,
  onClose,
  user,
  onLogout,
}: SidebarMobileProps) => {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-card transition-transform lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link to="/" className="text-xl font-bold" onClick={onClose}>
            PT. Sukses Tunggal Mandiri
          </Link>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-accent">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-6" onClick={onClose}>
            {sidebarNav.map((group) => (
              <SidebarNavGroup key={group.title} group={group} />
            ))}
          </div>
        </div>

        {user && (
          <div className="border-t p-3">
            <SidebarUser user={user} onLogout={onLogout} />
          </div>
        )}
      </aside>
    </>
  );
};
