'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [hasSeenIntro, setHasSeenIntro] = useState(() => {
    if (typeof window !== 'undefined') {
      const lastVisit = localStorage.getItem('lastVisit');
      const currentTime = Date.now();
      const oneHour = 60 * 60 * 1000;
      return lastVisit && currentTime - parseInt(lastVisit) < oneHour;
    }
    return false;
  });

  const markIntroAsSeen = () => {
    localStorage.setItem('lastVisit', Date.now().toString());
    setHasSeenIntro(true);
  };

  return (
    <SessionContext.Provider value={{ hasSeenIntro, markIntroAsSeen }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
