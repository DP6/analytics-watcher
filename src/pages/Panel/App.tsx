import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import PageList from './pages/PageList';
import AppProvider from './context';

function App() {
  return (
    <AppProvider>
      <CssBaseline />
      <Navbar />
      <PageList />
    </AppProvider>
  );
}

export default App;
