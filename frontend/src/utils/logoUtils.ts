import { LogoType } from "../components/LogoCustomization";

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
    default:
      return '';
  }
}; 