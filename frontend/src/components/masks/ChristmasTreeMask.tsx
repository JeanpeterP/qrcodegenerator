import React from 'react';

const ChristmasTreeMask = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path d="
    M 32 4
    L 8 60
    L 56 60
    Z
    M 32 20
    L 16 44
    L 48 44
    Z
    M 32 36
    L 24 52
    L 40 52
    Z" fill="black"/>
  <rect x="28" y="56" width="8" height="8" fill="black"/>
</svg>
` as const;

export type MaskType = typeof ChristmasTreeMask;
export default ChristmasTreeMask; 