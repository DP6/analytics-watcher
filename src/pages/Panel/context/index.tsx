import React from 'react';

import { HitListProvider } from './HitList';
import { MuiThemeProvider } from './MuiTheme';

const AppProvider: React.FC = ({ children }) => (
  <MuiThemeProvider>
    <HitListProvider>{children}</HitListProvider>
  </MuiThemeProvider>
);

export default AppProvider;
