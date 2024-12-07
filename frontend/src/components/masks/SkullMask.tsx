import React from 'react';

const SkullMask = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path d="
    M 32 4
    C 20 4 10 14 10 26
    C 10 34 14 40 20 44
    L 20 52
    C 20 56 24 58 28 58
    L 36 58
    C 40 58 44 56 44 52
    L 44 44
    C 50 40 54 34 54 26
    C 54 14 44 4 32 4
    Z
    M 24 30
    C 21 30 18 27 18 24
    C 18 21 21 18 24 18
    C 27 18 30 21 30 24
    C 30 27 27 30 24 30
    Z
    M 40 30
    C 37 30 34 27 34 24
    C 34 21 37 18 40 18
    C 43 18 46 21 46 24
    C 46 27 43 30 40 30
    Z
    M 24 44
    L 40 44
    C 42 44 44 46 44 48
    C 44 50 42 52 40 52
    L 24 52
    C 22 52 20 50 20 48
    C 20 46 22 44 24 44
    Z" fill="black"/>
</svg>
` as const;

export type MaskType = typeof SkullMask;
export default SkullMask; 