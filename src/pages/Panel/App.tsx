import React, { useEffect, useRef, useState } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Divider from '@mui/material/Divider';

import Navbar from './components/Navbar';
import ActionsBar from './components/ActionsBar';
import PaginationBar from './components/PaginationBar';

import { commonRules } from './utils/1.rules';
import * as RW from './utils/3.hitParser';
import validateHit, { StatusInterface } from './utils/4.hitValidation';

import { HitModel } from './models/HitModel';
import HitAccordion from './components/HitAccordion';

// --------------------------------------------------------
// Theme
// --------------------------------------------------------
const paleta_dp6 = {
  // Principais - vermelho
  'Orange Red Crayola': '#FD4239',
  Amaranth: '#E70F47',
  'Red NCS': '#BE0F34',

  // Principais - Verde
  'Sky Blue Crayola': '#14E0F8',
  // 'Sky Blue Crayola': '#14E0F8',
  'PAcific Blue': '#00C0D9',
  'Mettalic Seaweed': '#007A94',
  'Midnight Dream': '#004054',

  // Neutras e omplementares
  Manatee: '#979BA3',
  'Black Coral': '#5B626C',
  Charcoal: '#3C3F48',
  'Rich Black': '#091923',

  // Tons pastéis
  Linen: '#FFF4E8',
  Melon: '#FFCBBB',
  Smoothie: '#FFCCD7',
  Celeste: '#BEF9FF',
  'Blizzard Blue': '#BDF0FF',
  'Alice blue': '#E4EAF1',
};

const light = {
  palette: {
    primary: {
      main: paleta_dp6['Midnight Dream'],
    },
    mode: 'light',
  },
  typography: {
    fontFamily: 'Ubuntu Bold 700',
  },
};

const dark = {
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Ubuntu Bold 700',
  },
};

// --------------------------------------------------------
// App - App with all components
// --------------------------------------------------------

/** Main component with <Navbar> and <HitList> */
function App() {
  // Check if OS is set to dark theme
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // Dark theme state
  const [isDarkTheme, setIsDarkTheme] = useState(prefersDarkMode);

  // Map with all hits {hit_id: {hit_parameters}}
  const [hitList, setHitList] = useState(new HitModel());

  // State of fileErrorDialog
  const [schemaDialogOpen, setSchemaDialogOpen] = React.useState(false);

  // State of fileErrorDialog
  const [fileErrorDialogOpen, setFileErrorDialogOpen] = React.useState(false);

  // Pagination
  const [pagination, setPagination] = React.useState({
    currentPage: 1,
    pageSize: 30,
  });

  // Update state
  setHitList(newHitList);
}

/**
 * Toggles the search bar (open or closed)
 */
function searchBarToggler() {
  // Toggle the filterButtons
  let filterListActive = filters.filterListActive;
  if (filters.searchBarActive && !filters.filterListActive) {
    filterListActive = true;
  } else if (!filters.searchBarActive && filters.filterListActive) {
    filterListActive = false;
  }

  // Update state
  setFilters({
    ...filters,
    filterListActive: filterListActive,
    searchBarActive: !filters.searchBarActive,
    searchedText: '',
  });
}

/**
 * Remove a hit from hitList if 'hitKey' is specified. Otherwise remove all hits.
 *
 * @param  hitKey  Hit key to delete
 */
function removeHit(hitKey?: number) {
  if (hitKey) {
    // Copy hitList object state
    let newHitList = new Map(hitList);

    // Delete hit
    newHitList.delete(hitKey);

    // Update state
    setHitList(newHitList);
  } else {
    // Remnove all hits
    setHitList(new Map());

    // Set pagination to page one.
    setPagination({
      ...pagination,
      currentPage: 1,
    });
  }
}

/**
 * Expands or Collapses all accordions
 *
 * @param  expand  Wheter to expand (true) or collapse (false) all the accordions
 */
function accordionExpandAll(expand: boolean) {
  // // Copy accordionsExpanded object state
  let newHitList = new Map(hitList);

  // Update all accordions
  newHitList.forEach((value, key) => {
    newHitList.set(key, { ...newHitList.get(key), expanded: expand });
  });
  dataLayerSchemaRef.current = dataLayerSchema;

  /**
   * Toggles the search bar (open or closed)
   */
  function searchBarToggler() {
    // Toggle the filterButtons
    let filterListActive = filters.filterListActive;
    if (filters.searchBarActive && !filters.filterListActive) {
      filterListActive = true;
    } else if (!filters.searchBarActive && filters.filterListActive) {
      filterListActive = false;
    }

    // Update state
    setFilters({
      ...filters,
      filterListActive: filterListActive,
      searchBarActive: !filters.searchBarActive,
      searchedText: '',
    });
  }

  /**
   * Changes pagination.
   *
   * @param  event  Change event.
   */
  function changePagination(event: React.ChangeEvent<HTMLSelectElement>) {
    setPagination({
      currentPage: 1,
      pageSize: parseInt(event.target.value),
    });
  }

  /**
   * Changes pagination page.
   *
   * @param  event     Change event.
   * @param  value     New page number to set.
   */
  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setPagination({
      ...pagination,
      currentPage: value,
    });
  }

  /**
   * Generate array of <Hit/> components
   * @return {JSX.Element[]} Array of <HitAccordion>
   */
  function renderHits(): JSX.Element[] {
    let filteredHitList = hitList
      .reverse()
      .filteredData(
        filters.filterButtons,
        filters.searchedText,
        filters.filterStatus,
        pagination
      );

    const renderedHitsArray = [...filteredHitList.dataMap.values()].map(
      (entry, index) => {
        return (
          <HitAccordion
            hitParameters={entry.hitParameters}
            contentTitle={entry.contentTitle}
            hitTypeIcon={entry.hitType}
            hitListKey={entry.hitKey}
            setHitList={setHitList}
            key={entry.hitKey}
            expanded={entry.expanded}
            validationStatus={entry.validationStatus}
            validationResult={entry.validationResult}
          />
        );
      }
    );
    return renderedHitsArray;
  }

  /**
   * Handles JSON file upload.
   *
   * @param  event     Change event.
   */
  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    // Return if no file
    if (!event.target.files) {
      return;
    }

    // File reader
    const reader = new FileReader();
    reader.onload = evt => {
      // Return if no result
      if (!evt?.target?.result) {
        return;
      }

      // Tries to parse json
      try {
        // Parse JSON
        let schema = JSON.parse(JSON.parse(JSON.stringify(evt.target.result)));

        // Update state
        setDataLayerSchema({ fileName: file.name, schema: schema });
      } catch (err) {
        setFileErrorDialogOpen(true);
      }
    };

    // File
    const file = event.target.files[0];

    // Read file
    reader.readAsBinaryString(file);

    // Remove <input> value, so a file with the same name can be reuploaded
    event.target.value = '';
  }

  /**
   * After component mounts hook.
   */
  useEffect(() => {
    /**
     * Requests listener
     */
    function requestListener() {
      // Add listener
      chrome.webRequest.onBeforeRequest.addListener(
        function (details) {
          if (
            details.url.match(
              /.(google-analytics.com|analytics.google.com|google.analytics.com)(\/.)?\/collect.*$/
            )
          ) {
            // console.log({ details });

            initParser(
              details.url,
              details.method,
              details.requestBody,
              details.initiator ? details.initiator : '',
              undefined
            );
          }
        },
        {
          urls: ['<all_urls>'],
          tabId: chrome.devtools.inspectedWindow.tabId,
        },
        ['requestBody', 'extraHeaders']
      );
    }

    /**
     * Start the handler
     *
     * @param  url          URL
     * @param  method       HTTP Method
     * @param  requestBody  Body of request
     * @param  initiator    The origin where the request was initiated.
     * @return              Void or string ...
     */
    function initParser(
      url: string,
      method: string,
      requestBody: chrome.webRequest.WebRequestBody | null,
      initiator: string,
      favIconUrl: string | undefined
    ) {
      // Ignore requests comming from chrome extensions
      if (initiator.includes('chrome-extension://')) return;

      // Return void if requested url doesn't fit UA or GA4 patterns
      if (
        !commonRules.universal_analytics(url) &&
        !commonRules.analytics4(url)
      ) {
        return;
      }

      if (url.includes('v=1&') || url.includes('&v=1')) {
        // UA handler
        handler(url, '', false, initiator, favIconUrl);
      } else if (url.includes('v=2&') || url.includes('&v=2')) {
        // GA4 handler
        handler(url, '', true, initiator, favIconUrl);
      } else {
        // Measurement Protocol

        let ga4: boolean = false;

        // Checks if GA4
        if (url.includes('/mp/collect')) {
          ga4 = true;
        }

        // For each line in requestBody:
        //   Decodes Uint8Array array (from ArrayBuffer) into string
        //   Call handler function
        requestBody?.raw
          ?.map(function (data) {
            return String.fromCharCode.apply(
              null,
              Array.from<number>(new Uint8Array(data.bytes!))
            );
          })
          .forEach(row => handler(url, row, ga4, initiator, favIconUrl));
      }
    }

    /**
     * Handle method to add new hit
     *
     * @param  url          URL
     * @param  queryString  Query string
     * @param  ga4          True if it's a GA4 hit. False if it's a UA hit.
     */
    async function handler(
      url: string,
      queryString: string,
      ga4: boolean,
      initiator: string,
      favIconUrl: string | undefined
    ) {
      // Identify queryString, if empty
      if (queryString === '') {
        if (url.includes('?')) {
          queryString = url.slice(url.indexOf('?') + 1);
        } else return;
      }

      // Generate object from query string
      let params = RW.queryToObject(queryString);

      // content = Hit/event "title" on Analytics Watcher's HTML page
      let contentTitle = '';

      // Required parameters
      let requiredParametersToCheck;

      let validationStatus: StatusInterface;
      let validationResult: any[];

      if (ga4) {
        // GA4 events

        // set contentTitle
        contentTitle = params.en ? params.en : params.dl;

        // Required parameters
        requiredParametersToCheck = ['analytics4'];

        [validationStatus, validationResult] = await validateHit(
          dataLayerSchemaRef.current.schema,
          requiredParametersToCheck,
          params
        );
      } else {
        // UA events

        // set contentTitle
        contentTitle = RW.setUAContent(params, contentTitle);

        // Required parameters
        requiredParametersToCheck = ['all', params.t];

        [validationStatus, validationResult] = await validateHit(
          dataLayerSchemaRef.current.schema,
          requiredParametersToCheck,
          params
        );
      }

      // Decode contentTitle
      contentTitle = RW.decode(contentTitle);

      // Hit type
      let hitType;
      if (ga4) {
        hitType = 'analytics4';
      } else {
        hitType = params.t;
      }

      // Insert new hit info on Analytics Watcher's HTML page
      addNewHit(
        url,
        params,
        validationStatus,
        validationResult,
        contentTitle,
        hitType,
        initiator,
        favIconUrl
      );
    }

    /**
     * Append new hit information to hitList state
     *
     * @param  hitParameters     Object formed from qery string
     * @param  validationStatus  'error' if missing any "required parameters" or 'ok' otherwise
     * @param  contentTitle      Hit title
     * @param  hitType           Type of hit
     */
    function addNewHit(
      url: string,
      hitParameters: { [key: string]: string },
      validationStatus: StatusInterface,
      validationResult: any[],
      contentTitle: string,
      hitType: string,
      initiator: string,
      favIconUrl: string | undefined
    ) {
      setHitList(oldHitList => {
        let newhitList = new HitModel(oldHitList);
        newhitList.addData({
          hitParameters: hitParameters,
          validationStatus: validationStatus,
          validationResult: validationResult,
          contentTitle: contentTitle,
          hitType: hitType,
          expanded: false,
          url: initiator,
          favIconUrl: favIconUrl ? favIconUrl : '',
        });

        return newhitList;
      });
    }

    // Set up obBeforeRequest listener
    requestListener();
  }, []);

  /**
   * Hook to set up dark theme, based on OS preference
   */
  useEffect(() => {
    setIsDarkTheme(prefersDarkMode);
  }, [prefersDarkMode]);

  return (
    <ThemeProvider
      theme={
        isDarkTheme
          ? createTheme(dark as ThemeOptions)
          : createTheme(light as ThemeOptions)
      }
    >
      <CssBaseline />
      <Navbar
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
        filters={filters}
        setFilters={setFilters}
        // removeHit={removeHit}
        setHitList={setHitList}
        searchBarToggler={searchBarToggler}
        handleFileUpload={handleFileUpload}
      />
      <ActionsBar
        // getValidationIndicators={getValidationIndicators}
        // accordionExpandAll={accordionExpandAll}
        hitList={hitList}
        setHitList={setHitList}
        filters={filters}
        setFilters={setFilters}
        dataLayerSchema={dataLayerSchema}
        setDataLayerSchema={setDataLayerSchema}
        handleFileUpload={handleFileUpload}
        schemaDialogOpen={schemaDialogOpen}
        setSchemaDialogOpen={setSchemaDialogOpen}
        fileErrorDialogOpen={fileErrorDialogOpen}
        setFileErrorDialogOpen={setFileErrorDialogOpen}
      />
      <Divider sx={{ mt: 1, mb: 0.5 }} />
      <PaginationBar
        size={hitList.dataMap.size}
        page={pagination.currentPage}
        pagination={pagination.pageSize}
        handlePageChange={handlePageChange}
        changePagination={changePagination}
      />
      <Divider sx={{ mt: 0.5, mb: 1 }} />
      {renderHits()}
    </ThemeProvider>
  );
}

export default App;
