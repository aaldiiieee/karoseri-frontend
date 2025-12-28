# Karoseri Component Damage Classification Frontend

This is the frontend application for the Karoseri Component Damage Classification system. It provides a user-friendly interface for vehicle inspection, damage analysis view, and historical data management.

## 🚀 Key Features

- **Interactive Dashboard**: Real-time stats and analysis overview.
- **Image Analysis**: Upload and classify component damage using AI.
- **History Tracking**: View and manage previous classification results.
- **Team Management**: User and team settings (in progress).

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State/Routing**: React Router
- **API Client**: Axios with custom error handling
- **Icons**: Lucide React

## 📂 Documentation

- [**Architecture**](file:///Users/pramudyareynaldisalim/Work/UNPAM/karoseri-frontend/ARCHITECTURE.md): Detailed look at the folder structure and design patterns.
- [**Features**](file:///Users/pramudyareynaldisalim/Work/UNPAM/karoseri-frontend/FEATURES.md): Overview of existing features and how they work.

## 📋 Getting Started

### Prerequisites

- **Node.js**: v18.0.0+
- **npm**: v9.0.0+

### Installation

1.  **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd karoseri-frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🏗️ Project Structure

The project follows a **Feature-based Architecture**:

```
src/
├── app/                # Global configuration, providers, and main router
├── features/           # Feature-specific modules (Dashboard, Landing, etc.)
├── shared/             # Reusable UI components, hooks, and utilities
└── main.tsx            # Application entry point
```

## 📄 License

[Add License Information Here]
