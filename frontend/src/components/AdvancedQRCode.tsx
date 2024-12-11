import React from 'react';
import QRCode from 'qrcode-generator';

interface AdvancedQRCodeProps {
  data: string;
  size?: number;
  markerShape: string;
  markerStyle: string;
  markerColor: string;
}

export const AdvancedQRCode: React.FC<AdvancedQRCodeProps> = ({
  data,
  size = 256,
  markerShape,
  markerStyle,
  markerColor,
}) => {
  const generateQRCodeSVG = () => {
    const qr = QRCode(0, 'L');
    qr.addData(data);
    qr.make();

    const moduleCount = qr.getModuleCount();
    const cellSize = size / moduleCount;

    let paths: string[] = [];
    let cornerMarkers: string[] = [];

    // Helper to check if a cell is a corner marker
    const isCorner = (row: number, col: number) => 
      (row < 7 && col < 7) || // Top-left
      (row < 7 && col >= moduleCount - 7) || // Top-right
      (row >= moduleCount - 7 && col < 7); // Bottom-left

    // Create paths for connected shapes
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (!qr.isDark(row, col)) continue;

        const x = col * cellSize;
        const y = row * cellSize;

        if (isCorner(row, col)) {
          if (markerShape === 'circle') {
            const centerX = x + cellSize / 2;
            const centerY = y + cellSize / 2;
            cornerMarkers.push(`M${centerX},${centerY} m-${cellSize/2},0 a${cellSize/2},${cellSize/2} 0 1,0 ${cellSize},0 a${cellSize/2},${cellSize/2} 0 1,0 -${cellSize},0`);
          } else {
            cornerMarkers.push(`M${x},${y} h${cellSize} v${cellSize} h-${cellSize}z`);
          }
        } else {
          switch (markerStyle) {
            case 'dots':
              const centerX = x + cellSize / 2;
              const centerY = y + cellSize / 2;
              paths.push(`M${centerX},${centerY} m-${cellSize/2},0 a${cellSize/2},${cellSize/2} 0 1,0 ${cellSize},0 a${cellSize/2},${cellSize/2} 0 1,0 -${cellSize},0`);
              break;
            case 'rounded':
              const radius = cellSize * 0.3;
              paths.push(`M${x + radius},${y} h${cellSize - 2*radius} q${radius},0 ${radius},${radius} v${cellSize - 2*radius} q0,${radius} -${radius},${radius} h-${cellSize - 2*radius} q-${radius},0 -${radius},-${radius} v-${cellSize - 2*radius} q0,-${radius} ${radius},-${radius}`);
              break;
            default:
              paths.push(`M${x},${y} h${cellSize} v${cellSize} h-${cellSize}z`);
          }
        }
      }
    }

    return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" preserveAspectRatio="xMidYMid meet">
      <path d="${paths.join(' ')}" fill="#000000" />
      <path d="${cornerMarkers.join(' ')}" fill="${markerColor}" />
    </svg>`.trim();
  };

  const svgMarkup = generateQRCodeSVG();

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      lineHeight: 0  // Remove line-height spacing
    }} 
    dangerouslySetInnerHTML={{ __html: svgMarkup }} 
    />
  );
}; 