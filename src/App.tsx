import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import CustomizationForm from './components/CustomizationForm';
import ThemeSwitcher from './components/ThemeSwitcher';
import { appContainerStyles } from './utils/theme-utils';
import { useTheme } from './contexts/ThemeContext';

// App wrapper component that uses the theme context
const AppContent: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className={appContainerStyles({ theme })}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className={`text-3xl font-bold ${theme === 'vibrant' ? 'text-purple-800' : ''}`}>
            Custom T-shirt Designer
          </h1>
          <p className={`mt-2 ${theme === 'vibrant' ? 'text-purple-600' : 'text-gray-600'} ${theme === 'dark' ? 'text-gray-300' : ''}`}>
            Create your perfect fit with our personalized t-shirt design tool
          </p>
        </header>
        
        <main>
          <CustomizationForm />
        </main>
        
        <footer className="mt-12 text-center text-sm opacity-70">
          <p>© 2025 Custom T-shirt Designer. All rights reserved.</p>
        </footer>
      </div>
      
      <ThemeSwitcher />
    </div>
  );
};

// Main App component with ThemeProvider wrapper
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;