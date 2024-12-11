import React from 'react';
import styled from 'styled-components';

interface ShapePreviewProps {
  shape: string;
}

export const ShapePreview: React.FC<ShapePreviewProps> = ({ shape }) => {
  return (
    <ShapeExampleContainer>
      <DotRow>
        <Dot shape={shape} />
        <Dot shape={shape} />
        <Dot shape={shape} />
      </DotRow>
      <DotRow>
        <Dot shape={shape} />
        <Dot shape={shape} />
        <Dot shape={shape} />
      </DotRow>
      <DotRow>
        <Dot shape={shape} />
        <Dot shape={shape} />
        <Dot shape={shape} />
      </DotRow>
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

const DotRow = styled.div`
  display: flex;
  gap: 2px;
  justify-content: center;
`;

const Dot = styled.div<{ shape: string }>`
  width: 12px;
  height: 12px;
  background-color: #000;

  ${props => {
    switch (props.shape) {
      case 'dots':
        return 'border-radius: 50%;';
      case 'rounded':
        return 'border-radius: 2px;';
      case 'classy':
        return `
          transform: rotate(45deg);
          border-radius: 1px;
        `;
      case 'classy-rounded':
        return `
          transform: rotate(45deg);
          border-radius: 2px;
        `;
      case 'extra-rounded':
        return 'border-radius: 4px;';
      default: // square
        return 'border-radius: 0;';
    }
  }}
`; 