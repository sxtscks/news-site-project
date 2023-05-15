import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Theme, ThemeContext } from '../lib/ThemeContext';
import { useJsonSettings } from '@/entities/User';

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: ReactNode;
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, initialTheme } = props;
  const { theme: defaultTheme } = useJsonSettings();
  const [theme, setTheme] = useState<Theme>(
    initialTheme || defaultTheme || Theme.LIGHT
  );
  const [isThemeInited, setThemeInited] = useState(false);

  useEffect(() => {
    if (!isThemeInited && defaultTheme) {
      setTheme(defaultTheme);
      setThemeInited(true);
    }
  }, [defaultTheme, isThemeInited]);

  const defaultValue = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={defaultValue}>
      {children}
    </ThemeContext.Provider>
  );
};
