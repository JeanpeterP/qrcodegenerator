import SantaClausMask from './SantaClausWatermark';
import SnowflakeMask from './SnowflakeWatermark';
import SkullMask from './SkullWatermark';
import CandyCaneMask from './CandyCaneWatermark';
import ReindeerMask from './ReindeerWatermark';
import ChristmasTreeMask from './ChristmasTreeWatermark';
export const getWatermarkSVG = (watermark: string, color: string): string => {
  switch (watermark) {
    case 'skull':
      return SkullMask.replace(/fill="currentColor"/g, `fill="${color}"`);
    case 'candycane':
      return CandyCaneMask.replace(/fill="currentColor"/g, `fill="${color}"`);
    case 'snowflake':
      return SnowflakeMask.replace(/fill="currentColor"/g, `fill="${color}"`);
    case 'santaclaus':
      return SantaClausMask.replace(/fill="currentColor"/g, `fill="${color}"`);
    case 'reindeer':
      return ReindeerMask.replace(/fill="currentColor"/g, `fill="${color}"`);
    case 'christmastree':
      return ChristmasTreeMask.replace(/fill="currentColor"/g, `fill="${color}"`);
    default:
      return '';
  }
}; 