import React, { useEffect, useState } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import Navbar from './components/Navbar';
import HitAccordion from './components/HitAccordion';
import PanelBar from './components/PanelBar';

import { commonRules } from './utils/1.rules';
import * as RW from './utils/3.hitParser';


// --------------------------------------------------------
// Theme
// --------------------------------------------------------
const cores = {
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
            main: cores['Midnight Dream'],
        },
        // secondary: {
        //     main: '#FFFFFF',
        // },
        // warning: {
        //     main: cores['Orange Red Crayola'],
        // },
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
// App - App with <Navbar> and <HitList>
// --------------------------------------------------------

/** Main component with <Navbar> and <HitList> */
function App() {

    // Check if OS is set to dark theme
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    // Dark theme state
    const [isDarkTheme, setIsDarkTheme] = useState(prefersDarkMode);

    // Map with all hits {hit_id: {hit_parameters}}
    const [hitList, setHitList] = useState(new Map() as Map<number, any>);

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
    });


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
    * Remove a hit from hitList
    *
    * @param  hitKey  Hit key to delete
    */
    function removeHit(hitKey: number) {

        // Copy hitList object state
        let newHitList = new Map(hitList);

        // Delete hit
        newHitList.delete(hitKey);

        // Update state
        setHitList(newHitList);
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
    * Filters displayed hits, based on active filterButtons and searched text.
    *
    * @param  hitListArray Array with hits parameters.
    */
    function filterHitsByType(hitListArray: any[]) {

        // no filterButtons
        if ((filters.filterButtons.length === 0) && (filters.searchedText === '')) {
            return hitListArray;
        }

        // Only search filter
        if (filters.filterButtons.length === 0) {
            return hitListArray
                .filter((obj) => Object.values(obj.hitParameters as { [key: string]: string }).some(val => val.toLowerCase().includes(filters.searchedText.toLowerCase())));
        }

        // Only button filter
        if (filters.searchedText === '') {
            return hitListArray
                .filter(item => filters.filterButtons.includes(item.hitType));
        }

        // Both filters
        return hitListArray
            .filter(item => filters.filterButtons.includes(item.hitType))
            // .filter((obj) => Object.values(obj.hitParameters as { [key: string]: string }).includes(filters.searchedText.toLowerCase())) // Exact match
            .filter((obj) => Object.values(obj.hitParameters as { [key: string]: string }).some(val => val.toLowerCase().includes(filters.searchedText.toLowerCase())));
    }


    /**
    * Generate array of <Hit/> components
    */
    function renderHits() {

        console.log('renderHits called');

        // Array of filtered hits parameters
        let hitListArray = Array.from(hitList.values());
        hitListArray = filterHitsByType(hitListArray);

        // Array of <Hit/> components
        const renderedHitsArray = hitListArray.reverse().map((hit) => {

            let color;

            switch (hit.status) {
                case 'error':
                    color = 'red';
                    break;
                case 'ok':
                    color = 'success.main';
                    break;
                default:
                    color = 'red';
            }

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
                    color={color}
                />
            );
        });
        return renderedHitsArray;
    }


    /**
    * After component mounts hook.
    */
    useEffect(() => {

        /**
        * Requests listener
        */
        function requestListener() {
            // const requestListener = useCallback(() => {

            // Restrict to current tab
            chrome.tabs.query({ active: true, currentWindow: true, lastFocusedWindow: true }, function (tab) {

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
                        tabId: tab[0].id
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
        function handler(url: string, queryString: string, ga4: boolean) {

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

            if (ga4) {
                // GA4 events

                // set contentTitle
                contentTitle = params.en ? params.en : params.dl;

                // Required parameters
                requiredParametersToCheck = [
                    { type: 'analytics4', params: params },
                ];

            } else {
                // UA events

                // set contentTitle
                contentTitle = RW.setUAContent(params, contentTitle);

                // Required parameters
                requiredParametersToCheck = [
                    { type: 'all', params: params },
                    { type: params.t, params: params },
                ];
            }

            // Decode contentTitle
            contentTitle = RW.decode(contentTitle);

            // Identify required parameters that are undefined
            const missingRequiredParameters =
                requiredParametersToCheck
                    .map(RW.identifyUndefinedRequiredParameters)
                    .filter((error: string[]) => error.length > 0);

            // Hit type
            let hitType;
            if (ga4) {
                hitType = 'analytics4';
            } else {
                hitType = params.t;
            };

            const validationStatus = missingRequiredParameters.length ? 'error' : 'ok';


            // Add new hit
            addNewHit(
                params,
                validationStatus,
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
        function addNewHit(hitParameters: { [key: string]: string }, validationStatus: 'error' | 'ok', contentTitle: string, hitType: string) {

            setHitList(oldHitList => {
                // Generate hitListKey = biggest key + 1
                let hitListKey = oldHitList.size > 0 ? Math.max(...oldHitList.keys()) + 1 : 0;

                // Append new hit on hitList
                return new Map(oldHitList.set(hitListKey,
                    {
                        hitParameters: hitParameters,
                        validationStatus: validationStatus,
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

        initParser(
            'https://www.google-analytics.com/g/collect?v=2&tid=G-N4J2F78CPK&gtm=2oe4r0&_p=1314753210&_z=ccd.NbB&cid=1642312484.1651168350&ul=pt-br&sr=1280x720&sid=1651171814&sct=1&seg=1&dl=http%3A%2F%2F127.0.0.1%2Findex.html&dr=http%3A%2F%2F127.0.0.1%3A5000%2Fanalise.html&dt=DP6%20Case%20-%20Prova%20T%C3%A9cnica&_s=1',
            'post',
            null,
            ''
        );


        setTimeout(() => {
            initParser(
                'https://www.google-analytics.com/j/collect?v=1&_v=j96&a=163765863&t=event&ni=1&_s=1&dl=https%3A%2F%2Fwww.prudential.com.br%2Fcontent%2Fprudential%2Fhome%2Fpara-voce%2Fseguro-individual.html&ul=pt-br&de=UTF-8&dt=Prudential%3A%20Seguro%20de%20Vida%20-%20Veja%20o%20Plano%20Individual%20%7C%20Prudential&sd=24-bit&sr=1280x720&vp=1263x577&je=0&ec=web-vitals&ea=CLS&el=v2-1651857106243-2938432349121&_u=SCCACUABBAAAAG~&jid=1772300202&gjid=523459683&cid=1489834817.1651778536&tid=UA-185685971-1&_gid=1523670321.1651778536&_r=1&gtm=2wg540NS2KDGF&cm1=11&cm2=11&z=1529625290',
                'POST',
                null,
                ''
            );
        }, 6000);

        console.log('Mounted');

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
            <Box sx={{
                flexGrow: 1,
            }}>
                <Navbar
                    isDarkTheme={isDarkTheme}
                    setIsDarkTheme={setIsDarkTheme}
                    filters={filters}
                    setFilters={setFilters}
                    setHitList={setHitList}
                    searchBarToggler={searchBarToggler}
                />
                <PanelBar
                    accordionExpandAll={accordionExpandAll}
                />
                <Divider sx={{ mt: 1, mb: 1 }} />
                {renderHits()}
            </Box>
        </ThemeProvider >
    );
}


export default App;
