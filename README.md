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

### Alternative: Manual Setup

If you prefer to run each app separately:

```bash
# Terminal 1 - Start Music Library MFE
cd music-library-mfe
npm install
npm run dev

# Terminal 2 - Start Main App
cd main-app
npm install
npm run dev
```

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
- **Development:** Hot Module Replacement (HMR)

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

## 🔐 Authentication System

### JWT Implementation
- **Mock JWT tokens** for demo purposes
- **Role-based access control** (admin/user)
- **Persistent sessions** using localStorage
- **Automatic session restoration** on app reload
- **Secure logout** with token cleanup

### Security Features
- **Token validation** on app initialization
- **Role-based UI rendering** 
- **Protected actions** for admin-only features
- **Automatic logout** on token expiration

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

### Deployment Considerations

- **Music Library MFE** must be deployed and accessible before the Main App
- Update the `remotes` configuration in `main-app/vite.config.js` with production URLs
- Ensure CORS is properly configured for cross-origin requests
- Consider using a CDN for static assets

### Example Production Configuration

```javascript
// main-app/vite.config.js
remotes: {
  musicLibraryMfe: 'https://music-library-mfe.your-domain.com/assets/remoteEntry.js'
}
```

## 🐛 Troubleshooting

### Common Issues

1. **"Music Library Unavailable" Error**
   - Ensure the Music Library MFE is running on port 3001
   - Check that both apps are started
   - Verify Module Federation configuration

2. **Authentication Issues**
   - Clear localStorage: `localStorage.clear()`
   - Use the exact demo credentials provided
   - Check browser console for errors

3. **Tailwind CSS PostCSS Error**
   - If you see "It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin"
   - Make sure `@tailwindcss/postcss` is installed: `npm install @tailwindcss/postcss`
   - Verify postcss.config.js uses `'@tailwindcss/postcss': {}` instead of `tailwindcss: {}`

4. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check that PostCSS is processing the CSS files
   - Verify that both apps have their CSS imported

5. **Module Federation Errors**
   - Ensure both apps are running
   - Check network tab for failed remote entry requests
   - Verify shared dependencies configuration

6. **Node.js Version Warning**
   - You may see warnings about Node.js version requirements
   - The apps should still work with Node.js 22.2.0 despite the warnings
   - For production, consider upgrading to Node.js 22.12+ or 20.19+

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing fast build tool
- Tailwind CSS for the utility-first CSS framework
- Module Federation team for making micro frontends possible

---

**Happy Coding! 🎵✨**
#
