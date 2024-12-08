import React from 'react';
import styled from 'styled-components';
import { getWatermarkSVG } from './watermarks/getWatermarkSVG';

interface WatermarkPreviewProps {
  type: string;
  color: string;
  opacity: number;
}

const PreviewContainer = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    color: ${props => props.color};
  }
`;

export const WatermarkPreview: React.FC<WatermarkPreviewProps> = ({ type, color }) => {
  if (type === 'none') {
    return <PreviewContainer>-</PreviewContainer>;
  }

  const watermarkSVG = getWatermarkSVG(type, color);

  return (
    <PreviewContainer 
      color={color}
      dangerouslySetInnerHTML={{ __html: watermarkSVG }}
    />
  );
}; 