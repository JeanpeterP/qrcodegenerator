import React from 'react';
import styled from 'styled-components';
import SkullMask from './masks/SkullMask';
import CandyCaneMask from './masks/CandyCaneMask';
import ReindeerMask from './masks/ReindeerMask';
import ChristmasTreeMask from './masks/ChristmasTreeMask';

interface PreviewProps {
  type: string;
  selected: boolean;
  onClick: () => void;
}

const PreviewContainer = styled.div<{ selected: boolean }>`
  width: 60px;
  height: 60px;
  border: 2px solid ${props => props.selected ? '#ff6320' : '#e0e0e0'};
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ff6320;
    transform: translateY(-2px);
  }

  svg {
    width: 100%;
    height: 100%;
    fill: ${props => props.selected ? '#ff6320' : '#333'};
  }
`;

const PreviewLabel = styled.div<{ selected: boolean }>`
  font-size: 12px;
  color: ${props => props.selected ? '#ff6320' : '#666'};
  text-align: center;
  margin-top: 4px;
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CutterPreview: React.FC<PreviewProps> = ({ type, selected, onClick }) => {
  const getMaskSVG = () => {
    const masks: { [key: string]: string } = {
      skull: SkullMask,
      candycane: CandyCaneMask,
      reindeer: ReindeerMask,
      christmastree: ChristmasTreeMask,
    };

    return masks[type] || '';
  };

  const getLabel = () => {
    const labels: { [key: string]: string } = {
      skull: 'Skull',
      candycane: 'Candy Cane',
      reindeer: 'Reindeer',
      christmastree: 'Christmas Tree',
      none: 'None'
    };
    return labels[type] || type;
  };

  return (
    <PreviewWrapper>
      {type === 'none' ? (
        <PreviewContainer selected={selected} onClick={onClick}>
          None
        </PreviewContainer>
      ) : (
        <PreviewContainer 
          selected={selected} 
          onClick={onClick}
          dangerouslySetInnerHTML={{ __html: getMaskSVG() }}
        />
      )}
      <PreviewLabel selected={selected}>
        {getLabel()}
      </PreviewLabel>
    </PreviewWrapper>
  );
}; 