# Architecture Documentation

This document describes the architecture, folder structure, and design principles used in the Karoseri Frontend project.

## 🏗️ Feature-Based Architecture

The project follows a feature-based folder structure to ensure scalability and maintainability. This approach groups code by business domain rather than technical type.

### Key Directories

- **`src/app/`**: Global application-wide setup.
  - `App.tsx`: Root component with global providers.
  - `providers.tsx`: Combines various context providers (e.g., QueryClient, Theme).
  - `router.tsx`: Centralized route definitions.
- **`src/features/`**: Independent, domain-specific modules.
  - Each feature (e.g., `dashboard`, `landing`) contains its own:
    - `components/`: Feature-specific components.
    - `hooks/`: Feature-specific logic.
    - `routes.ts`: Feature-specific routing.
    - `views/`: Page-level components.
    - `types/`: TypeScript interfaces and types.
- **`src/shared/`**: Common code used across multiple features.
  - `components/`: UI components (buttons, cards, partials like sidebar).
  - `hooks/`: Global hooks (e.g., `useSidebar`).
  - `layouts/`: Shared layouts (`MainLayout`, `LandingLayout`).
  - `lib/`: Utilities, API clients (Axios), and constants.

## 🚦 Design Principles

### 1. Separation of Concerns

We separate domain logic (features) from presentation (shared UI) and infrastructure (api lib).

### 2. Component Composition

Layouts use React Router's `<Outlet />` for nested routing, allowing features to be rendered within specific shell components.

### 3. Centralized API Handling

All API interactions pass through `src/shared/lib/api/axios.ts`, which handles:

- Base URL configuration.
- Request/Response interceptors for auth.
- Standardized error transformation via `ApiError` class.

## 🛠️ Tech Choices

- **Vite**: Chosen for its fast development server and efficient build process.
- **TypeScript**: Used strictly throughout the project for type safety.
- **Tailwind CSS**: Utility-first CSS for rapid, consistent UI development.
- **React Router**: Version 6+ for declarative routing.
