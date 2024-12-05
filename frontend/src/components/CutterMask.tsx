import React from 'react';
import SkullMask from './masks/SkullMask';
import CandyCaneMask from './masks/CandyCaneMask';
import SnowflakeMask from './masks/SnowflakeMask';
import SantaClausMask from './masks/SantaClausMask';
import ReindeerMask from './masks/ReindeerMask';
import ChristmasTreeMask from './masks/ChristmasTreeMask';

interface CutterMaskProps {
  maskShape: string;
  color: string;
  opacity: number;
}

const CutterMask: React.FC<CutterMaskProps> = ({ maskShape, color, opacity }) => {
  switch (maskShape) {
    case 'skull':
      return React.createElement(SkullMask, { fill: color });
    case 'candycane':
      return React.createElement(CandyCaneMask, { fill: color });
    case 'snowflake':
      return React.createElement(SnowflakeMask, { fill: color });
    case 'santaclaus':
      return React.createElement(SantaClausMask, { fill: color });
    case 'reindeer':
      return React.createElement(ReindeerMask, { fill: color });
    case 'christmastree':
      return React.createElement(ChristmasTreeMask, { fill: color });
    default:
      return null;
  }
};

export default CutterMask;