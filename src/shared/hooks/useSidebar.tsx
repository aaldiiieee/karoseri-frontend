import { useState, useCallback, useEffect } from "react";

const SIDEBAR_COLLAPSED_KEY = "sidebar-collapsed";

/*
 * Hook for managing sidebar state
 *
 * TODO: Change with auth context/store
 */
export const useSidebar = () => {
  // Set initial state from localStorage
  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    return stored === "true";
  });

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(collapsed));
  }, [collapsed]);

  // Toggle state
  const toggle = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return {
    collapsed,
    toggle,
  };
};
