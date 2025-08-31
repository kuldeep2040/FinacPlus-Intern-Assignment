import { createContext, useContext, useReducer, useEffect } from 'react';


const MOCK_TOKENS = {
  admin: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3MzU2NTc4MDAsImlhdCI6MTcwNDA4NTgwMH0.mock_admin_signature',
  user: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoidXNlciIsInJvbGUiOiJ1c2VyIiwiZXhwIjoxNzM1NjU3ODAwLCJpYXQiOjE3MDQwODU4MDB9.mock_user_signature'
};


export const DEMO_CREDENTIALS = {
  admin: { username: 'admin', password: 'admin123' },
  user: { username: 'user', password: 'user123' }
};

const AuthContext = createContext();


const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        role: action.payload.role,
        token: action.payload.token
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        role: null,
        token: null
      };
    case 'RESTORE_SESSION':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        role: action.payload.role,
        token: action.payload.token
      };
    default:
      return state;
  }
};


const decodeToken = (token) => {
  try {
    if (!token || typeof token !== 'string') return null;
    
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    

    if (token === MOCK_TOKENS.admin) {
      return { user: 'admin', role: 'admin', exp: 1735657800 };
    } else if (token === MOCK_TOKENS.user) {
      return { user: 'user', role: 'user', exp: 1735657800 };
    }
    return null;
  } catch {
    return null;
  }
};


const initialState = {
  isAuthenticated: false,
  user: null,
  role: null,
  token: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);


  useEffect(() => {
    const token = localStorage.getItem('musicLibraryToken');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded.exp > Date.now() / 1000) {
        dispatch({
          type: 'RESTORE_SESSION',
          payload: {
            user: decoded.user,
            role: decoded.role,
            token
          }
        });
      } else {
        localStorage.removeItem('musicLibraryToken');
      }
    }
  }, []);


  const login = (username, password) => {

    const isAdmin = username === DEMO_CREDENTIALS.admin.username && 
                   password === DEMO_CREDENTIALS.admin.password;
    const isUser = username === DEMO_CREDENTIALS.user.username && 
                  password === DEMO_CREDENTIALS.user.password;

    if (isAdmin) {
      const token = MOCK_TOKENS.admin;
      localStorage.setItem('musicLibraryToken', token);
      dispatch({
        type: 'LOGIN',
        payload: {
          user: 'admin',
          role: 'admin',
          token
        }
      });
      return { success: true, role: 'admin' };
    } else if (isUser) {
      const token = MOCK_TOKENS.user;
      localStorage.setItem('musicLibraryToken', token);
      dispatch({
        type: 'LOGIN',
        payload: {
          user: 'user',
          role: 'user',
          token
        }
      });
      return { success: true, role: 'user' };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  };


  const logout = () => {
    localStorage.removeItem('musicLibraryToken');
    dispatch({ type: 'LOGOUT' });
  };


  const isAdmin = () => state.role === 'admin';


  const isUser = () => state.role === 'user';

  const value = {
    ...state,
    login,
    logout,
    isAdmin,
    isUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
