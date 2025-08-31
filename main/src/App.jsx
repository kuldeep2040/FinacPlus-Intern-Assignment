import { Suspense, lazy, useState, Component } from 'react';
import './index.css';


const RemoteMusicLibraryApp = lazy(() => import('music/MusicLibraryWrapper'));


const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
  </div>
);


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Micro frontend error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <div className="text-red-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Music Library Unavailable
              </h3>
              <p className="text-gray-600 mb-4">
                The music library micro frontend is currently unavailable. Please make sure it's running on port 3001.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-primary-600">🎵 Music Library Platform</h1>
              <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                Main Container App
              </span>
            </div>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="text-sm text-primary-600 hover:text-primary-700 px-3 py-1 rounded-md hover:bg-primary-50 transition-colors"
            >
              {showInfo ? 'Hide Info' : 'Show Info'}
            </button>
          </div>
        </div>
      </header>


      {showInfo && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Micro Frontend Architecture Demo</h3>
                <p className="text-blue-700 mt-1">
                  This is the <strong>Main Container App</strong> that loads the <strong>Music Library Micro Frontend</strong> 
                  using Module Federation. The music library runs independently on port 3001 and is consumed here.
                </p>
                <div className="mt-3 text-sm text-blue-600">
                  <p><strong>Features:</strong></p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Role-based authentication (Admin/User)</li>
                    <li>CRUD operations for songs (Admin only)</li>
                    <li>Advanced filtering, sorting, and grouping</li>
                    <li>Responsive design with Tailwind CSS</li>
                    <li>Module Federation integration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      <main>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <RemoteMusicLibraryApp />
          </Suspense>
        </ErrorBoundary>
      </main>


      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center text-gray-600">
            <p className="text-sm">
      
              <span className="text-primary-600"> Main App (Port 3000)</span> + 
              <span className="text-green-600"> Music Library (Port 3001)</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;