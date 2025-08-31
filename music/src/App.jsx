import { AuthProvider, useAuth } from './context/AuthContext';
import MusicLibrary from './components/MusicLibrary';
import Login from './components/Login';
import './index.css';

const AppContent = () => {
  const { isAuthenticated, logout, user, role } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary-600">🎵 Music Library</h1>
              <span className="text-sm bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                {role === 'admin' ? '👑 Admin' : '👤 User'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user}!</span>
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <MusicLibrary />
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;