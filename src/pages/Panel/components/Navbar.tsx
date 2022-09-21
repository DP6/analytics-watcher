import * as React from 'react';

// Material
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack/Stack';

// Icons
import Icon from '@mui/material/Icon';
import DeleteIcon from '@mui/icons-material/Delete';
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

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

// Logo DP6
import logoDP6 from '../../../assets/img/Logo Oficial SemAssinatura Negativo SemBox RGB_025mp.png';

import { HitModel } from '../models/HitModel';

// --------------------------------------------------------
// Navbar
// --------------------------------------------------------
interface NavbarProps {
  isDarkTheme: boolean;
  setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  filters: {
    searchBarActive: boolean;
    searchedText: string;
    filterListActive: boolean;
    filterButtons: string[];
    filterStatus: string[];
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      searchBarActive: boolean;
      searchedText: string;
      filterListActive: boolean;
      filterButtons: string[];
      filterStatus: string[];
    }>
  >;

  setHitList: React.Dispatch<React.SetStateAction<HitModel>>;
  searchBarToggler: () => void;

  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Navigation bar.
 *
 * @param props.isDarkTheme     Whether is dark theme or not.
 * @param props.setIsDarkTheme  Dark theme setter function.
 * @param props.filters     Filters applied.
 * @param props.setFilters  Filters setter function.
 * @param props.setHitList  HitList setter function.
 * @param props.searchBarToggler    Search bar toggler function.
 * @param  props.handleFileUpload     Function that handles JSON schema file.
 * @return      JSX.Element
 */
function Navbar(props: NavbarProps) {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl" disableGutters={true} sx={{ px: 1 }}>
        <Toolbar
          disableGutters
          sx={{ zIndex: 'tooltip', color: 'white', mt: 0.7 }}
          color="primary"
        >
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
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <Typography variant="body1" sx={{ lineHeight: 1 }}>
                Analytics
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1 }}>
                Watcher
              </Typography>
            </Box>
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
                    Toggle buttons list
                    -----------------------------
                    */}
          <ToggleButton
            aria-label="Toggle filter buttons"
            title="Toggle filters"
            value="Filters"
            sx={{ borderRadius: 3, color: 'blue', mx: 1, p: 1 }}
            selected={props.filters.filterListActive}
            onClick={() =>
              props.setFilters({
                ...props.filters,
                filterListActive: !props.filters.filterListActive,
              })
            }
          >
            <FilterListIcon fontSize="small" sx={{ color: 'white' }} />
          </ToggleButton>
          {/*
                    -----------------------------
                    Filter buttons
                    -----------------------------
                    */}
          <>
            {props.filters.filterListActive && (
              <ToggleButtonGroup
                value={props.filters.filterButtons}
                onChange={(
                  event: React.MouseEvent<HTMLElement, MouseEvent>,
                  value: string[]
                ) =>
                  props.setFilters({ ...props.filters, filterButtons: value })
                }
                aria-label="text formatting"
                size="small"
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  border: 1,
                  borderRadius: 3,
                }}
                color="warning"
              >
                <ToggleButton
                  aria-label="Toggle GA 4 filter"
                  title="GA 4"
                  value="analytics4"
                  sx={{ color: 'inherit' }}
                >
                  <Filter4Icon fontSize="small" />
                </ToggleButton>
                <ToggleButton
                  aria-label="Toggle Pageview filter"
                  title="Pageview"
                  value="pageview"
                  sx={{ color: 'inherit' }}
                >
                  <FindInPageIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton
                  aria-label="Toggle App View filter"
                  title="App View"
                  value="appview"
                  sx={{ color: 'inherit' }}
                >
                  <AppsIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton
                  aria-label="Toggle Event filter"
                  title="Event"
                  value="event"
                  sx={{ color: 'inherit' }}
                >
                  <FlashOnIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton
                  aria-label="Toggle Timing filter"
                  title="Timing"
                  value="timing"
                  sx={{ color: 'inherit' }}
                >
                  <TimelapseIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton
                  aria-label="Toggle Social filter"
                  title="Social"
                  value="social"
                  sx={{ color: 'inherit' }}
                >
                  <ShareIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton
                  aria-label="Toggle Item filter"
                  title="Item"
                  value="item"
                  sx={{ color: 'inherit' }}
                >
                  <ShoppingBasketIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton
                  aria-label="Toggle Transaction filter"
                  title="Transaction"
                  value="transaction"
                  sx={{ color: 'inherit' }}
                >
                  <MonetizationOnIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton
                  aria-label="Toggle Exception filter"
                  title="Exception"
                  value="exception"
                  sx={{ borderRadius: 3, color: 'inherit' }}
                >
                  <ReportIcon fontSize="small" />
                </ToggleButton>
              </ToggleButtonGroup>
            )}
          </>
          <Stack direction="row" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {/*
                        -----------------------------
                        Clear filters
                        -----------------------------
                        */}
            <ToggleButton
              aria-label="Clear Filters"
              title="Clear Filters"
              value="clear-filters"
              sx={{ borderRadius: 3, ml: 1, p: 1 }}
              onClick={() =>
                props.setFilters({
                  ...props.filters,
                  filterButtons: [],
                  searchedText: '',
                })
              }
            >
              <ClearAllIcon fontSize="small" sx={{ color: 'white' }} />
            </ToggleButton>
            {/*
                        -----------------------------
                        Delete all hits
                        -----------------------------
                        */}
            <ToggleButton
              aria-label="Clear Report"
              title="Clear Report"
              value="clear-report"
              sx={{ borderRadius: 3, ml: 1, p: 1 }}
              onClick={() =>
                props.setHitList(oldHitList => {
                  let newhitList = new HitModel(oldHitList);
                  newhitList.removeData();
                  return newhitList;
                })
              }
            >
              <DeleteIcon fontSize="small" sx={{ color: 'white' }} />
            </ToggleButton>
            {/*
                        -----------------------------
                        Searchbar toggler
                        -----------------------------
                        */}
            <ToggleButton
              aria-label="Search"
              title="Search"
              value="search"
              sx={{ borderRadius: 3, ml: 1, p: 1 }}
              onClick={() => props.searchBarToggler()}
            >
              <SearchIcon fontSize="small" sx={{ color: 'white' }} />
            </ToggleButton>
            {/*
                        -----------------------------
                        Searchbar
                        -----------------------------
                        */}
            <>
              {props.filters.searchBarActive && (
                <TextField
                  id="outlined-search"
                  label={
                    <Typography fontSize="small" sx={{ color: 'white' }}>
                      Search
                    </Typography>
                  }
                  type="search"
                  color="info"
                  // focused
                  size="small"
                  InputProps={{
                    style: { color: 'white', borderColor: 'red' },
                  }}
                  value={props.filters.searchedText}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    props.setFilters({
                      ...props.filters,
                      searchedText: event.target.value,
                    })
                  }
                  sx={{
                    // https://smartdevpreneur.com/override-textfield-border-color-in-material-ui/
                    '& .MuiOutlinedInput-root': {
                      '& > fieldset': { borderColor: 'white' },
                    },
                    ml: 1,
                  }}
                />
              )}
            </>
            {/*
                        -----------------------------
                        Upload Button
                        -----------------------------
                        */}
            {/* <ToggleButton
                        {/* <Box >
                            <IconButton
                                aria-label="upload JSON chema"
                                component="label"
                                sx={{ border: 1, borderRadius: 3, borderColor: 'rgba(255, 255, 255, 0.12)', ml: 1, p: 1 }}
                                title='Upload JSON Schema'
                            >
                                <input hidden type="file" onChange={props.handleFileUpload} />
                                <FileUpload fontSize='small' sx={{ color: 'white' }} />
                            </IconButton>
                        </Box> */}
          </Stack>
          {/*
                    -----------------------------
                    Darkmode switch
                    -----------------------------
                    */}
          <FormGroup sx={{ ml: 1 }}>
            <Stack justifyContent="center" alignItems="center">
              <Typography fontSize="small">Dark</Typography>
              <Switch
                checked={props.isDarkTheme}
                color="info"
                size="small"
                onChange={(
                  event: React.ChangeEvent<HTMLInputElement>,
                  checked: boolean
                ) => props.setIsDarkTheme(checked)}
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
