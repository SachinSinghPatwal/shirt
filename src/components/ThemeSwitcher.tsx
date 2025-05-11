import React from 'react';
import { Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { buttonStyles, getThemeLabel } from '../utils/theme-utils';
import { cn } from '../utils/cn';

const ThemeSwitcher: React.FC = () => {
  const { theme, cycleTheme } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 z-10">
      <button
        type="button"
        onClick={cycleTheme}
        className={cn(
          buttonStyles({ theme }),
          'flex items-center gap-2 rounded-full px-4 py-2 shadow-lg'
        )}
        title="Switch theme (Alt+Q)"
      >
        <Palette size={18} />
        <span className="text-sm">{getThemeLabel(theme)}</span>
      </button>
      <p className="text-xs mt-1 text-center opacity-70">Press Alt+Q to switch themes</p>
    </div>
  );
};

export default ThemeSwitcher;