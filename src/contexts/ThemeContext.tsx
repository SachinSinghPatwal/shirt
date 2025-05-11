import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeType = 'minimal' | 'vibrant' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('minimal');

  const cycleTheme = () => {
    setTheme((currentTheme) => {
      switch (currentTheme) {
        case 'minimal':
          return 'vibrant';
        case 'vibrant':
          return 'dark';
        case 'dark':
          return 'minimal';
        default:
          return 'minimal';
      }
    });
  };

  // Handle Alt+Q keyboard shortcut for theme switching
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key === 'q') {
        cycleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};