// GTMChecker.tsx
import React, { useEffect, useState } from 'react';

interface GTMStatus {
  isInstalled: boolean;
  gtmID?: string;
}

const GTMChecker: React.FC = () => {
  const [gtmStatus, setGtmStatus] = useState<GTMStatus>({ isInstalled: false });

  useEffect(() => {
    const checkGTMInstallation = (): GTMStatus => {
      const gtmDataLayer = (window as any).dataLayer;
      if (gtmDataLayer && Array.isArray(gtmDataLayer)) {
        const gtmEvent = gtmDataLayer.find(
          (event: any) => event['gtm.start'] && event.event === 'gtm.js'
        );
        if (gtmEvent) {
          return { isInstalled: true, gtmID: gtmEvent['gtm.uniqueEventId'] };
        }
      }
      return { isInstalled: false };
    };

    const status = checkGTMInstallation();
    setGtmStatus(status);
  }, []);

  return (
    <div>
      {gtmStatus.isInstalled ? (
        <p>O Google Tag Manager está instalado. ID do GTM: {gtmStatus.gtmID}</p>
      ) : (
        <p>O Google Tag Manager não está instalado.</p>
      )}
    </div>
  );
};

export default GTMChecker;
