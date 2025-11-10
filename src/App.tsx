import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { DashboardLayout } from './components/DashboardLayout';
import { getThemeFromStorage, applyThemeToDocument } from './config/themes';
import { Toaster } from './components/ui/sonner';

type AppView = 'landing' | 'dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');

  // Initialize theme on app load
  useEffect(() => {
    const theme = getThemeFromStorage();
    applyThemeToDocument(theme);
  }, []);

  if (currentView === 'landing') {
    return (
      <>
        <LandingPage onLaunchApp={() => setCurrentView('dashboard')} />
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <>
      <DashboardLayout onBackToLanding={() => setCurrentView('landing')} />
      <Toaster position="top-right" />
    </>
  );
}
