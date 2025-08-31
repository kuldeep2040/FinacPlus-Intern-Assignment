import { AuthProvider, useAuth } from '../context/AuthContext';
import MusicLibrary from './MusicLibrary';
import Login from './Login';

const MusicLibraryContent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return <MusicLibrary />;
};

const MusicLibraryWrapper = () => {
  return (
    <AuthProvider>
      <MusicLibraryContent />
    </AuthProvider>
  );
};

export default MusicLibraryWrapper;
