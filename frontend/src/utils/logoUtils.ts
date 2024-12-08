import { LogoType } from "../components/LogoCustomization";

export const getLogoSource = (type: LogoType): string => {
  switch (type) {
    case 'stacked':
      return `data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 2400" width="2400" height="2400">
          <text x="1200" y="960" text-anchor="middle" font-size="480" font-weight="bold" font-family="Arial, sans-serif" shape-rendering="geometricPrecision">SCAN</text>
          <text x="1200" y="1680" text-anchor="middle" font-size="480" font-weight="bold" font-family="Arial, sans-serif" shape-rendering="geometricPrecision">ME</text>
        </svg>
      `)}`;
    case 'open-box':
      return `data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 960" width="2400" height="960">
          <rect x="120" y="120" width="2160" height="720" fill="none" stroke="black" stroke-width="48"/>
          <text x="1200" y="648" text-anchor="middle" font-size="384" font-weight="bold" font-family="Arial, sans-serif" shape-rendering="geometricPrecision">SCAN ME</text>
        </svg>
      `)}`;
    case 'closed-box':
      return `data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 960" width="2400" height="960">
          <rect x="120" y="120" width="2160" height="720" fill="black"/>
          <text x="1200" y="648" text-anchor="middle" font-size="384" font-weight="bold" font-family="Arial, sans-serif" fill="white" shape-rendering="geometricPrecision">SCAN ME</text>
        </svg>
      `)}`;
    case 'custom':
      return '';
    default:
      return '';
  }
}; 