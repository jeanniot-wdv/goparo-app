// frontend/src/app/fonts.ts

import { Raleway, Inter } from 'next/font/google';

export const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300','400','500','600','700','800','900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400','500','600','700','800','900'],
  variable: '--font-inter',
  display: 'swap',
});