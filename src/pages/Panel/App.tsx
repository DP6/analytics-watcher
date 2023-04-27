import React from 'react';
import Routes from './routes';

import { CssBaseline } from '@mui/material';
import AppProvider from './context';
import Navbar from './components/Navbar';
import GTMChecker from './components/Gtmchecker';

function App() {
  return (
    <AppProvider>
      <Navbar />
      <GTMChecker />
      <Routes />
      <CssBaseline />
    </AppProvider>
  );
}

export default App;
