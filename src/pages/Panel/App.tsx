import React from 'react';

import { Box, CssBaseline } from '@mui/material';

import AppProvider from './context';

import Header from './components/Header';
import Home from './pages/Home';
import PageList from './pages/PageList';

/** Main component with <Navbar> and <HitList> */
function App() {
  return (
    <AppProvider>
      <Header />
      <Box sx={{ mx: 10 }}>
        <Home />
      </Box>
      <CssBaseline />
    </AppProvider>
  );
}

export default App;
