import React from 'react';

import AppProvider from './context';

import ListPages from './pages/ListPages';

/** Main component with <Navbar> and <HitList> */
function App() {
  return (
    <AppProvider>
      <ListPages />
    </AppProvider>
  );
}

export default App;
