# SmartStay Airbnb Clone

SmartStay is a modern accommodation booking platform built with React and Vite. It serves as a fully dynamic, data-driven system handling complex state management patterns and asynchronous data flows.

## 🗂 Project Structure
- `src/components/` - Reusable UI components (Navbar, ListingCard, UserProfileCard, etc.)
- `src/pages/` - Page-level components corresponding to application routes (Home, ListingDetails, Bookings, Favorites, Login).
- `src/services/` - Centralized API utility files managing Axio instances and remote data fetching.
- `src/store/` - Global state management using Zustand for persistent Authentication and Booking states.
- `src/context/` - React Context API for managing the user's saved Favorites list across the application.

## 🔌 API Integration
This application integrates with the **Airbnb API from RapidAPI** (`airbnb19.p.rapidapi.com`). 
- API requests are executed using an Axios utility situated in `src/services/api.js`, which securely attaches the Base URL and environment variables to the headers.
- Since the designated `searchPropertyByPlaceId` endpoint is utilized, properties are returned based on geographical Google Place IDs.
- API caching, refetching, and status indicators (loading/error) are safely managed globally using **TanStack Query** to guarantee instant cache loading and prevent redundant network calls across transitions.
- Text-based locations inputted via the search bar are dynamically filtered against the fetched properties locally on the frontend.

## 🚀 Setup Instructions
1. Clone or download the repository to your local machine.
2. Open your terminal in the project folder and install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your RapidAPI key:
   ```env
   VITE_RAPID_API_KEY=YOUR_RAPID_API_KEY_HERE
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
