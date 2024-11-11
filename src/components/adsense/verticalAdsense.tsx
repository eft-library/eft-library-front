import React, { useEffect } from 'react'

export default function VerticalAdsense() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }, []);

  return (
      <div className="googleAd-container">
        <ins
            className="adsbygoogle"
            style={{display: 'block', width: '100%', height: '100px', marginBottom: '20px'}}
            data-ad-client={process.env.NEXT_PUBLIC_ADSENSE}
            data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_VERTICAL_SLOT}
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
      </div>
  );
};
