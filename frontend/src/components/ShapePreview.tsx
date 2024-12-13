import React from 'react';
import styled from 'styled-components';

interface ShapePreviewProps {
  shape: string;
}

export const ShapePreview: React.FC<ShapePreviewProps> = ({ shape }) => {
  return (
    <ShapeExampleContainer>
      <Dot shape={shape} />
    </ShapeExampleContainer>
  );
};

// Styled Components
const ShapeExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Dot = styled.div<{ shape: string }>`
  width: 42px;
  height: 42px;
  background-color: #000;

  ${props => {
    switch (props.shape) {
      case 'shape-circle':
        return 'border-radius: 50%;';
      case 'shape-square':
        return 'border-radius: 0;';
      case 'shape-diamond':
        return `
          transform: rotate(45deg);
          border-radius: 2px;
        `;
      case 'shape-hexagon':
        return `
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        `;
      case 'shape-star':
        return `
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        `;
      default:
        return 'border-radius: 0;';
    }
  }}
`; 