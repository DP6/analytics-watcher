import React from 'react';
import Routes from './routes';

import { CssBaseline } from '@mui/material';
import AppProvider from './context';
import Navbar from './components/Navbar';
import GTMChecker from './components/Gtmchecker';
import FacebookPixelChecker from './components/FacebookPixelChecker';

function App() {
  return (
    <AppProvider>
      <Navbar />
      <GTMChecker />
      <FacebookPixelChecker />
      <Routes />
      <CssBaseline />
    </AppProvider>
  );
}

export default App;
