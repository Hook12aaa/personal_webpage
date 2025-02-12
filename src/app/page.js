// app/page.js
'use client';
import { useState } from 'react';
import Background from './components/Background';
import OpeningScreen from './components/OpeningScreen';
import ProfileDisplay from './components/ProfileDisplay';

export default function Home() {
  const [showMainContent, setShowMainContent] = useState(false);

  const handleLearnMore = () => {
    setShowMainContent(true);
  };

  if (!showMainContent) {
    return <OpeningScreen onLearnMore={handleLearnMore} />;
  }

  return <ProfileDisplay />;
}