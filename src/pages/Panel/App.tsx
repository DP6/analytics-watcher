import React from 'react';

import { CssBaseline } from '@mui/material';

import AppProvider from './context';

import Header from './components/Header';
import PageList from './pages/PageList';

/** Main component with <Navbar> and <HitList> */
function App() {
  return (
    <AppProvider>
      <Header />
      <PageList />
      <CssBaseline />
    </AppProvider>
  );
}

export default App;
