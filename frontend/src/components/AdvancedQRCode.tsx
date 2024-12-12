import React from 'react';
import QRCode from 'qrcode-generator';

interface AdvancedQRCodeProps {
  data: string;
  size?: number;
  markerShape: string;
  markerColor: string;
  shape: string;
  qrColor: string;
}

export const AdvancedQRCode: React.FC<AdvancedQRCodeProps> = ({
  data,
  size = 256,
  markerShape,
  markerColor,
  shape,
  qrColor = '#000000',
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
    const isCorner = (row: number, col: number) => {
      const isTopLeft = row < 7 && col < 7;
      const isTopRight = row < 7 && col >= moduleCount - 7;
      const isBottomLeft = row >= moduleCount - 7 && col < 7;
      return isTopLeft || isTopRight || isBottomLeft;
    };

    const generateMarkerPath = (
      x: number,
      y: number,
      size: number,
      markerType: string
    ) => {
      // Remove 'marker-' prefix
      const type = markerType.replace('marker-', '').trim().toLowerCase();

      switch (type) {
        case 'dot':
          const centerX = x + size / 2;
          const centerY = y + size / 2;
          return `M${centerX},${centerY} m-${size / 2},0 a${size / 2},${
            size / 2
          } 0 1,0 ${size},0 a${size / 2},${size / 2} 0 1,0 -${size},0`;
        case 'square':
          return `M${x},${y} h${size} v${size} h-${size}z`;
        case 'rounded':
          const radius = size * 0.25;
          return `M${x + radius},${y} h${size - 2 * radius} q${radius},0 ${radius},${radius} v${
            size - 2 * radius
          } q0,${radius} -${radius},${radius} h-${size - 2 * radius} q-${radius},0 -${radius},-${
            radius
          } v-${size - 2 * radius} q0,-${radius} ${radius},-${radius}`;
        case 'diamond':
          const mid = size / 2;
          return `M${x + mid},${y} L${x + size},${y + mid} L${x + mid},${
            y + size
          } L${x},${y + mid}z`;
        case 'hexagon':
          const side = size / 2;
          const h = side * Math.sin(Math.PI / 3);
          const cx = x + size / 2;
          const cy = y + size / 2;
          return `
            M${cx},${cy - side}
            L${cx + h},${cy - side / 2}
            L${cx + h},${cy + side / 2}
            L${cx},${cy + side}
            L${cx - h},${cy + side / 2}
            L${cx - h},${cy - side / 2}Z
          `;
        case 'star':
          const outerPoints = 5;
          const outerRadius2 = size / 2;
          const innerRadius2 = size / 4;
          const cx2 = x + size / 2;
          const cy2 = y + size / 2;
          let path = `M ${cx2},${cy2 - outerRadius2} `;

          for (let i = 0; i < outerPoints * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius2 : innerRadius2;
            const angle = (Math.PI / outerPoints) * i;
            const pointX = cx2 + radius * Math.sin(angle);
            const pointY = cy2 - radius * Math.cos(angle);
            path += `L ${pointX},${pointY} `;
          }

          return path + 'Z';
        // ... Include other marker shapes if needed ...
        default:
          // Default marker shape (square)
          return `M${x},${y} h${size} v${size} h-${size}z`;
      }
    };

    const generateDotPath = (
      x: number,
      y: number,
      size: number,
      dotShape: string
    ) => {
      // Remove 'shape-' prefix
      const type = dotShape.replace('shape-', '').trim().toLowerCase();

      switch (type) {
        case 'circle':
          const centerX = x + size / 2;
          const centerY = y + size / 2;
          return `M${centerX},${centerY} m-${size / 2},0 a${size / 2},${
            size / 2
          } 0 1,0 ${size},0 a${size / 2},${size / 2} 0 1,0 -${size},0`;
        case 'diamond':
          const mid = size / 2;
          return `M${x + mid},${y} L${x + size},${y + mid} L${x + mid},${
            y + size
          } L${x},${y + mid}z`;
        case 'hexagon':
          const side = size / 2;
          const h = side * Math.sin(Math.PI / 3);
          const cx = x + size / 2;
          const cy = y + size / 2;
          return `
            M${cx},${cy - side}
            L${cx + h},${cy - side / 2}
            L${cx + h},${cy + side / 2}
            L${cx},${cy + side}
            L${cx - h},${cy + side / 2}
            L${cx - h},${cy - side / 2}Z
          `;
        case 'star':
          const outerPoints = 5;
          const outerRadius2 = size / 2;
          const innerRadius2 = size / 4;
          const cx2 = x + size / 2;
          const cy2 = y + size / 2;
          let path = `M ${cx2},${cy2 - outerRadius2} `;

          for (let i = 0; i < outerPoints * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius2 : innerRadius2;
            const angle = (Math.PI / outerPoints) * i;
            const pointX = cx2 + radius * Math.sin(angle);
            const pointY = cy2 - radius * Math.cos(angle);
            path += `L ${pointX},${pointY} `;
          }

          return path + 'Z';
        // ... Include other dot shapes if needed ...
        default:
          // Default dot shape (square)
          return `M${x},${y} h${size} v${size} h-${size}z`;
      }
    };

    // Iterate through each module (cell) in the QR code
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (!qr.isDark(row, col)) continue;

        const x = col * cellSize;
        const y = row * cellSize;

        if (isCorner(row, col)) {
          // Use marker shape for corner markers
          cornerMarkers.push(
            generateMarkerPath(x, y, cellSize, markerShape)
          );
        } else {
          // Use dot shape for regular modules
          paths.push(generateDotPath(x, y, cellSize, shape));
        }
      }
    }

    return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <path d="${paths.join(' ')}" fill="${qrColor}" />
      <path d="${cornerMarkers.join(' ')}" fill="${markerColor}" />
    </svg>`;
  };

  const svgMarkup = generateQRCodeSVG();

  return <div dangerouslySetInnerHTML={{ __html: svgMarkup }} />;
}; 