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
}

const CutterMask: React.FC<CutterMaskProps> = ({ maskShape, color }) => {
  const getMaskSVG = () => {
    switch (maskShape) {
      case 'skull':
        return SkullMask.replace('fill="black"', `fill="${color}"`);
      case 'candycane':
        return CandyCaneMask.replace('fill="black"', `fill="${color}"`);
      case 'snowflake':
        return SnowflakeMask.replace('fill="black"', `fill="${color}"`);
      case 'santaclaus':
        return SantaClausMask.replace('fill="black"', `fill="${color}"`);
      case 'reindeer':
        return ReindeerMask.replace('fill="black"', `fill="${color}"`);
      case 'christmastree':
        return ChristmasTreeMask.replace('fill="black"', `fill="${color}"`);
      default:
        return '';
    }
  };

  const maskSVG = getMaskSVG();
  if (!maskSVG) return null;

  return <div dangerouslySetInnerHTML={{ __html: maskSVG }} />;
};

export default CutterMask;