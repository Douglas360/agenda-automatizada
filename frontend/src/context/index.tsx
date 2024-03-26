import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';

interface CombinedProviderProps {
  children: ReactNode;
}

export const CombinedProvider: React.FC<CombinedProviderProps> = ({
  children,
}) => {
  return <AuthProvider>{children}</AuthProvider>;
};
