# DJS05: My Podcast Website: Makiing Use Of Routing and Navigation

## Project Overview

In this project, I have builded a podcast show detail modal as part of a larger podcast browsing app. When a user selects a show from the homepage, a modal will display all the details about that show. This app supports dynamic routing so each show has its own unique URL.

You will implement data fetching based on the show ID in the URL, handle loading and error states gracefully, and ensure a smooth user experience by preserving search filters and pagination when users navigate back to the homepage. Additionally, you will build a season navigation system allowing users to expand or switch between seasons to browse episodes efficiently.

This project will demonstrate your ability to work with dynamic routes, manage state across pages, handle asynchronous data, and create a clean, maintainable React codebase.

![alt text](<Show Page Podcast.png>)

---

## 🎧Main Features

### 🔁 Routing & Navigation

- Dynamic routing for each podcast show (every show has a unique URL).
- Navigation system that allows:
- Clicking a show on the homepage to view details in a modal.
- Navigating back to the homepage while preserving search filters and pagination.

### 📡 Data Fetching & API Integration

Fetches:

- Show previews from https://podcast-api.netlify.app
- Genre details by ID from /genre/<ID>
- Full show details (including seasons and episodes) from /id/<ID>
- Uses dynamic ID from the route to load the correct show data.

### ⌛ State Management

Maintains:

- Loading state: shows spinner or indicator while data loads.
- Error state: user-friendly message when data fetching fails.
- Empty state: handles cases where no data is returned.

### 📄 Show Detail Modal

Shows the following details:

- Show title
- Large podcast image
- Description
- Genre tags (with ID-to-title mapping)
- Formatted “last updated” date

### 📚 Season Navigation

Each show includes multiple seasons and episodes.
UI supports:

- Expanding/collapsing seasons.
- Switching between seasons without excessive scrolling.

Each episode displays:

- Episode number
- Episode title
- Season image
- Shortened description

### 🧼 Code Quality

- Clean, modular React code.
- JSDoc comments for major components and functions.
- Consistent formatting and naming conventions.

### 📱 Responsive Design

Works across mobile, tablet, and desktop
