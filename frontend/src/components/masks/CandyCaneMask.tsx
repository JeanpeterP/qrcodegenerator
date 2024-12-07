import React from 'react';

const CandyCaneMask = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path d="
    M 40 4
    C 36 4 32 6 30 10
    L 20 30
    C 18 34 18 38 20 42
    C 22 46 26 48 30 48
    L 34 48
    C 38 48 42 46 44 42
    C 46 38 46 34 44 30
    L 34 10
    C 32 6 28 4 24 4
    Z
    M 30 16
    L 38 32
    C 39 34 39 36 38 38
    C 37 40 35 41 33 41
    L 29 41
    C 27 41 25 40 24 38
    C 23 36 23 34 24 32
    L 32 16
    Z" fill="black"/>
</svg>
` as const;

export type MaskType = typeof CandyCaneMask;
export default CandyCaneMask; 