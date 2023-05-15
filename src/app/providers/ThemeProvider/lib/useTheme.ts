import { useContext } from 'react';
import { Theme, ThemeContext } from './ThemeContext';

interface useThemeResult {
  toggleTheme: (saveAction: (theme: Theme) => void) => void;
  theme: Theme;
}

export const useTheme = (): useThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = (saveAction: (theme: Theme) => void) => {
    let newTheme: Theme;
    switch (theme) {
      case Theme.LIGHT:
        newTheme = Theme.ORANGE;
        break;
      case Theme.DARK:
        newTheme = Theme.LIGHT;
        break;
      case Theme.ORANGE:
        newTheme = Theme.DARK;
        break;
      default:
        newTheme = Theme.LIGHT;
    }
    setTheme?.(newTheme);
    saveAction?.(newTheme);
  };

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
  };
};
