import Script from 'next/script';

const COOKIEBOT_ID = process.env.NEXT_PUBLIC_COOKIEBOT_ID || '2dad90b4-5262-4f73-89c7-1b1fa1eda12e';

export function CookiebotScript() {
  return (
    <Script 
      id="Cookiebot" 
      src="https://consent.cookiebot.com/uc.js" 
      data-cbid={COOKIEBOT_ID}
      data-blockingmode="auto" 
      strategy="beforeInteractive"
    />
  );
}