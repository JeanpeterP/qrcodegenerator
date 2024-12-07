import React, { useRef } from 'react';
import styled from 'styled-components';
import SkullMask from '../masks/SkullMask';
import CandyCaneMask from '../masks/CandyCaneMask';
import SnowflakeMask from '../masks/SnowflakeMask';
import SantaClausMask from './SantaClausWatermark';
import ReindeerMask from '../masks/ReindeerMask';
import ChristmasTreeMask from '../masks/ChristmasTreeMask';

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

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const WatermarkOverlay: React.FC<WatermarkOverlayProps> = ({
  children,
  watermark,
  watermarkColor,
  opacity,
}) => {
  const qrContainerRef = useRef<HTMLDivElement>(null);

  const getWatermarkSVG = () => {
    switch (watermark) {
      case 'skull':
        return SkullMask.replace('fill="black"', `fill="${watermarkColor}"`);
      case 'candycane':
        return CandyCaneMask.replace('fill="black"', `fill="${watermarkColor}"`);
      case 'snowflake':
        return SnowflakeMask.replace('fill="black"', `fill="${watermarkColor}"`);
      case 'santaclaus':
        return SantaClausMask.replace('fill="black"', `fill="${watermarkColor}"`);
      case 'reindeer':
        return ReindeerMask.replace('fill="black"', `fill="${watermarkColor}"`);
      case 'christmastree':
        return ChristmasTreeMask.replace('fill="black"', `fill="${watermarkColor}"`);
      default:
        return null;
    }
  };

  const watermarkSVG = getWatermarkSVG();
  if (!watermarkSVG) {
    return <>{children}</>;
  }

  return (
    <Container>
      <QRCodeContainer ref={qrContainerRef}>
        {children}
      </QRCodeContainer>
      <WatermarkContainer 
        opacity={opacity} 
        dangerouslySetInnerHTML={{ __html: watermarkSVG }}
      />
    </Container>
  );
}; 