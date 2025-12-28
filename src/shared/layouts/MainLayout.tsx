import { Outlet } from "react-router";
import { Sidebar } from "@/shared/components/partial/sidebar";
import { useSidebar, useMobileSidebar } from "@/shared/hooks";
import { Navbar, NavbarMobileOverlay } from "../components/partial/navbar";

// TODO: Change with auth context/store
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
};

export const MainLayout = () => {
  const { collapsed, toggle } = useSidebar();
  const mobileSidebar = useMobileSidebar();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/auth/login";
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar - hidden in mobile */}
      <div className="hidden md:block">
        <Sidebar
          collapsed={collapsed}
          onToggle={toggle}
          user={mockUser}
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
          user={mockUser}
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
