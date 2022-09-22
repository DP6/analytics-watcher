import React, { useEffect, useRef, useState } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Divider from '@mui/material/Divider';

import Navbar from './components/Navbar';
import HitAccordion from './components/HitAccordion';
import ActionsBar from './components/ActionsBar';
import PaginationBar from './components/PaginationBar';

import { commonRules } from './utils/1.rules';
import * as RW from './utils/3.hitParser';
import validateHit, { StatusInterface } from './utils/4.hitValidation';


// --------------------------------------------------------
// Theme
// --------------------------------------------------------
const paleta_dp6 = {
    // Principais - vermelho
    'Orange Red Crayola': '#FD4239',
    'Amaranth': '#E70F47',
    'Red NCS': '#BE0F34',

    // Principais - Verde
    'Sky Blue Crayola': '#14E0F8',
    // 'Sky Blue Crayola': '#14E0F8',
    'PAcific Blue': '#00C0D9',
    'Mettalic Seaweed': '#007A94',
    'Midnight Dream': '#004054',

    // Neutras e omplementares
    'Manatee': '#979BA3',
    'Black Coral': '#5B626C',
    'Charcoal': '#3C3F48',
    'Rich Black': '#091923',

    // Tons pastéis
    'Linen': '#FFF4E8',
    'Melon': '#FFCBBB',
    'Smoothie': '#FFCCD7',
    'Celeste': '#BEF9FF',
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
        fontFamily: 'Ubuntu Bold 700'
    }
};

const dark = {
    palette: {
        mode: 'dark',
    },
    typography: {
        fontFamily: 'Ubuntu Bold 700'
    }
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
    const [hitList, setHitList] = useState(new Map() as Map<number, any>);

    // State of fileErrorDialog
    const [schemaDialogOpen, setSchemaDialogOpen] = React.useState(false);

    // State of fileErrorDialog
    const [fileErrorDialogOpen, setFileErrorDialogOpen] = React.useState(false);

    // Pagination
    const [pagination, setPagination] = React.useState({
        currentPage: 1,
        pageSize: 30
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

    // JSON schema used for validation
    const [dataLayerSchema, setDataLayerSchema] = useState({
        fileName: '',
        schema: {}
    });

    const dataLayerSchemaRef = useRef({
        fileName: '',
        schema: {}
    });
    dataLayerSchemaRef.current = dataLayerSchema;


    /**
    * Handle accordion state (expanded or not)
    *
    * @param  hitKey  Hit key
    */
    function handleAccordionChange(hitKey: number) {
        // Copy hitList object state
        let newHitList = new Map(hitList);

        // Toggle the expanded attribute of the hit
        newHitList.set(hitKey, { ...newHitList.get(hitKey), expanded: !newHitList.get(hitKey)!.expanded });

        // Update state
        setHitList(newHitList);
    };


    /**
    * Toggles the search bar (open or closed)
    */
    function searchBarToggler() {
        // Toggle the filterButtons
        let filterListActive = filters.filterListActive;
        if ((filters.searchBarActive) && (!filters.filterListActive)) {
            filterListActive = true;
        } else if ((!filters.searchBarActive) && (filters.filterListActive)) {
            filterListActive = false;
        }

        // Update state
        setFilters({
            ...filters,
            filterListActive: filterListActive,
            searchBarActive: !filters.searchBarActive,
            searchedText: ''
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

        // Update state
        setHitList(newHitList);
    }


    /**
    * Returns de number of hits with the specified 'status', or the total, if 'status' is not provided.
    *
    * @param  status  Status to consider. Set to undefined to count all hits.
    */
    function getValidationIndicators(status?: string) {
        let total = hitList.size;

        if (status) {
            total = Array.from(hitList.values())
                .filter(item => item.validationStatus === status)
                .length;
        };

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
            return hitListArray
                .filter(item => filters.filterButtons.includes(item.hitType));
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
            return hitListArray
                // .filter((obj) => Object.values(obj.hitParameters as { [key: string]: string }).includes(filters.searchedText.toLowerCase())) // Exact match
                .filter((obj) => Object.values(obj.hitParameters as { [key: string]: string }).some(val => val.toLowerCase().includes(filters.searchedText.toLowerCase())));
        }
    }


    /**
    * Filters displayed hits, based on active status filtered.
    *
    * @param  hitListArray  Array of hits parameters to filter.
    */
    function filterHitsByStatus(hitListArray: any[]) {
        if (filters.filterStatus.length > 0) {
            return hitListArray.filter(item => filters.filterStatus.includes(item.validationStatus));
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
        return hitListArray.slice((pagination.currentPage - 1) * pagination.pageSize, pagination.currentPage * pagination.pageSize);
    }


    /**
    * Changes pagination.
    *
    * @param  event  Change event.
    */
    function changePagination(event: React.ChangeEvent<HTMLSelectElement>) {
        setPagination({
            currentPage: 1,
            pageSize: parseInt(event.target.value)
        });
    }


    /**
    * Generate array of <Hit/> components
    */
    function renderHits() {
        // Reverse hitList array
        let hitListArray = Array.from(hitList.values()).reverse();

        // Array of filtered hits parameters
        hitListArray = filterHitsByType(hitListArray);
        hitListArray = filterHitsBySearchText(hitListArray);
        hitListArray = filterHitsByStatus(hitListArray);
        hitListArray = filterHitsByPage(hitListArray);

        // Array of <Hit/> components
        const renderedHitsArray = hitListArray.map((hit) => {
            return (
                <HitAccordion
                    hitParameters={hit.hitParameters}
                    contentTitle={hit.contentTitle}
                    hitTypeIcon={hit.hitType}
                    hitListKey={hit.hitListKey}
                    removeHit={removeHit}
                    key={hit.hitListKey}
                    expanded={hit.expanded}
                    handleAccordionChange={handleAccordionChange}
                    validationStatus={hit.validationStatus}
                    validationResult={hit.validationResult}
                />
            );
        });
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
        reader.onload = (evt) => {

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
    };


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
    };


    /**
    * After component mounts hook.
    */
    useEffect(() => {

        /**
        * Requests listener
        */
        function requestListener() {

            // Restrict to current tab
            chrome.tabs.query({ active: true }, function (tab) {

                // Add listener
                chrome.webRequest.onBeforeRequest.addListener(
                    function (details) {
                        if (details.url.match(/.(google-analytics.com|analytics.google.com)(\/.)?\/collect.*$/)) {

                            initParser(
                                details.url,
                                details.method,
                                details.requestBody,
                                details.initiator ? details.initiator : ''
                            );
                        }
                    },
                    {
                        urls: ['<all_urls>'],
                        tabId: chrome.devtools.inspectedWindow.tabId
                    },
                    ['requestBody']
                );
            });
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
        function initParser(url: string, method: string, requestBody: chrome.webRequest.WebRequestBody | null, initiator: string) {

            // Ignore requests comming from chrome extensions
            if (initiator.includes('chrome-extension://')) return;

            // Return void if requested url doesn't fit UA or GA4 patterns
            if (!commonRules.universal_analytics(url) && !commonRules.analytics4(url)) {
                return;
            }

            if (url.includes('v=1')) {
                // UA handler
                handler(url, '', false);

            } else if (url.includes('v=2')) {
                // GA4 handler
                handler(url, '', true);

            } else {
                // Measurement Protocol

                let ga4: boolean = false;

                // Checks if GA4
                if (url.includes('/mp/collect')) {
                    ga4 = true;
                };

                // For each line in requestBody:
                //   Decodes Uint8Array array (from ArrayBuffer) into string
                //   Call handler function
                requestBody?.raw?.map(function (data) {
                    return String.fromCharCode.apply(null, Array.from<number>(new Uint8Array(data.bytes!)));
                })
                    .forEach((row) => handler(url, row, ga4));
            }
        }

        /**
        * Handle method to add new hit
        *
        * @param  url          URL
        * @param  queryString  Query string
        * @param  ga4          True if it's a GA4 hit. False if it's a UA hit.
        */
        async function handler(url: string, queryString: string, ga4: boolean) {

            // Identify queryString, if empty
            if (queryString === '') {
                if (url.includes('?')) {
                    queryString = url.slice(url.indexOf('?') + 1);
                } else return;
            };

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

                [validationStatus, validationResult] = await validateHit(dataLayerSchemaRef.current.schema, requiredParametersToCheck, params);

            } else {
                // UA events

                // set contentTitle
                contentTitle = RW.setUAContent(params, contentTitle);

                // Required parameters
                requiredParametersToCheck = ['all', params.t];

                [validationStatus, validationResult] = await validateHit(dataLayerSchemaRef.current.schema, requiredParametersToCheck, params);
            }

            // Decode contentTitle
            contentTitle = RW.decode(contentTitle);

            // Hit type
            let hitType;
            if (ga4) {
                hitType = 'analytics4';
            } else {
                hitType = params.t;
            };

            // Insert new hit info on Analytics Watcher's HTML page
            addNewHit(
                params,
                validationStatus,
                validationResult,
                contentTitle,
                hitType,
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
        function addNewHit(hitParameters: { [key: string]: string }, validationStatus: StatusInterface, validationResult: any[], contentTitle: string, hitType: string) {

            setHitList(oldHitList => {
                // Generate hitListKey = biggest key + 1
                let hitListKey = oldHitList.size > 0 ? Math.max(...oldHitList.keys()) + 1 : 0;

                // Append new hit on hitList
                return new Map(oldHitList.set(hitListKey,
                    {
                        hitParameters: hitParameters,
                        validationStatus: validationStatus,
                        validationResult: validationResult,
                        contentTitle: contentTitle,
                        hitType: hitType,
                        hitListKey: hitListKey,
                        expanded: false,
                    }
                ));
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
        <ThemeProvider theme={isDarkTheme ? createTheme(dark as ThemeOptions) : createTheme(light as ThemeOptions)} >
            <CssBaseline />
            <Navbar
                isDarkTheme={isDarkTheme}
                setIsDarkTheme={setIsDarkTheme}
                filters={filters}
                setFilters={setFilters}
                removeHit={removeHit}
                setHitList={setHitList}
                searchBarToggler={searchBarToggler}
                handleFileUpload={handleFileUpload}
            />
            <ActionsBar
                getValidationIndicators={getValidationIndicators}
                accordionExpandAll={accordionExpandAll}
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
                size={hitList.size}
                page={pagination.currentPage}
                pagination={pagination.pageSize}
                handlePageChange={handlePageChange}
                changePagination={changePagination}
            />
            <Divider sx={{ mt: 0.5, mb: 1 }} />
            {renderHits()}
        </ThemeProvider >
    );
}


export default App;
