# Task Management Dashboard

A comprehensive task management application built with React.js and Redux. This application allows users to efficiently manage tasks with features like adding, editing, deleting, filtering, and sorting tasks.

## Features

- **Task Management**: Add, view, edit, and delete tasks
- **Task Properties**: Each task includes title, description, status (To Do, In Progress, Done), and due date
- **Filtering**: Filter tasks based on their status
- **Sorting**: Sort tasks by due date and status (ascending or descending)
- **Persistence**: Tasks are saved to local storage and persist across page reloads
- **Responsive Design**: Mobile-friendly interface that works on all device sizes
- **Form Validation**: Ensures all task fields are correctly filled out

## Technologies Used

- React.js with functional components and hooks
- Redux for state management
- TypeScript for type safety
- TailwindCSS for styling
- React hook form for handle form data
- Yup for form data validation
- Flowbite react for UI components

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Build for production: `npm run build`

## Design Decisions

- **Redux for State Management**: Provides a centralized store for all task data, making it easier to implement features like filtering and sorting.
- **TypeScript**: Ensures type safety and improves code maintainability.
- **TailwindCSS**: Enables rapid UI development with a utility-first approach.
- **Component Structure**: Organized into reusable components for better maintainability.
- **Form Validation**: Ensures data integrity by validating user inputs.