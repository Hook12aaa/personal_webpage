'use client';
import { useEffect, useState } from 'react';
import { useSession } from './context/SessionContext';
import OpeningScreen from './components/OpeningScreen';
import ProfileDisplay from './components/ProfileDisplay';

export default function Home() {
  const { hasSeenIntro, markIntroAsSeen } = useSession();
  const [showMainContent, setShowMainContent] = useState(hasSeenIntro);

  useEffect(() => {
    setShowMainContent(hasSeenIntro);
  }, [hasSeenIntro]);

  const handleLearnMore = () => {
    markIntroAsSeen();
    setShowMainContent(true);
  };

  if (!showMainContent) {
    return <OpeningScreen onLearnMore={handleLearnMore} />;
  }

  return <ProfileDisplay />;
}