import React, { createContext, useState, ReactNode } from 'react';

import { api } from '../../services/api';
import { useAuth } from '../AuthContext/useAuth';
import { Event } from '../../types/event';
interface EventContextType {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  getEvents: () => Promise<void>;
}

export const EventsContext = createContext<EventContextType | null>(null);

interface EventsProviderProps {
  children: ReactNode;
}

export const EventsProvider: React.FC<EventsProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);

  const getEvents = async () => {
    try {
      const response = await api.get('/events', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      console.log(response.data);
      setEvents(response.data);
    } catch (error: any) {
      console.error(error.response.data);
    }
  };

  return (
    <EventsContext.Provider value={{ events, setEvents, getEvents }}>
      {children}
    </EventsContext.Provider>
  );
};
