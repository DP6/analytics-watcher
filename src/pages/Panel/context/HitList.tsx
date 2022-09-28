import { func } from 'prop-types';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

interface HitListContextData {
  pages: Pages[];
  hitList: Hit[];
  // dataLayerSchema: {
  //   fileName: string;
  //   schema: Object;
  // };
}

interface NewQueryString {
  requestType: string;
  data: QueryString[];
}

const HitListContext = createContext<HitListContextData>(
  {} as HitListContextData
);

const HitListProvider: React.FC = ({ children }) => {
  const [newHit, setNewHit] = useState<Hit>();
  const [hitList, setHitList] = useState<Hit[]>([]);
  const [currentPage, setCurrentPage] = useState<Pages>({});
  const [pages, setPages] = useState<Pages[]>([]);
  const [queryStrings, setQueryStrings] = useState<NewQueryString>();

  function handleQueryStrings({ requestType, data }: NewQueryString) {
    if (currentPage.pageId) {
      setNewHit({
        pageId: currentPage.pageId,
        requestType,
        data,
      });
    }
  }

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

  useEffect(() => {
    const tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.webNavigation.onBeforeNavigate.addListener(details => {
      if (details.frameId === 0 && details.tabId === tabId) {
        setCurrentPage({
          pageId: uuid(),
          pageUrl: details.url,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (currentPage) setPages([...pages, currentPage]);
  }, [currentPage]);

  useEffect(() => {
    chrome.devtools.network.onRequestFinished.addListener(
      (data: chrome.devtools.network.Request) => {
        if (data.request && data.request.url) {
          const type = validateRequestType(data.request.url);
          console.log('if: ', type === 'ua-hit' || type === 'ga4-hit');
          if (
            type &&
            data.request.queryString.length > 0 &&
            (type === 'ua-hit' || type === 'ga4-hit')
          ) {
            setQueryStrings({
              requestType: type,
              data: data.request.queryString,
            });
          }
        }
      }
    );
  }, []);

  useEffect(() => {
    if (newHit) setHitList([...hitList, newHit]);
  }, [newHit]);

  useEffect(() => {
    if (queryStrings) handleQueryStrings(queryStrings);
  }, [queryStrings]);

  return (
    <HitListContext.Provider value={{ pages, hitList }}>
      {children}
    </HitListContext.Provider>
  );
};

function useHitList(): HitListContextData {
  const context = useContext(HitListContext);

  if (!context) {
    throw new Error('Use HitList must be used within a HitListProvider');
  }

  return context;
}

export { useHitList, HitListProvider };
