import { createContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, id: string) => void;
  logout: () => void;
  token: string;
  id: string;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {
    console.log('login');
  },
  logout: () => {
    console.log('logout');
  },
  token: '',
  id: '',
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('accessToken') || '');
  const [id, setId] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedId = localStorage.getItem('userId');

    if (storedToken && storedId) {
      setToken(storedToken);
      setId(storedId);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken('');
    setId('');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
  };

  const login = (accessToken: string, userId: string) => {
    setIsAuthenticated(true);
    setToken(accessToken);
    setId(userId);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userId', userId);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout: handleLogout, token, id }}
    >
      {children}
    </AuthContext.Provider>
  );
};
