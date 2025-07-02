import Script from "next/script";
import React from "react";

type AdsenseTypes = {
  pId: string;
};

export default function AdSense({ pId }: AdsenseTypes) {
  return (
    <>
      {/* Google Consent Mode 설정 */}
      <Script
        id="google-consent"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'ad_storage': 'granted',
            'analytics_storage': 'granted'
          });
        `,
        }}
      />

      {/* Google Ads 스크립트 */}
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
