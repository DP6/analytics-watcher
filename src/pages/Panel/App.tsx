import React from 'react';
import Routes from './routes'

import { CssBaseline } from '@mui/material';
import AppProvider from './context';
import Navbar from './components/Navbar';

function App() {
  return (
    <AppProvider>
      <Navbar />
      <Routes />
      <CssBaseline />
    </AppProvider >
  );
}

export default App;
