import React from 'react';
import styled from 'styled-components';
import { getWatermarkSVG } from './getWatermarkSVG';

interface WatermarkOverlayProps {
  children: React.ReactNode;
  watermark: string;
  watermarkColor: string;
  opacity: number;
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  min-width: 200px;
  min-height: 200px;
`;

const QRCodeContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
`;

const WatermarkContainer = styled.div<{ opacity: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: ${props => props.opacity};
  pointer-events: none;
  mix-blend-mode: multiply;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 80%;
    height: 80%;
    fill: currentColor;
    color: ${props => props.color};
  }
`;

export const WatermarkOverlay: React.FC<WatermarkOverlayProps> = ({
  children,
  watermark,
  watermarkColor,
  opacity,
}) => {
  if (watermark === 'none') {
    return <>{children}</>;
  }

  const watermarkSVG = getWatermarkSVG(watermark, watermarkColor);

  return (
    <Container>
      <WatermarkContainer 
        opacity={opacity}
        color={watermarkColor}
        dangerouslySetInnerHTML={{ __html: watermarkSVG }}
      />
      <QRCodeContainer>
        {children}
      </QRCodeContainer>
    </Container>
  );
}; 