import React from 'react';
import Routes from './routes'

import { CssBaseline } from '@mui/material';

import AppProvider from './context';

import Header from './components/Header';

/** Main component with <Navbar> and <HitList> */
function App() {
  return (
    <AppProvider>
      <Header />
      <Routes />
      <CssBaseline />
    </AppProvider >
  );
}

export default App;
