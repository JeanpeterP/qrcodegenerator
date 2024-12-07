import React from 'react';

const SnowflakeMask = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path d="
    M 30 4
    L 34 4
    L 34 60
    L 30 60
    Z
    M 14 10
    L 17 13
    L 47 53
    L 44 56
    Z
    M 50 10
    L 47 13
    L 17 53
    L 14 56
    Z
    M 4 30
    L 4 34
    L 60 34
    L 60 30
    Z
    M 14 14
    L 17 17
    L 47 47
    L 44 50
    Z
    M 50 14
    L 47 17
    L 17 47
    L 14 50
    Z
    M 22 6
    L 26 8
    L 42 58
    L 38 60
    Z
    M 42 6
    L 38 8
    L 22 58
    L 26 60
    Z" fill="black"/>
  <circle cx="32" cy="32" r="4" fill="black"/>
</svg>
` as const;

export type MaskType = typeof SnowflakeMask;
export default SnowflakeMask;
