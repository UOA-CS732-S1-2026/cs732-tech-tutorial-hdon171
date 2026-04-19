Vue 3 Task Manager & Vue vs React Tutorial

This project demonstrates my ability to learn and apply a new web technology outside lectures.I chose Vue 3 as the alternative frontend framework to compare with React (the focus of this course).
This submission includes:
A fully functional Vue 3 Task Manager
Vue 3 vs React comparison page
Complete documentation for peer review
Responsive, production-ready UI

Project Features

Add, delete, toggle tasks
Filter: Active / Completed / All
Real-time statistics
Batch selection & bulk actions
Local storage persistence
Vue Router navigation
Pinia state management
Dedicated Vue vs React comparison page

Vue 3 vs React Comparison Page
Reactivity System (auto-tracking vs manual dependency arrays)
State Management (Pinia vs Redux/Zustand)
Rendering & Performance
Learning Curve & Syntax
Interactive comparison table
Professional grading-ready content

Tech Stack
Vue 3 (Composition API)
Pinia (State Management)
Vue Router (Page Navigation)
Vite (Build Tool)
Vanilla CSS (Modern Styling)


How to Run This Project

1. Prerequisites
Node.js installed
Git / GitHub Classroom repo cloned

2. Install Dependencies
npm install

3. Run Development Server
npm run dev

4. Open in Browser
Visit the local URL shown in your terminal 
(typically http://localhost:5173)


Project Structure

src/
├── App.vue               # Main app + navigation
├── main.js               # Entry point
├── router/               # Vue Router
├── stores/               # Pinia state management
├── views/
│   ├── TodoView.vue      # Task manager UI
│   └── ComparisonView.vue # Vue vs React comparison
└── style.css

Core Concepts Demonstrated
1. Vue 3 Reactivity
ref() for reactive state
computed() for automatic derived state
No manual dependency tracking (unlike React)
2. Pinia State Management
Centralized store for all task logic
Encapsulated actions (add, delete, toggle)
Clean, minimal boilerplate
3. Vue Router
Multi-page navigation
Active route styling
Clean page separation
4. Local Storage
Auto-save & load tasks
Persistent user data

Comparison Summary (Vue 3 vs React)
This project includes a full comparison page covering:
Reactivity: Vue auto-tracks dependencies | React requires manual arrays
State: Pinia is simple & lightweight | Redux has more boilerplate
Performance: Vue fine-grained updates | React uses VDOM & re-renders
Syntax: Vue templates (HTML/JS separation) | React JSX (mixed logic)
Learning: Vue easier for beginners | React steeper curve