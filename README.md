# Vue 3 Task Manager & Vue vs React Tutorial

> A comprehensive demonstration of learning and applying Vue 3 as an alternative frontend framework, with detailed comparison to React.

## Overview

This project demonstrates my ability to independently learn and apply a new web technology outside of course lectures. I chose **Vue 3** as the alternative frontend framework to compare with **React** (the primary focus of CS732).

### What's Included

- Fully functional Vue 3 Task Manager application
- Dedicated Vue 3 vs React comparison page
- Complete documentation for peer review
- Responsive, production-ready user interface

---

## Features

### Task Manager
- Add, delete, and toggle tasks with ease
- Smart filtering: Active / Completed / All views
- Real-time statistics tracking
- Batch selection & bulk actions for efficient task management
- Local storage persistence - your data stays safe
- Vue Router navigation for seamless page transitions
- Pinia state management for clean, organized code

### Vue vs React Comparison
- Reactivity System: Auto-tracking vs manual dependency arrays
- State Management: Pinia vs Redux/Zustand comparison
- Rendering & Performance: Deep dive into optimization strategies
- Learning Curve & Syntax: Developer experience analysis
- Interactive comparison table with professional grading-ready content

---

## Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Vue 3** | Frontend Framework (Composition API) | Latest |
| **Pinia** | State Management | ^3.0.4 |
| **Vue Router** | Page Navigation | ^5.0.4 |
| **Vite** | Build Tool & Dev Server | ^8.0.4 |
| **Vanilla CSS** | Modern Styling | - |

---

## Getting Started

### Prerequisites

- **Node.js** installed on your machine
- **Git** installed and GitHub Classroom repo cloned

### Installation & Running

**Step 1: Install Dependencies**
```bash
npm install
```

**Step 2: Start Development Server**
```bash
npm run dev
```

**Step 3: Open in Browser**
Visit the local URL displayed in your terminal (typically `http://localhost:5173`)

### Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production (generates dist/ directory)
npm run preview  # Preview production build locally
```

---

## Project Structure

```
cs732-tech-tutorial-hdon171/
├── src/
│   ├── App.vue               # Main app component + navigation
│   ├── main.js               # Application entry point
│   ├── style.css             # Global styles
│   ├── router/
│   │   └── index.js          # Vue Router configuration
│   ├── stores/
│   │   └── taskStore.js      # Pinia state management
│   └── views/
│       ├── TodoView.vue      # Task manager UI component
│       └── ComparisonView.vue # Vue vs React comparison page
├── public/                   # Static assets
├── dist/                     # Production build output
├── index.html                # HTML entry point
├── package.json              # Project dependencies & scripts
├── vite.config.js            # Vite configuration
└── README.md                 # Project documentation
```

---

## Core Concepts Demonstrated

### 1. Vue 3 Reactivity System
- `ref()` for reactive state management
- `computed()` for automatic derived state
- **Key Advantage**: No manual dependency tracking required (unlike React's `useEffect`)

### 2. Pinia State Management
- Centralized store for all task-related logic
- Encapsulated actions (add, delete, toggle)
- **Key Advantage**: Clean, minimal boilerplate compared to Redux

### 3. Vue Router
- Multi-page navigation with smooth transitions
- Active route styling for better UX
- Clean separation of page components

### 4. Local Storage Integration
- Automatic save and load of user tasks
- Persistent data across browser sessions
- Seamless user experience without data loss

---

## Vue 3 vs React: Comparison Summary

This project includes a comprehensive comparison page covering:

| Aspect | Vue 3 | React |
|--------|-------|-------|
| **Reactivity** | Auto-tracks dependencies | Requires manual dependency arrays |
| **State Management** | Pinia: simple & lightweight | Redux: more boilerplate, Zustand: alternatives |
| **Performance** | Fine-grained reactive updates | Virtual DOM diffing & re-renders |
| **Syntax** | Templates (HTML/JS separation) | JSX (mixed logic) |
| **Learning Curve** | Easier for beginners | Steeper learning curve |

---

## Notes

This project was developed as part of the CS732 course assignment to demonstrate:
- Independent learning capabilities
- Practical application of new technologies
- Critical comparison between frontend frameworks
- Professional software development practices

---

## Contributing

This is a course assignment project. For questions or feedback, please refer to the course documentation.

---

**Developed using Vue 3**
