# 🎵 Music Library - Micro Frontend Project

A modern Music Library application built with React and Micro Frontend architecture using Module Federation. This project demonstrates role-based authentication, CRUD operations, advanced filtering, and micro frontend integration.

## 🎯 Project Overview

This application consists of two React apps:
- **Main App (Container)** - Runs on port 3000
- **Music Library MFE (Micro Frontend)** - Runs on port 3001

The main app consumes the music library as a micro frontend using Webpack Module Federation.

## ✨ Features

### 🔐 Authentication System
- **JWT-based authentication** (mock implementation)
- **Role-based access control** (Admin/User)
- **Persistent sessions** using localStorage
- **Demo credentials** for easy testing

### 🎵 Music Library
- **Advanced Filtering** by genre, search terms
- **Sorting** by title, artist, album, genre, year
- **Grouping** by artist, album, genre, year
- **Responsive Design** with Tailwind CSS

### 🏗️ Architecture
- **Micro Frontend** using Module Federation
- **Independent deployments** for each app
- **Shared dependencies** (React, React-DOM)
- **Error boundaries** for resilient loading

## 🌐 Live Demo Links

* **Main App:** 
    * *URL: https://finac-plus-ks-main.vercel.app/*
* **Music Library Micro Frontend:**
    * *URL: https://finac-plus-music.vercel.app/*

---

## ⚙️ Technical Details

* **React:** Functional components with hooks.
* **State Management:** `useState` and `Context API` are used for managing application state.
* **Authentication:** A mock JWT is stored in `localStorage` to persist the user session.
* **Build Tools:** The project uses [Vite/Webpack] with lazy loading for the micro frontend.


## 🚀 Quick Start

### Installation & Setup

1. **Clone or download the project**
   ```bash
   cd music-library-project
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Start both applications**
   ```bash
   npm run dev
   ```

   This will start:
   - Music Library MFE on http://localhost:3001
   - Main App on http://localhost:3000

4. **Open your browser** and navigate to http://localhost:3000


## 🔑 Demo Credentials

### Admin User
- **Username:** `admin`
- **Password:** `admin123`
- **Permissions:** Full access (view, add, delete songs)

### Regular User
- **Username:** `user`
- **Password:** `user123`
- **Permissions:** Read-only access (view and filter songs)

## 📁 Project Structure

```
music-library-project/
├── main-app/                 # Container application (Port 3000)
│   ├── src/
│   │   ├── App.jsx          # Main app component with error boundary
│   │   ├── main.jsx         # App entry point
│   │   └── index.css        # Tailwind CSS styles
│   ├── vite.config.js       # Vite config with Module Federation consumer
│   ├── tailwind.config.js   # Tailwind configuration
│   └── package.json
├── music-library-mfe/        # Music Library Micro Frontend (Port 3001)
│   ├── src/
│   │   ├── components/
│   │   │   ├── MusicLibrary.jsx  # Main music library component
│   │   │   └── Login.jsx         # Login component
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Authentication context
│   │   ├── App.jsx               # MFE app component
│   │   ├── main.jsx              # MFE entry point
│   │   └── index.css             # Tailwind CSS styles
│   ├── vite.config.js            # Vite config with Module Federation host
│   ├── tailwind.config.js        # Tailwind configuration
│   └── package.json
├── package.json              # Root package.json with scripts
└── README.md
```

## 🛠️ Available Scripts

### Root Level Scripts
```bash
npm run dev          # Start both apps concurrently
npm run build        # Build both apps for production
npm run preview      # Preview both built apps
npm run install:all  # Install dependencies for all apps
```

### Individual App Scripts
```bash
# Main App
npm run dev:main     # Start main app only
npm run build:main   # Build main app only

# Music Library MFE
npm run dev:mfe      # Start MFE only
npm run build:mfe    # Build MFE only
```

## 🎨 Technology Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **Micro Frontend:** Module Federation (@originjs/vite-plugin-federation)
- **Styling:** Tailwind CSS
- **State Management:** React Context API + useReducer
- **Authentication:** JWT (mock implementation)

## 🔧 Micro Frontend Architecture

### Module Federation Setup

**Music Library MFE (Host)** exposes:
```javascript
exposes: {
  './MusicLibrary': './src/components/MusicLibrary',
  './AuthProvider': './src/context/AuthContext'
}
```

**Main App (Consumer)** imports:
```javascript
remotes: {
  musicLibraryMfe: 'http://localhost:3001/assets/remoteEntry.js'
}
```

### Benefits
- **Independent Development:** Teams can work on different parts independently
- **Independent Deployment:** Each micro frontend can be deployed separately
- **Technology Flexibility:** Different micro frontends can use different versions or even different frameworks
- **Scalability:** Easy to add new micro frontends as the application grows

## 🎵 Music Library Features

### For All Users
- **View Songs:** Browse the complete music library
- **Search:** Find songs by title, artist, or album
- **Filter:** Filter by genre
- **Sort:** Sort by title, artist, album, genre, or year
- **Group:** Group songs by artist, album, genre, or year
- **Responsive Design:** Works on desktop, tablet, and mobile

### For Admin Users
- **Add Songs:** Add new songs to the library
- **Delete Songs:** Remove songs from the library
- **Full Management:** Complete CRUD operations

### Array Methods Implementation
The project extensively uses JavaScript array methods:
- **filter():** For search and genre filtering
- **sort():** For sorting songs by different criteria
- **reduce():** For grouping songs by categories
- **map():** For rendering song lists and dropdowns


## 🎨 UI/UX Features

- **Modern Design:** Clean, professional interface
- **Responsive Layout:** Mobile-first design approach
- **Loading States:** Smooth loading indicators
- **Error Handling:** User-friendly error messages
- **Interactive Elements:** Hover effects and smooth transitions
- **Accessibility:** Semantic HTML and proper ARIA labels

## 🚀 Deployment

### Building for Production

1. **Build both applications:**
   ```bash
   npm run build
   ```

2. **Preview the built applications:**
   ```bash
   npm run preview
   ```
---

**Thnk You Kuldeep Singh! 🎵✨**
#

