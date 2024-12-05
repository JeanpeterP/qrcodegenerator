import SkullMask from '../components/masks/SkullMask';
import CandyCaneMask from '../components/masks/CandyCaneMask';
import ReindeerMask from '../components/masks/ReindeerMask';
import ChristmasTreeMask from '../components/masks/ChristmasTreeMask';

export const getMaskForShape = (shape: string) => {
  const masks: { [key: string]: string } = {
    skull: SkullMask,
    candycane: CandyCaneMask,
    reindeer: ReindeerMask,
    christmastree: ChristmasTreeMask,
  };

  return masks[shape] || '';
}; 