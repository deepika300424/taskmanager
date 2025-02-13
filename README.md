# Task Manager Application

This is a React-based Task Manager Application that helps users manage their tasks efficiently by allowing them to add, edit, delete, and organize tasks. It also features light/dark themes, sorting, and search functionalities.

![Task Manager Screenshot](public/images/image.png)

## Features

### Task Management:
- Add new tasks with details like title, description, priority, deadline, and type.
- Edit or delete existing tasks.
- Mark tasks as completed/uncompleted.

### Search & Sort:
- Search tasks by title.
- Sort tasks based on priority, completion status, date added, or deadline.

### Themes:
- Toggle between light and dark themes.

### Persistence:
- Tasks and theme settings are saved in localStorage for persistence across sessions.

### Responsive Design:
- Adapts to different screen sizes for a seamless user experience.

## Installation and Usage

### Prerequisites
- Node.js installed (v14+ recommended).

### Steps to Run

1. **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd taskmanager
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Start the Application:**
    ```bash
    npm start
    ```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Folder Structure

```
task-manager/
│
├── src/
│   ├── App.css            # Styles for the application
│   ├── App.js             # Main React component
│   ├── index.js           # Entry point of the application
│
├── public/
│   ├── index.html         # Main HTML file
│
├── package.json           # Project metadata and dependencies
└── README.md              # Documentation
```

## Functional Components

### App
The main component contains:
- **State Management:** Tracks tasks, search query, sort criteria, and theme.
- **CRUD Operations:** Functions for adding, editing, deleting, and updating tasks.
- **Sorting & Filtering:** Allows users to search and sort tasks.
- **Theme Switching:** Toggles between light and dark modes.

### Key State Variables

- **tasks:** Array of task objects, each containing:
  - `id`: Unique identifier.
  - `title`: Task title.
  - `description`: Task description.
  - `completed`: Completion status.
  - `priority`: Priority level (Low, Medium, High).
  - `deadline`: Task deadline.
  - `taskType`: Task category (Work, Personal, General).
  - `dateAdded`: Timestamp when the task was created.
- **theme:** Current theme (light or dark).
- **searchQuery:** Text for filtering tasks by title.
- **sortCriteria:** Criteria for sorting tasks (priority, completion, date, deadline).

### Local Storage Usage

- **Tasks:**
  - Stored as a JSON string under the key `tasks`.
  - Automatically updated whenever tasks are added, edited, or deleted.

- **Theme:**
  - Stored under the key `theme`.
  - Updated whenever the theme is toggled.

## Customization

### Styles:
- Modify `App.css` for custom styles.
- Add more styles for additional themes or UI components.

### Features:
- Extend the application by adding new task categories or features like reminders.

## Dependencies
- **React:** For building the user interface.

## Future Enhancements
- Add drag-and-drop functionality to reorder tasks.
- Add notifications for upcoming deadlines.
- Enhance filtering options (e.g., by date range or task type).
- Introduce user authentication for multi-user support.