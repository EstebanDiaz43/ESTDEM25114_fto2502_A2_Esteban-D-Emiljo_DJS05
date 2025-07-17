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

---

### API Endpoints

Data can be called via a `fetch` request to the following three endpoints. Note that there is not always a one-to-one mapping between endpoints and actual data structures. Also note that **\*`<ID>`** indicates where the dynamic ID for the requested item should be placed. For example: `[https://podcast-api.netlify.app/genre/3](https://podcast-api.netlify.app/genre/3)`\*

| URL                                          |                                                                                        |
| -------------------------------------------- | -------------------------------------------------------------------------------------- |
| `https://podcast-api.netlify.app`            | Returns an array of PREVIEW                                                            |
| `https://podcast-api.netlify.app/genre/<ID>` | Returns a GENRE object                                                                 |
| `https://podcast-api.netlify.app/id/<ID>`    | Returns a SHOW object with several SEASON and EPISODE objects directly embedded within |

### Genre Titles

Since genre information is only exposed on `PREVIEW` by means of the specific `GENRE` id, it is recommended that you include the mapping between genre id values and title in your code itself:

| ID  | Title                    |
| --- | ------------------------ |
| 1   | Personal Growth          |
| 2   | Investigative Journalism |
| 3   | History                  |
| 4   | Comedy                   |
| 5   | Entertainment            |
| 6   | Business                 |
| 7   | Fiction                  |
| 8   | News                     |
| 9   | Kids and Family          |

## Deliverables

1. **Homepage / Listing Page**

   - List of shows with clickable links or buttons that navigate to each show's detail page.
   - Filters and search functionality that maintain state when navigating back from detail pages.

2. **Dynamic Show Detail Page**

   - A unique page for each show, accessible via a dynamic route.
   - Fetch and display show details including:
     - Title
     - Large podcast image
     - Description
     - Genre tags
     - Last updated date (formatted)
   - Display loading indicator while fetching data.
   - Display user-friendly error message if fetching fails.
   - Handle empty states gracefully (e.g., show not found).

3. **Season Navigation Component**

   - UI to expand/collapse seasons.
   - Show season title and episode count.
   - List episodes per season including:
     - Episode number
     - Episode title
     - Season image
     - Shortened episode description

4. **State Preservation**

   - Maintain applied filters and search terms when navigating back to the homepage from a show detail page.

5. **Code Quality**

   - Well-structured, modular React components.
   - JSDoc comments for all major functions and modules.
   - Consistent and readable formatting across all files.

6. **Responsive Design**

   - The UI adapts smoothly across different device sizes (mobile, tablet, desktop).

7. **README Documentation**
   - Brief project overview.
   - Instructions for running the project locally.
   - Description of main features and any known limitations.

---
