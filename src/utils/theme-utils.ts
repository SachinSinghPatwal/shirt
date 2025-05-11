import { ThemeType } from '../contexts/ThemeContext';
import { cva } from 'class-variance-authority';

// Theme classes for the app container
export const appContainerStyles = cva('min-h-screen transition-colors duration-300 ease-in-out p-6 md:p-10', {
  variants: {
    theme: {
      minimal: 'bg-gray-50 text-gray-900',
      vibrant: 'bg-purple-50 text-purple-900',
      dark: 'bg-gray-900 text-gray-50'
    }
  },
  defaultVariants: {
    theme: 'minimal'
  }
});

// Theme classes for the card container
export const cardStyles = cva(
  'rounded-xl shadow-lg transition-all duration-300 ease-in-out p-6 md:p-8',
  {
    variants: {
      theme: {
        minimal: 'bg-white border border-gray-200',
        vibrant: 'bg-white border border-purple-200 shadow-purple-100',
        dark: 'bg-gray-800 border border-gray-700'
      }
    },
    defaultVariants: {
      theme: 'minimal'
    }
  }
);

// Theme classes for the form inputs
export const inputStyles = cva(
  'w-full rounded-md border px-3 py-2 text-sm transition duration-200 focus:outline-none focus:ring-2',
  {
    variants: {
      theme: {
        minimal: 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-200',
        vibrant: 'border-purple-300 bg-white text-purple-900 focus:border-purple-500 focus:ring-purple-200',
        dark: 'border-gray-600 bg-gray-700 text-white focus:border-blue-400 focus:ring-blue-700'
      }
    },
    defaultVariants: {
      theme: 'minimal'
    }
  }
);

// Theme classes for buttons
export const buttonStyles = cva(
  'rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      theme: {
        minimal: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        vibrant: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
        dark: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400'
      },
      variant: {
        primary: '',
        secondary: ''
      }
    },
    compoundVariants: [
      {
        theme: 'minimal',
        variant: 'secondary',
        className: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500'
      },
      {
        theme: 'vibrant',
        variant: 'secondary',
        className: 'bg-purple-100 text-purple-800 hover:bg-purple-200 focus:ring-purple-500'
      },
      {
        theme: 'dark',
        variant: 'secondary',
        className: 'bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-gray-500'
      }
    ],
    defaultVariants: {
      theme: 'minimal',
      variant: 'primary'
    }
  }
);

// Get theme-specific accent color
export const getAccentColor = (theme: ThemeType) => {
  switch (theme) {
    case 'minimal':
      return 'rgb(59 130 246)'; // blue-500
    case 'vibrant':
      return 'rgb(147 51 234)'; // purple-600
    case 'dark':
      return 'rgb(96 165 250)'; // blue-400
    default:
      return 'rgb(59 130 246)';
  }
};

// Theme labels
export const getThemeLabel = (theme: ThemeType) => {
  switch (theme) {
    case 'minimal':
      return 'Minimal';
    case 'vibrant':
      return 'Vibrant';
    case 'dark':
      return 'Dark';
    default:
      return 'Minimal';
  }
};