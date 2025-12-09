/**
 * Helper pour envoyer des événements à Google Tag Manager
 * 
 * @example
 * trackEvent('waitlist_submit', { email: 'user@example.com' });
 * trackEvent('button_click', { button_name: 'cta_hero' });
 */

interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(eventName: string, params?: EventParams) {
  // Vérifie que nous sommes côté client
  if (typeof window === 'undefined') {
    console.warn('trackEvent appelé côté serveur, ignoré');
    return;
  }

  // Vérifie que dataLayer existe
  if (!window.dataLayer) {
    console.warn('dataLayer non disponible, événement non envoyé:', eventName);
    return;
  }

  // Envoie l'événement
  window.dataLayer.push({
    event: eventName,
    timestamp: new Date().toISOString(),
    ...params,
  });

  // Log en dev
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Event tracked:', eventName, params);
  }
}

// Types pour window.dataLayer
declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

// Événements prédéfinis pour Goparo
export const GoparoEvents = {
  // Waitlist
  WAITLIST_SUBMIT: 'waitlist_submit',
  WAITLIST_ERROR: 'waitlist_error',
  
  // Navigation
  CTA_CLICK: 'cta_click',
  DEMO_REQUEST: 'demo_request',
  
  // Engagement
  VIDEO_PLAY: 'video_play',
  SCROLL_DEPTH: 'scroll_depth',
  
  // Forms
  FORM_START: 'form_start',
  FORM_COMPLETE: 'form_complete',
} as const;

/**
 * Raccourcis pour les événements courants
 */
export const track = {
  waitlistSubmit: (email?: string) => 
    trackEvent(GoparoEvents.WAITLIST_SUBMIT, { email }),
  
  waitlistError: (error: string) => 
    trackEvent(GoparoEvents.WAITLIST_ERROR, { error }),
  
  ctaClick: (location: string, label?: string) => 
    trackEvent(GoparoEvents.CTA_CLICK, { location, label }),
  
  demoRequest: (source: string) => 
    trackEvent(GoparoEvents.DEMO_REQUEST, { source }),
};