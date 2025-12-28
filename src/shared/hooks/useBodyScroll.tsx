import { useEffect } from "react";

/**
 * Hook to lock body scroll when a condition is true.
 * Useful for modals, sidebars, and overlays.
 */
export const useBodyScroll = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLocked]);
};
