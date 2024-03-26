import React, { createContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { User } from '../../types/user';
import { api } from '../../services/api';
import useLocalStorage from '../../hooks/useLocalStorage';
import useToast from '../../hooks/useToast';

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signIn: (user: User) => void;
  signOut: () => void;
  isAuth: boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const createToast = useToast();
  const [user, setUser] = useLocalStorage<User | null>('user', null); // Persist user data in local storage
  const isAuth = !!user;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (user: User) => {
    setLoading(true);
    try {
      const response = await api.post('/sessions', user);
      setUser(response.data);
      createToast('Login realizado com sucesso', 'success');
      navigate('/dashboard');
      setLoading(false);
    } catch (error: any) {
      createToast(error.response.data.eror, 'error');
      setLoading(false);
    }
  };
  const signOut = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, signIn, signOut, isAuth, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
