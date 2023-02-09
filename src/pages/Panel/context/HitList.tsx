import React, { createContext, useState, useContext, useEffect } from 'react';
import * as RW from '../utils/3.hitParser';
import { v4 as uuid } from 'uuid';
import { HitDataModel } from '../models/HitDataModel';

interface HitListContextData {
  pages: HitDataModel;
  setPages: React.Dispatch<React.SetStateAction<HitDataModel>>;
}

const HitListContext = createContext<HitListContextData>(
  {} as HitListContextData
);

const HitListProvider: React.FC = ({ children }) => {
  const [pages, setPages] = useState<HitDataModel>(new HitDataModel());

  // * Gets current page
  useEffect(() => {
    const tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.tabs.get(tabId, tab => {
      if (tab.url !== 'chrome://newtab/')
        chrome.webNavigation.getAllFrames(
          { tabId: chrome.devtools.inspectedWindow.tabId },
          originalFrames => {
            let frames = originalFrames as ExtendedGetAllFrameResultDetails[];

            // Page documentId
            let outermostDocumentId = frames.filter(
              frame => frame.frameType === 'outermost_frame'
            )[0].documentId;

            // documentId of All frames
            let framesDocumentId = frames.map(frame => frame.documentId);

            // pageUrl
            let pageUrl = '';
            if (tab.url) {
              let url = new URL(tab.url);
              pageUrl = url.hostname + url.pathname;
            }

            // Set new page
            let newPage: Page = {
              pageId: uuid(),
              pageUrl: pageUrl,
              expanded: true,
              favIconUrl: tab.favIconUrl ? tab.favIconUrl : '',
              hits: [],
              documentId: outermostDocumentId,
              framesDocumentId: framesDocumentId,
            };
            setPages(oldPages => {
              let newPages = new HitDataModel(oldPages);
              newPages.addPage(newPage);
              return newPages;
            });
          }
        );
    });
  }, []);

  // * Before navigate to new URL, get documentId of all frames
  useEffect(() => {
    const tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.webNavigation.onBeforeNavigate.addListener(details => {
      if (details.frameId === 0 && details.tabId === tabId) {
        chrome.webNavigation.getAllFrames(
          { tabId: chrome.devtools.inspectedWindow.tabId },
          originalFrames => {
            let frames = originalFrames as ExtendedGetAllFrameResultDetails[];

            // All frames documentId
            let framesDocumentId = frames.map(frame => frame.documentId);

            // Add hit to page
            setPages(oldPages => {
              let newPages = new HitDataModel(oldPages);
              newPages.updateFramesIds(
                newPages.currentPage?.pageId,
                framesDocumentId
              );
              return newPages;
            });
          }
        );
      }
    });
  }, []);

  // * Adds new page
  useEffect(() => {
    const tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.webNavigation.onCommitted.addListener(details => {
      if (details.frameId === 0 && details.tabId === tabId) {
        // documentId of All frames
        let extendedDetails =
          details as ExtendedWebNavigationTransitionCallbackDetails;

        let pageUrl = '';
        if (details.url) {
          let url = new URL(details.url);
          pageUrl = url.hostname + url.pathname;
        }

        // Set new page
        let newPage: Page = {
          pageId: uuid(),
          pageUrl: pageUrl,
          expanded: true,
          hits: [],
          documentId: extendedDetails.documentId,
          favIconUrl: '',
        };
        setPages(pages => {
          let newPages = new HitDataModel(pages);
          newPages.addPage(newPage);
          return newPages;
        });
      }
    });
  }, []);

  // * On update
  // * Sets favIcon
  // * When 'complete', get documentId of All frames
  useEffect(() => {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      // Get favIconUrl
      if (changeInfo.favIconUrl) {
        setPages(pages => {
          let newPages = new HitDataModel(pages);
          newPages.updatePageFavIcon(
            newPages.currentPage?.pageId,
            changeInfo.favIconUrl!
          );
          return newPages;
        });
      }

      // Completed - Get all frames
      if (changeInfo.status === 'complete') {
        chrome.webNavigation.getAllFrames(
          { tabId: chrome.devtools.inspectedWindow.tabId },
          originalFrames => {
            let frames = originalFrames as ExtendedGetAllFrameResultDetails[];

            // documentId of All frames
            let framesDocumentId = frames.map(frame => frame.documentId);

            // Add hit to page
            setPages(oldPages => {
              let newPages = new HitDataModel(oldPages);
              newPages.updateFramesIds(
                newPages.currentPage?.pageId,
                framesDocumentId
              );
              return newPages;
            });
          }
        );
      }
    });
  }, []);

  // * Request listener
  useEffect(() => {
    function validateRequestType(url: string) {
      const typeRequestUrl = [
        {
          type: 'ua-js',
          regex:
            /http(s|):\/\/(www|)\.google-analytics\.com\/(analytics|analytics_debug)\.js/,
        },
        {
          type: 'ua-hit',
          regex:
            /http(s|):\/\/(www|)\.google-analytics\.com(\/r|\/j|)\/(collect|batch)/,
        },
        {
          type: 'ga-hit',
          regex: /http(s|):\/\/(ssl|)\.google-analytics\.com\/__utm.gif/,
        },
        {
          type: 'ua-hit-dc',
          regex:
            /http(s|):\/\/stats\.g\.doubleclick\.net(\/r|\/j|)\/(collect|batch)/,
        },
        {
          type: 'ua-hit-alike',
          regex: /http(s|):\/\/.*\/(collect|batch).*(&tid=UA-)/,
        },
        {
          type: 'ga4-hit',
          regex: /http(s|):\/\/.*\/g\/(collect|batch)\?v=2.*(&tid=G-)/,
        },
        {
          type: 'gtm-amp',
          regex: /http(s|):\/\/(www|)\.googletagmanager\.com\/amp\.json/,
        },
      ];
      const request = typeRequestUrl.filter(item => item.regex.test(url))[0];
      return request?.type;
    }

    // Add listener
    chrome.webRequest.onBeforeRequest.addListener(
      function (details) {
        if (details.url) {
          const hitType = validateRequestType(details.url);

          // Get queryString
          let queryString = '';
          if (details.url.includes('?')) {
            queryString = details.url.slice(details.url.indexOf('?') + 1);
          } else return;

          // Handle URL
          if (
            hitType &&
            queryString.length > 0 &&
            (hitType === 'ua-hit' || hitType === 'ga4-hit')
          ) {
            // Generate object from query string
            let hitParameters = Object.fromEntries(
              new URLSearchParams(queryString)
            );

            // content => Hit "title" on Analytics Watcher's HTML page
            let contentTitle = '';

            // eventType => pageview, event, transaction...
            let eventType = '';

            // set contentTitle and eventType
            if (hitType === 'ga4-hit') {
              contentTitle = hitParameters.en
                ? hitParameters.en
                : hitParameters.dl;
              eventType = 'analytics4';
            } else {
              contentTitle = RW.setUAContent(hitParameters, contentTitle);
              eventType = hitParameters.t;
            }

            // Setup new hit
            let newHit: Hit = {
              pageId: '',
              hitId: uuid(),
              hitParameters: hitParameters,
              contentTitle: contentTitle,
              hitType: hitType,
              eventType: eventType,
              expanded: false,
            };

            chrome.webNavigation.getAllFrames(
              { tabId: chrome.devtools.inspectedWindow.tabId },
              originalFrames => {
                let frames =
                  originalFrames as ExtendedGetAllFrameResultDetails[];

                // Page documentId
                let outermostDocumentId = frames.filter(
                  frame => frame.frameType === 'outermost_frame'
                )[0].documentId;

                // documentId of All frames
                let framesDocumentId = frames.map(frame => frame.documentId);

                setPages(oldPages => {
                  let newPages = new HitDataModel(oldPages);
                  let pageId = '';
                  let newDetails = details as ExtendedWebRequestBodyDetails;

                  //* CASE 1:
                  //* Find page by request documentId
                  pageId = newPages.findPageByDocumentId(newDetails.documentId);

                  //* CASE 2:
                  //* IF not found, and request documentId is in framesDocumentId,
                  //* search by outermost documentId (parentDocumentId)
                  if (!pageId) {
                    //* CASE 2: IF request documentId is in framesDocumentId
                    //* Find page by outermostDocumentId
                    if (framesDocumentId.includes(newDetails.documentId)) {
                      pageId =
                        newPages.findPageByDocumentId(outermostDocumentId);
                    } else {
                      //* CASE 3:
                      //* search in framesDocumentId all pages
                      pageId =
                        newPages.findPageByDocumentIdInFrames(
                          outermostDocumentId
                        );
                    }
                  }

                  // Add hit
                  if (pageId) {
                    newHit.pageId = pageId;
                    newPages.addHit(pageId, newHit);
                  } else {
                    // console.log('No pageId');
                    // console.log({ details, newHit, newPages });
                  }

                  return newPages;
                });
              }
            );
          }
        }
      },
      {
        urls: ['<all_urls>'],
        tabId: chrome.devtools.inspectedWindow.tabId,
      },
      ['requestBody', 'extraHeaders']
    );
  }, []);

  return (
    <HitListContext.Provider value={{ pages, setPages }}>
      {children}
    </HitListContext.Provider>
  );
};

/**
 * Sets up the useContext for hitList.
 */
function useHitList(): HitListContextData {
  const context = useContext(HitListContext);

  if (!context) {
    throw new Error('Use HitList must be used within a HitListProvider');
  }

  return context;
}

export { useHitList, HitListProvider, HitListContext };
