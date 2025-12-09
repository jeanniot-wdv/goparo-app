import Script from 'next/script';

export function GoogleConsentMode() {
  return (
    <>
      {/* Configuration initiale du mode consentement */}
      <Script id="google-consent-mode" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'functionality_storage': 'denied',
            'personalization_storage': 'denied',
            'security_storage': 'granted',
            'wait_for_update': 500
          });
        `}
      </Script>

      {/* Mise à jour du consentement selon les choix Cookiebot */}
      <Script id="cookiebot-consent-update" strategy="afterInteractive">
        {`
          window.addEventListener('CookiebotOnAccept', function (e) {
            gtag('consent', 'update', {
              'analytics_storage': Cookiebot.consent.statistics ? 'granted' : 'denied',
              'ad_storage': Cookiebot.consent.marketing ? 'granted' : 'denied',
              'ad_user_data': Cookiebot.consent.marketing ? 'granted' : 'denied',
              'ad_personalization': Cookiebot.consent.marketing ? 'granted' : 'denied',
              'functionality_storage': Cookiebot.consent.preferences ? 'granted' : 'denied',
              'personalization_storage': Cookiebot.consent.preferences ? 'granted' : 'denied'
            });
          }, false);

          window.addEventListener('CookiebotOnDecline', function (e) {
            gtag('consent', 'update', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });
          }, false);
        `}
      </Script>
    </>
  );
}