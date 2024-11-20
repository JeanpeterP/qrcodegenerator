import React from 'react';
import styled from 'styled-components';
import { CornerSquareType } from "qr-code-styling";

interface MarkerPreviewProps {
  styleType: CornerSquareType;
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

const MarkerOuter = styled.div<{ styleType: CornerSquareType; markerColor: string }>`
  width: 42px;
  height: 42px;
  background-color: ${(props) => props.markerColor};
  display: flex;
  justify-content: center;
  align-items: center;
  
  ${props => {
    switch (props.styleType) {
      case 'dot':
        return 'border-radius: 50%;';
      case 'extra-rounded':
        return 'border-radius: 12px;';
      case 'square':
        return 'border-radius: 0;';
      default:
        return 'border-radius: 0;';
    }
  }}
`;

const MarkerInner = styled.div<{ styleType: CornerSquareType; markerColor: string }>`
  width: 26px;
  height: 26px;
  background-color: #f8f9fa;
  
  ${props => {
    switch (props.styleType) {
      case 'dot':
        return 'border-radius: 50%;';
      case 'extra-rounded':
        return 'border-radius: 8px;';
      case 'square':
        return 'border-radius: 0;';
      default:
        return 'border-radius: 0;';
    }
  }}
`; 