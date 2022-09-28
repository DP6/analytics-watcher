import React, { createContext, useState, useContext, useEffect } from 'react';

import { useMediaQuery } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';

import { dark, light } from '../styles/global';

interface Pages {
  pageId: string;
  pageUrl: string;
}

// dark = false, light = true
interface MuiThemeContextData {
  theme: boolean;
  handleThemeChange(theme: boolean): void;
}

const MuiThemeContext = createContext<MuiThemeContextData>(
  {} as MuiThemeContextData
);

const MuiThemeProvider: React.FC = ({ children }) => {
  const lightThemeMode = useMediaQuery('(prefers-color-scheme: light)');

  // Dark theme state
  const [theme, setTheme] = useState(lightThemeMode);

  useEffect(() => {
    setTheme(lightThemeMode);
  }, [lightThemeMode]);

  /**
   * Function to change the theme, between light and dark,based on OS preference
   */
  function handleThemeChange(theme: boolean) {
    setTheme(theme);
  }

  return (
    <ThemeProvider
      theme={
        theme
          ? createTheme(light as ThemeOptions)
          : createTheme(dark as ThemeOptions)
      }
    >
      <MuiThemeContext.Provider value={{ theme: theme, handleThemeChange }}>
        {children}
      </MuiThemeContext.Provider>
    </ThemeProvider>
  );
};

function useMuiTheme(): MuiThemeContextData {
  const context = useContext(MuiThemeContext);

  if (!context) {
    throw new Error('Use MuiTheme must be used within a MuiThemeProvider');
  }

  return context;
}

export { useMuiTheme, MuiThemeProvider };
