'use client';
import { useState } from 'react';
import { useSession } from '../context/SessionContext';
import OpeningScreen from '../components/OpeningScreen';
import ProfileDisplay from '../components/ProfileDisplay';

export default function SlugPage() {
  const { hasSeenIntro, markIntroAsSeen } = useSession();
  const [showMainContent, setShowMainContent] = useState(hasSeenIntro);

  const handleLearnMore = () => {
    markIntroAsSeen();
    setShowMainContent(true);
  };

  if (!showMainContent) {
    return <OpeningScreen onLearnMore={handleLearnMore} />;
  }

  return <ProfileDisplay />;
}
