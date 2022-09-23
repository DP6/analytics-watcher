import React, { useEffect, useRef, useState, ChangeEvent } from 'react';

import { useMediaQuery, Divider, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';

import Navbar from './components/Navbar';
import HitAccordion from './components/HitAccordion';
import ActionsBar from './components/ActionsBar';
import PaginationBar from './components/PaginationBar';

import * as RW from './utils/3.hitParser';
import validateHit from './utils/4.hitValidation';

import { dark, light } from './styles/global';

/** Main component with <Navbar> and <HitList> */
function App() {
  // Check if OS is set to dark theme
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // Dark theme state
  const [isDarkTheme, setIsDarkTheme] = useState(prefersDarkMode);

  // Map with all hits {hit_id: {hit_parameters}}
  const [hit, setHit] = useState<QueryString[]>([]);
  const [hitList, setHitList] = useState<HitList[]>([]);

  // JSON schema used for validation
  const [statusValidation, setStatusValidation] =
    useState<StatusInterface>('success');
  const [messageValidation, setMSessageValidation] = useState<string>();
  const [dataLayerSchema, setDataLayerSchema] = useState({
    fileName: '',
    schema: {},
  });
  const dataLayerSchemaRef = useRef({
    fileName: '',
    schema: {},
  });
  dataLayerSchemaRef.current = dataLayerSchema;

  // State of fileErrorDialog
  const [schemaDialogOpen, setSchemaDialogOpen] = useState(false);

  // State of fileErrorDialog
  const [fileErrorDialogOpen, setFileErrorDialogOpen] = useState(false);

  // Pagination
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 30,
  });

  // Dark theme state
  const [filters, setFilters] = useState({
    // Whether the searchbar is open or closed
    searchBarActive: false,

    // Text inputed in searchbar
    searchedText: '',

    // Whether the filterButtons are displayed or not
    filterListActive: true,

    // Array with hitType filters applied (eg. ['analytics4', 'pageview', 'appview', 'event'])
    filterButtons: [] as string[],

    // Array with validation status filters applied (eg. ['SUCCESS', 'WARNING', 'ERROR'])
    filterStatus: [] as string[],
  });

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
   * Returns de number of hits with the specified 'status', or the total, if 'status' is not provided.
   *
   * @param  status  Status to consider. Set to undefined to count all hits.
   */
  function getValidationIndicators(status?: string) {
    let total = hitList.length;

    if (status) {
      total = Array.from(hitList.values()).filter(
        item => item.validationStatus === status
      ).length;
    }

    return total;
  }

  /**
   * Filters displayed hits, based on active filterButtons.
   *
   * @param  hitListArray Array with hits parameters.
   */
  function filterHitsByType(hitListArray: any[]) {
    // no filterButtons
    if (filters.filterButtons.length === 0) {
      return hitListArray;
    } else {
      return hitListArray.filter(item =>
        filters.filterButtons.includes(item.hitType)
      );
    }
  }

  /**
   * Filters displayed hits, based on searched text.
   *
   * @param  hitListArray Array with hits parameters.
   */
  function filterHitsBySearchText(hitListArray: any[]) {
    if (filters.searchedText === '') {
      // No text input
      return hitListArray;
    } else {
      // With text
      return (
        hitListArray
          // .filter((obj) => Object.values(obj.hitParameters as { [key: string]: string }).includes(filters.searchedText.toLowerCase())) // Exact match
          .filter(obj =>
            Object.values(obj.hitParameters as { [key: string]: string }).some(
              val =>
                val.toLowerCase().includes(filters.searchedText.toLowerCase())
            )
          )
      );
    }
  }

  /**
   * Filters displayed hits, based on active status filtered.
   *
   * @param  hitListArray  Array of hits parameters to filter.
   */
  function filterHitsByStatus(hitListArray: any[]) {
    if (filters.filterStatus.length > 0) {
      return hitListArray.filter(item =>
        filters.filterStatus.includes(item.validationStatus)
      );
    } else {
      return hitListArray;
    }
  }

  /**
   * Filters displayed hits, based on pagination.
   *
   * @param  hitListArray  Array of hits parameters to filter.
   */
  function filterHitsByPage(hitListArray: any[]) {
    return hitListArray.slice(
      (pagination.currentPage - 1) * pagination.pageSize,
      pagination.currentPage * pagination.pageSize
    );
  }

  /**
   * Changes pagination.
   *
   * @param  event  Change event.
   */
  function changePagination(event: ChangeEvent<HTMLSelectElement>) {
    setPagination({
      currentPage: 1,
      pageSize: parseInt(event.target.value),
    });
  }

  /**
   * Handles JSON file upload.
   *
   * @param  event     Change event.
   */
  function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
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
   * Changes pagination page.
   *
   * @param  event     Change event.
   * @param  value     New page number to set.
   */
  function handlePageChange(event: ChangeEvent<unknown>, value: number) {
    setPagination({
      ...pagination,
      currentPage: value,
    });
  }

  /**
   * After component mounts hook.
   */
  useEffect(() => {
    // Restrict to current tab
    chrome.devtools.network.onRequestFinished.addListener(data => {
      const { request } = data;
      if (
        !request.url.match(
          /.(google-analytics.com|analytics.google.com)(\/.)?\/collect.*$/
        )
      )
        return null;

      const { queryString } = request;
      setHit(queryString);
    });
  }, []);

  useEffect(() => {
    if (hit.length > 0) {
      const queryStringFormatted = hit.reduce<Record<string, string>>(
        (obj, item) => {
          obj[item.name] = item.value;
          return obj;
        },
        {} as Record<string, string>
      );

      const teste = {
        requiredParametersToCheck: [],
        hitType: '',
      };
      if (queryStringFormatted.tid.match(/UA\-/)) {
        Object.assign(teste, {
          requiredParametersToCheck: ['all', queryStringFormatted.t],
          hitType: queryStringFormatted.t,
        });
      }
      if (queryStringFormatted.tid.match(/G\-/)) {
        Object.assign(teste, {
          requiredParametersToCheck: ['analytics4'],
          hitType: 'analytics4',
        });
      }

      const validation = async () => {
        const data = await validateHit(
          dataLayerSchemaRef.current.schema,
          teste.requiredParametersToCheck,
          queryStringFormatted
        );
        return data;
      };

      validation().then(data => {
        setStatusValidation(data.status);
        setMSessageValidation(data.message);
      });

      // Decode contentTitle
      const contentTitle = RW.decode(
        queryStringFormatted.en
          ? queryStringFormatted.en
          : queryStringFormatted.dl
      );

      // Insert new hit info on Analytics Watcher's HTML page
      const newHitList = [
        ...hitList,
        {
          hitParameters: queryStringFormatted,
          validationStatus: statusValidation,
          validationResult: messageValidation,
          contentTitle: contentTitle,
          hitType: teste.hitType,
        },
      ];
      setHitList(newHitList);
    }
  }, [hit]);

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
      <Navbar
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
        filters={filters}
        setFilters={setFilters}
        // removeHit={removeHit}
        // setHitList={setHitList}
        searchBarToggler={searchBarToggler}
        handleFileUpload={handleFileUpload}
      />
      <CssBaseline />
      <Container maxWidth="xl">
        <ActionsBar
          getValidationIndicators={getValidationIndicators}
          // accordionExpandAll={accordionExpandAll}
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
          size={hitList.length}
          page={pagination.currentPage}
          pagination={pagination.pageSize}
          handlePageChange={handlePageChange}
          changePagination={changePagination}
        />
        <Divider sx={{ mt: 0.5, mb: 1 }} />
        {hitList.length > 0 &&
          hitList
            .slice(0)
            .reverse()
            .map((item, index) => {
              return (
                <HitAccordion
                  key={index}
                  hitParameters={item.hitParameters}
                  contentTitle={item.contentTitle}
                  hitTypeIcon={item.hitType}
                  validationStatus={item.validationStatus}
                  validationResult={item.validationResult}
                />
              );
            })}
      </Container>
    </ThemeProvider>
  );
}

export default App;
