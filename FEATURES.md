# Features Documentation

This document provides a detailed overview of the various features implemented in the Karoseri Frontend application.

## 🌟 Landing Page (`src/features/landing`)

The entry point for visitors, providing an overview of the system and call-to-actions.

### Key Components

- **`LandingView`**: The main page component showcasing the application's value proposition.
- **`LandingLayout`**: A specialized layout for marketing pages, distinct from the main application shell.

### Routing

- `path: "/"`: Renders the `LandingView`.

---

## 📊 Dashboard (`src/features/dashboard`)

The main overview for authenticated users, displaying key metrics and stats.

### Key Components

- **`DashboardView`**: The primary page for the dashboard.
- **`StatsCard`**: A reusable card component for displaying individual metrics (Total Analyses, Accuracy, etc.).

### Data Models

- **`DashboardStats`**: Interface for aggregate statistics from the API.
- **`RecentAnalysis`**: Interface for individual analysis records.

### Routing

- `path: "/dashboard"`: Renders the `DashboardView` within the `MainLayout`.

---

## 🔐 Auth (`src/features/auth`)

_In Progress._ The module responsible for user authentication and authorization.

---

## 🛠️ Analysis (`src/features/analysis`)

_Planned._ This module will handle the image upload and AI classification workflow.

---

## 📈 Reports (`src/features/reports`)

_Planned._ This module will provide detailed reporting and data export capabilities.
