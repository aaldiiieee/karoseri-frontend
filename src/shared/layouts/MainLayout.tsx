import { Outlet } from "react-router";
import { Sidebar } from "@/shared/components/partial/sidebar";
import { useSidebar, useMobileSidebar } from "@/shared/hooks";
import { Navbar, NavbarMobileOverlay } from "../components/partial/navbar";
import { useUser } from "@/features/auth/hooks/useUser";

export const MainLayout = () => {
  const { collapsed, toggle } = useSidebar();
  const mobileSidebar = useMobileSidebar();
  const { data: user } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/auth/login";
  };

  const userData = user
    ? {
      name: user.username,
      email: `${user.username}@karoseri.com`, // Pseudo email for now
    }
    : { name: "Guest", email: "guest@example.com" };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar - hidden in mobile */}
      <div className="hidden md:block">
        <Sidebar
          collapsed={collapsed}
          onToggle={toggle}
          user={userData}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile Sidebar - with overlay */}
      <NavbarMobileOverlay
        isOpen={mobileSidebar.isOpen}
        onClose={mobileSidebar.close}
      >
        <Sidebar
          collapsed={false}
          onToggle={mobileSidebar.close}
          user={userData}
          onLogout={handleLogout}
        />
      </NavbarMobileOverlay>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <Navbar onMenuClick={mobileSidebar.open} />
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
