import Script from "next/script";
import React from "react";
import { AdsenseTypes } from "./adsense.types";

export default function AdSense({ pId }: AdsenseTypes) {
  return (
    <>
      {/* Consent Mode (GDPR/CCPA 대응) */}
      <Script id="google-consent" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'analytics_storage': 'denied',
          });
        `}
      </Script>

      {/* Google AdSense 스크립트 */}
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
    </>
  );
}
