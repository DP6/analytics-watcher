import * as React from 'react';

// Material
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack/Stack';
import Link from '@mui/material/Link';

// Icons
import logoDP6 from '../../assets/img/Logo Oficial SemAssinatura Negativo SemBox RGB_025mp.png';

const theme = {
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Ubuntu Bold 700',
  },
};

function Popup() {
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        sx={{ backgroundColor: '#282c34', py: 2 }}
      >
        <Container sx={{ height: '100%' }}>
          <Box>
            <Stack sx={{ mt: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <img src={logoDP6} height="35%" width="35%" alt="logo" />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                Analytics Watcher
              </Typography>
              <Box>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  To access it:
                </Typography>
                <ol>
                  <li>
                    Open DevTools (right click on page, then select "inspect")
                  </li>
                  <li>Click on Analytics Watcher panel tab</li>
                </ol>
                <Link
                  href="https://github.com/DP6/analytics-watcher"
                  component="a"
                  color="primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Analytics Wacther Github
                </Link>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
export default Popup;
