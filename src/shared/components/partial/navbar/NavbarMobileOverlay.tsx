import { type ReactNode } from "react";

interface NavbarMobileOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Mobile overlay with backdrop.
 * Renders children in a fixed position with backdrop blur.
 */
export const NavbarMobileOverlay = ({
  isOpen,
  onClose,
  children,
}: NavbarMobileOverlayProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="fixed inset-y-0 left-0 z-50">{children}</div>
    </div>
  );
};
