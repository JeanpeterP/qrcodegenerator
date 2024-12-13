import React from 'react';
import styled from 'styled-components';

interface MarkerPreviewProps {
  styleType: string;
  markerColor: string;
}

export const MarkerPreview: React.FC<MarkerPreviewProps> = ({ styleType, markerColor }) => {
  return (
    <MarkerExampleContainer>
      <MarkerOuter styleType={styleType} markerColor={markerColor}>
        <MarkerInner styleType={styleType} markerColor={markerColor} />
      </MarkerOuter>
    </MarkerExampleContainer>
  );
};

// Styled Components
const MarkerExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const MarkerOuter = styled.div<{ styleType: string; markerColor: string }>`
  width: 42px;
  height: 42px;
  background-color: ${(props) => props.markerColor};
  display: flex;
  justify-content: center;
  align-items: center;
  
  ${props => {
    const type = props.styleType.replace('marker-', '').trim().toLowerCase();
    switch (type) {
      case 'dot':
        return 'border-radius: 50%;';
      case 'square':
        return 'border-radius: 0;';
      case 'rounded':
        return 'border-radius: 12px;';
      case 'diamond':
        return 'transform: rotate(45deg);';
      case 'hexagon':
        return `
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        `;
      case 'star':
        return `
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        `;
      case 'cross':
        return `
          clip-path: polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%);
        `;
      case 'flower':
        return `
          clip-path: path('M 50 0 C 60 35 90 40 100 50 C 90 60 60 65 50 100 C 40 65 10 60 0 50 C 10 40 40 35 50 0');
        `;
      case 'target':
        return `
          border-radius: 50%;
          box-shadow: 0 0 0 8px #f8f9fa, 0 0 0 16px ${props.markerColor};
        `;
      default:
        return 'border-radius: 0;';
    }
  }}
`;

const MarkerInner = styled.div<{ styleType: string; markerColor: string }>`
  width: 26px;
  height: 26px;
  background-color: #f8f9fa;
  
  ${props => {
    const type = props.styleType.replace('marker-', '').trim().toLowerCase();
    switch (type) {
      case 'dot':
        return 'border-radius: 50%;';
      case 'square':
        return 'border-radius: 0;';
      case 'rounded':
        return 'border-radius: 8px;';
      case 'diamond':
        return 'transform: rotate(0deg);';
      case 'hexagon':
        return `
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        `;
      case 'star':
        return `
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        `;
      case 'cross':
        return `
          clip-path: polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%);
        `;
      case 'flower':
        return `
          clip-path: path('M 50 0 C 60 35 90 40 100 50 C 90 60 60 65 50 100 C 40 65 10 60 0 50 C 10 40 40 35 50 0');
        `;
      case 'target':
        return 'border-radius: 50%;';
      default:
        return 'border-radius: 0;';
    }
  }}
`; 