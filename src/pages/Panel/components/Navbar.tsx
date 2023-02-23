import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack/Stack';
import Icon from '@mui/material/Icon';
import { useMuiTheme } from '../context/MuiTheme';

// Logo DP6
import logoDP6 from '../../../assets/img/logo-dp6.png';

interface NavbarProps {}

/**
 * Navigation bar.
 *
 * @returns JSX.Element
 */
function Navbar(props: NavbarProps) {
  const { theme, setTheme } = useMuiTheme();
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl" disableGutters={true} sx={{ px: 1 }}>
        <Toolbar
          disableGutters
          sx={{ zIndex: 'tooltip', color: 'white', mt: 0.7 }}
          color="primary"
        >
          <Stack sx={{ mt: 1 }}>
            {/* ----------- DP6 Logo -----------*/}
            <Icon
              sx={{
                display: 'flex',
                height: '10',
                width: 'inherit',
                align: 'center',
              }}
            >
              <img alt="Logo DP6" src={logoDP6} />
            </Icon>
            {/* ----------- Analytics Watcher - small -----------*/}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <Typography variant="body1" sx={{ lineHeight: 1 }}>
                Analytics
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1 }}>
                Watcher
              </Typography>
            </Box>
          </Stack>
          {/* ----------- Analytics Watcher -- bigger -----------*/}
          <Box sx={{ display: { xs: 'none', md: 'block' }, ml: 1 }}>
            <Typography variant="h6" sx={{ lineHeight: 1 }}>
              Analytics
            </Typography>
            <Typography variant="h6" sx={{ lineHeight: 1 }}>
              Watcher
            </Typography>
          </Box>

          <Stack
            direction="row"
            sx={{ display: 'flex', flexWrap: 'wrap' }}
          ></Stack>
          {/* ----------- Darkmode switch -----------*/}
          <FormGroup sx={{ ml: 1 }}>
            <Stack justifyContent="center" alignItems="center">
              <Typography fontSize="small">Dark</Typography>
              <Switch
                checked={!theme}
                color="info"
                size="small"
                onChange={() => setTheme(!theme)}
              />
            </Stack>
          </FormGroup>
        </Toolbar>
      </Container>
      <Box
        sx={{
          mt: 1,
          width: '100%',
          height: 5,
          background:
            'linear-gradient(to right, #C0143C, #FD4239, #007A94, #007A94)',
        }}
      />
    </AppBar>
  );
}
export default Navbar;
