# Development Documentation

This document covers technical implementation details, shared components, and API integration guidelines for the Karoseri Frontend.

## 🧱 Shared Components (`src/shared/components`)

Shared components are built to be reusable across different features.

### Common UI (`src/shared/components/ui`)

_Note: We are using a customized set of UI components._

- **`Sidebar`**: A responsive sidebar with collapse/expand functionality.
  - `SidebarMobile`: Mobile-specific overlay sidebar.
  - `SidebarUser`: User profile and logout menu.
- **`Navbar`**: Top navigation bar with page titles.

### Layouts (`src/shared/layouts`)

- **`MainLayout`**: The standardized shell for internal pages. Includes Sidebar and Navbar.
- **`LandingLayout`**: The shell for external/marketing pages.

---

## 🔗 API Integration (`src/shared/lib/api`)

We use Axios for HTTP requests, wrapped in a specialized layer for consistency.

### `api` Instance (`axios.ts`)

- **Base URL**: Set via environment variables.
- **Interceptors**: Automatically attaches the `Authorization` header if a token exists in `localStorage`.

### Error Handling (`error.ts`)

We use a custom `ApiError` class that extends the standard `Error`. It transforms Axios errors into a more manageable format:

- `isValidationError`: Helper to identify 422 errors.
- `isUnauthorized`: Helper for 401 errors.
- `isNotFound`: Helper for 404 errors.

---

## 🛠️ State Management & Hooks

### `useSidebar` (`src/shared/hooks/useSidebar.tsx`)

Manages the collapsed state of the sidebar, persisting the preference in `localStorage`.

---

## 🎨 Styling

- **Tailwind CSS**: Use utility classes for most styling needs.
- **Global Styles**: Defined in `src/index.css`, including CSS variables for theme colors.
- **`cn` Utility**: Use the `cn` helper (from `src/shared/lib/utils.ts`) for conditional class joining.

---

## 🧪 Development Workflow

1. **New Feature**: Create a folder in `src/features/`.
2. **Components**: Place feature-specific components in the feature's `components/` folder. Reusable components go to `src/shared/components/`.
3. **Routing**: Add routes to the feature's `routes.ts` and export them to `src/app/router.tsx`.
