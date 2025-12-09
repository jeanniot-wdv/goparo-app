'use client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useEffect, useState } from 'react';

export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Charger reCaptcha après un délai ou au scroll
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 2000); // Attend 2 secondes après le chargement initial

    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) {
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}