import { useState, useEffect } from 'react';
import { Theme, getThemeFromStorage, saveThemeToStorage, applyThemeToDocument, defaultTheme } from '../config/themes';

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    // Initialize with saved theme or default
    return getThemeFromStorage();
  });

  useEffect(() => {
    // Apply theme on mount and when it changes
    applyThemeToDocument(currentTheme);
  }, [currentTheme]);

  const changeTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    saveThemeToStorage(theme.id);
    applyThemeToDocument(theme);
  };

  const resetToDefault = () => {
    changeTheme(defaultTheme);
  };

  return {
    currentTheme,
    changeTheme,
    resetToDefault,
  };
}
