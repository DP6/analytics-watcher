// FacebookPixelChecker.tsx
import React, { useEffect, useState } from 'react';

interface FacebookPixelStatus {
  isInstalled: boolean;
  pixelID?: string;
}

const FacebookPixelChecker: React.FC = () => {
  const [facebookPixelStatus, setFacebookPixelStatus] =
    useState<FacebookPixelStatus>({ isInstalled: false });

  useEffect(() => {
    const checkFacebookPixelInstallation = (): FacebookPixelStatus => {
      const fbq = (window as any).fbq;
      if (fbq && typeof fbq === 'function' && fbq.getState) {
        const state = fbq.getState();
        const pixelID = state && state.pixel && state.pixel.pixelID;
        if (pixelID) {
          return { isInstalled: true, pixelID };
        }
      }
      return { isInstalled: false };
    };

    const status = checkFacebookPixelInstallation();
    setFacebookPixelStatus(status);
  }, []);

  return (
    <div>
      {facebookPixelStatus.isInstalled ? (
        <p>
          O Facebook Pixel está instalado. ID do Pixel:{' '}
          {facebookPixelStatus.pixelID}
        </p>
      ) : (
        <p>O Facebook Pixel não está instalado.</p>
      )}
    </div>
  );
};

export default FacebookPixelChecker;
