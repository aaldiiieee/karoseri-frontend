import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useBodyScroll } from "./useBodyScroll";

/**
 * Hook for managing mobile sidebar state.
 * Handles open/close state and auto-close on route change.
 */
export const useMobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when open
  useBodyScroll(isOpen);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};
