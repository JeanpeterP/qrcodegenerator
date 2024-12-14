import { LogoType } from "../components/LogoCustomization";
import { MetaLogo } from '@phosphor-icons/react';

export const getLogoSource = (type: LogoType): string => {
  switch (type) {
    case 'modern-split':
      return `data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#FF6B6B"/>
              <stop offset="100%" style="stop-color:#4ECDC4"/>
            </linearGradient>
          </defs>
          <text x="50%" y="45%" font-size="28" text-anchor="middle" font-family="Arial, sans-serif" fill="url(#gradient)" font-weight="700">SCAN</text>
          <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="#333" stroke-width="2"/>
          <text x="50%" y="75%" font-size="24" text-anchor="middle" font-family="Arial, sans-serif" fill="#333" font-weight="500">ME</text>
        </svg>
      `)}`;

    case 'circular':
      return `data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#333" stroke-width="3"/>
          <text x="50%" y="45%" font-size="32" text-anchor="middle" font-family="Arial, sans-serif" fill="#333" font-weight="700">SCAN</text>
          <path d="M 60 100 L 140 100" stroke="#333" stroke-width="2"/>
          <text x="50%" y="65%" font-size="28" text-anchor="middle" font-family="Arial, sans-serif" fill="#333" font-weight="500">ME</text>
        </svg>
      `)}`;

    case 'minimal-frame':
      return `data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
          <rect x="10" y="10" width="180" height="80" fill="none" stroke="#333" stroke-width="3" rx="8"/>
          <text x="50%" y="55%" font-size="32" text-anchor="middle" font-family="Arial, sans-serif" fill="#333" font-weight="700">SCAN ME</text>
          <rect x="5" y="5" width="10" height="10" fill="#333"/>
          <rect x="185" y="5" width="10" height="10" fill="#333"/>
          <rect x="5" y="85" width="10" height="10" fill="#333"/>
          <rect x="185" y="85" width="10" height="10" fill="#333"/>
        </svg>
      `)}`;

    case 'tech-style':
      return `data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
          <defs>
            <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#4A90E2"/>
              <stop offset="100%" style="stop-color:#50E3C2"/>
            </linearGradient>
          </defs>
          <polygon points="20,50 50,20 150,20 180,50 150,80 50,80" fill="none" stroke="url(#techGradient)" stroke-width="3"/>
          <text x="50%" y="60%" font-size="28" text-anchor="middle" font-family="Arial, sans-serif" fill="#333" font-weight="600">SCAN ME</text>
        </svg>
      `)}`;

    case 'custom':
      return '';

    case 'instagram':
      return `data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <rect x="40" y="40" width="120" height="120" rx="30" fill="none" stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/>
          <circle cx="100" cy="100" r="25" fill="none" stroke="#333" stroke-miterlimit="10" stroke-width="10"/>
          <circle cx="132" cy="68" r="8" fill="#333"/>
        </svg>
      `)}`;

    case 'facebook':
      return `data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path d="M240,149.31c0,16.11-3.17,29.89-9.17,39.84-7.43,12.33-19,18.85-33.39,18.85-27.94,0-47.78-37-68.78-76.22C111.64,100,92.35,64,74,64c-9.38,0-19.94,10-28.25,26.67A138.18,138.18,0,0,0,32,149.31c0,13.2,2.38,24.12,6.88,31.58S49.82,192,58.56,192c15.12,0,30.85-24.54,44.23-48.55a8,8,0,0,1,14,7.8C101.46,178.71,83.07,208,58.56,208c-14.41,0-26-6.52-33.39-18.85-6-10-9.17-23.73-9.17-39.84A154.81,154.81,0,0,1,31.42,83.54C42.82,60.62,57.94,48,74,48c27.94,0,47.77,37,68.78,76.22C159.79,156,179.08,192,197.44,192c8.74,0,15.18-3.63,19.68-11.11S224,162.51,224,149.31a138.18,138.18,0,0,0-13.74-58.64C202,74,191.39,64,182,64c-8.36,0-17.68,7.48-28.51,22.88a8,8,0,1,1-13.08-9.21c9-12.74,23-29.67,41.59-29.67,16.05,0,31.17,12.62,42.57,35.54A154.81,154.81,0,0,1,240,149.31Z" 
            fill="#333"/>
        </svg>
      `)}`;

    default:
      return '';
  }
}; 