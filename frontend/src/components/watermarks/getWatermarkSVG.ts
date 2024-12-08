import SantaClausMask from './SantaClausWatermark';

export const getWatermarkSVG = (watermark: string, color: string): string => {
  switch (watermark) {
    // case 'skull':
    //   return SkullMask.replace('fill="black"', `fill="${color}"`);
    // case 'candycane':
    //   return CandyCaneMask.replace('fill="black"', `fill="${color}"`);
    // case 'snowflake':
    //   return SnowflakeMask.replace('fill="black"', `fill="${color}"`);
    case 'santaclaus':
      return SantaClausMask.replace(/fill="currentColor"/g, `fill="${color}"`);
    // case 'reindeer':
    //   return ReindeerMask.replace('fill="black"', `fill="${color}"`);
    // case 'christmastree':
    //   return ChristmasTreeMask.replace('fill="black"', `fill="${color}"`);
    default:
      return '';
  }
}; 