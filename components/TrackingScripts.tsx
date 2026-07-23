"use client";

import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { initUTMTracker } from "@/utils/utmTracker";

const consentStorageKey = "cars-sr99-cookie-consent";
const serverConsentSnapshot = "__server__";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("cookie_consent_updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("cookie_consent_updated", callback);
  };
}

function getSnapshot(): string {
  if (typeof window === "undefined") return serverConsentSnapshot;
  return window.localStorage.getItem(consentStorageKey) ?? "";
}

export default function TrackingScripts() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, () => serverConsentSnapshot);

  useEffect(() => {
    initUTMTracker();
  }, []);

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  if (consent !== "accepted") {
    // GDPR ENFORCEMENT: Do NOT load any tracking script unless explicit consent is given
    return null;
  }

  return (
    <>
      {/* Meta (Facebook) Pixel */}
      {pixelId ? (
        <Script id="meta-pixel-init" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}
    </>
  );
}
