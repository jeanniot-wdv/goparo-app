"use client";

import Script from "next/script";

export default function TarteaucitronConfig() {
  return (
    <>
      {/* Script core tarteaucitron */}
      <Script
        src="/tarteaucitron/tarteaucitron.js"
        strategy="beforeInteractive"
      />

      {/* Configuration tarteaucitron */}
      <Script id="tarteaucitron-init" strategy="beforeInteractive">
        {`
          tarteaucitron.init({
            "hashtag": "#tarteaucitron",
            "cookieName": "tarteaucitron",
            "orientation": "bottom",
            "showAlertSmall": false,
            "cookieslist": true,
            "showIcon": true,
            "iconPosition": "BottomRight",
            "DenyAllCta": true,
            "AcceptAllCta": true,
            "highPrivacy": true,
            "removeCredit": true,
          });

          // ----------------------
          // GOOGLE TAG MANAGER
          // ----------------------
          tarteaucitron.user.gtmId = "${process.env.NEXT_PUBLIC_GTM_ID}";
          (tarteaucitron.job = tarteaucitron.job || []).push("gtm");

          // ----------------------
          // reCAPTCHA v3
          // ----------------------
          tarteaucitron.user.recaptchaapi = "${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}"; 
          (tarteaucitron.job = tarteaucitron.job || []).push("recaptcha");
        `}
      </Script>
    </>
  );
}
