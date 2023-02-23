import React, { createContext, useState, useContext, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import { dark, light } from '../styles/global';

interface MuiThemeContextData {
  theme: boolean;
  setTheme(theme: boolean): void;
}

/**
 * Creating context.
 */
const MuiThemeContext = createContext<MuiThemeContextData>(
  {} as MuiThemeContextData
);

/**
 * MUI ThemeProveider component.
 */
const MuiThemeProvider: React.FC = ({ children }) => {
  // Check OS preference
  const lightThemeMode = useMediaQuery('(prefers-color-scheme: light)');

  // Dark theme state
  const [theme, setTheme] = useState(lightThemeMode);

  /**
   * Hook to set up dark theme, based on OS preference
   */
  useEffect(() => {
    setTheme(lightThemeMode);
  }, [lightThemeMode]);

  return (
    <ThemeProvider
      theme={
        theme
          ? createTheme(light as ThemeOptions)
          : createTheme(dark as ThemeOptions)
      }
    >
      <MuiThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </MuiThemeContext.Provider>
    </ThemeProvider>
  );
};

/**
 * Sets up the useContext for theme.
 */
function useMuiTheme(): MuiThemeContextData {
  const context = useContext(MuiThemeContext);

  if (!context) {
    throw new Error('Use MuiTheme must be used within a MuiThemeProvider');
  }

  return context;
}

export { useMuiTheme, MuiThemeProvider };
