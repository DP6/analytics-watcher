import * as React from 'react';

// Material
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  FormGroup,
  Switch,
  TextField,
  Stack,
  Icon,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
} from '@mui/material';

// Icons
import { Delete, FileUpload } from '@mui/icons-material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Filter4Icon from '@mui/icons-material/Filter4';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import AppsIcon from '@mui/icons-material/Apps';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReportIcon from '@mui/icons-material/Report';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SearchIcon from '@mui/icons-material/Search';

import { useMuiTheme } from '../context/MuiTheme';

// Logo DP6
import logoDP6 from '../../../assets/img/logo-dp6.png';

export default function Header() {
  const { handleThemeChange, theme } = useMuiTheme();
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl" sx={{ px: 1 }}>
        <Toolbar disableGutters color="primary">
          <Stack sx={{ mt: 1 }}>
            {/*
            -----------------------------
            DP6 Logo
            -----------------------------
            */}
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
            {/*
            -----------------------------
            Analytics Watcher - small
            -----------------------------
            */}
            {/* <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <Typography variant="body1" sx={{ lineHeight: 1 }}>
                Analytics
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1 }}>
                Watcher
              </Typography>
            </Box> */}
          </Stack>
          {/*
          -----------------------------
          Analytics Watcher -- bigger
          -----------------------------
          */}
          <Box sx={{ display: { xs: 'none', md: 'block' }, ml: 1 }}>
            <Typography variant="h6" sx={{ lineHeight: 1 }}>
              Analytics
            </Typography>
            <Typography variant="h6" sx={{ lineHeight: 1 }}>
              Watcher
            </Typography>
          </Box>

          {/*
          -----------------------------
          Darkmode switch
          -----------------------------
          */}
          <FormGroup sx={{ ml: 1 }}>
            <Stack justifyContent="center" alignItems="center">
              <Typography fontSize="small">Dark</Typography>
              <Switch
                checked={theme}
                onChange={() => handleThemeChange(!theme)}
                color="info"
                size="small"
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
