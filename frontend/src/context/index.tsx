import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { EventsProvider } from './EventsContext';

interface CombinedProviderProps {
  children: ReactNode;
}

export const CombinedProvider: React.FC<CombinedProviderProps> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <EventsProvider>{children}</EventsProvider>
    </AuthProvider>
  );
};
