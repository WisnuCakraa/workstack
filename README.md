# Workstack

**Workstack** is a modern, responsive User Operations dashboard designed to streamline user data management and activity tracking. [cite_start]This project was developed as a technical assessment for **PT Mampu Inovasi Digital**. [cite: 26, 28]

## 🚀 Overview

[cite_start]Workstack transforms raw user data into a clear, useful, and easy-to-navigate interface. [cite: 46] [cite_start]It integrates user profiles with real-time activity signals—such as post counts and todo status—to provide a comprehensive view of user engagement. [cite: 53]

## 🛠️ Tech Stack

- [cite_start]**Framework:** Next.js 13+ (App Router) [cite: 11]
- [cite_start]**Language:** TypeScript [cite: 9]
- [cite_start]**Styling:** Tailwind CSS [cite: 14]
- [cite_start]**Data Fetching:** Client-side fetching for dynamic filtering and sorting. [cite: 24, 25]
- [cite_start]**Testing:** Jest & React Testing Library (RTL). [cite: 15, 81]

## ✨ Key Features

- [cite_start]**Users List Page (`/users`):** Displays a responsive table of users with columns for Name, Email, and Website. [cite: 18, 20]
- [cite_start]**Activity Signals:** Each user row is enriched with total posts, completed todos, and pending todos. [cite: 53]
- [cite_start]**Advanced Filtering:** Real-time search by name/email and task-based filtering (e.g., users with pending tasks). [cite: 25, 57]
- [cite_start]**User Details (`/users/[id]`):** Dedicated view for detailed profile information, including a clear section for the user's specific posts and todos. [cite: 33, 58]
- [cite_start]**Mobile-First UX:** A sensible mobile layout that avoids "squeezed" tables for a better handheld experience. [cite: 54, 55]
- [cite_start]**Resilient States:** Handles loading, error, empty filter results, and invalid user IDs gracefully. [cite: 21, 62]

## 📦 Getting Started

1. **Clone & Install:**
   ```bash
   git clone [https://github.com/your-username/workstack.git](https://github.com/your-username/workstack.git)
   cd workstack
   npm install
   ```
