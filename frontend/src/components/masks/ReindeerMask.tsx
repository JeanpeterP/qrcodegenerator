import React from 'react';

const ReindeerMask = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path d="
    M 32 8
    C 18 8 8 18 8 32
    C 8 46 18 56 32 56
    C 46 56 56 46 56 32
    C 56 18 46 8 32 8
    Z
    M 20 28
    C 22 28 24 30 24 32
    C 24 34 22 36 20 36
    C 18 36 16 34 16 32
    C 16 30 18 28 20 28
    Z
    M 44 28
    C 46 28 48 30 48 32
    C 48 34 46 36 44 36
    C 42 36 40 34 40 32
    C 40 30 42 28 44 28
    Z
    M 32 40
    C 28 40 24 42 24 44
    C 24 46 28 48 32 48
    C 36 48 40 46 40 44
    C 40 42 36 40 32 40
    Z" fill="black"/>
  <path d="
    M 12 12
    C 8 16 4 12 4 8
    C 4 4 8 0 12 4
    C 16 8 16 8 12 12
    Z" fill="black"/>
  <path d="
    M 52 12
    C 48 16 48 8 52 4
    C 56 0 60 4 60 8
    C 60 12 56 16 52 12
    Z" fill="black"/>
</svg>
` as const;

export type MaskType = typeof ReindeerMask;
export default ReindeerMask; 