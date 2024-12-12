import React from 'react';
import styled from 'styled-components';
import { getWatermarkSVG } from './watermarks/getWatermarkSVG';
import { Frame } from '../types';

interface QRPreviewWrapperProps {
  children: React.ReactNode;
  cutter: string;
  cutterColor: string;
  opacity: number;
  frame: string | Frame;
  frameColor: string;
  frameThickness: number;
  watermark: string;
  watermarkColor: string;
  watermarkOpacity: number;
  logo: {
    type: "stacked" | "open-box" | "closed-box" | "custom";
    src: string | null;
    width?: number;
    height?: number;
  } | null;
  markerShape: string;
  markerColor: string;
}

const FrameContainer = styled.div<{ frame: string | Frame; frameColor: string; frameThickness: number }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  padding: 2px;

  ${(props) => {
    const thickness = `${props.frameThickness}px`;
    
    switch (typeof props.frame === 'object' ? props.frame.type : props.frame) {
      case 'simple':
        return `border: ${thickness} solid ${props.frameColor};`;
      case 'rounded':
        return `
          border: ${thickness} solid ${props.frameColor};
          border-radius: 16px;
        `;
      case 'fancy':
        return `
          border: ${thickness} solid ${props.frameColor};
          border-radius: 16px;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        `;
      default:
        return '';
    }
  }}
`;

const ScaleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 300px;
  height: 300px;
  aspect-ratio: 1;
`;

const QRPreviewContainer = styled.div<QRPreviewWrapperProps>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;

  #qr-code {
    width: 90%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
      width: 100%;
      height: 100%;
      transform: scale(1.2);
      transform-origin: center;
    }
  }
`;

const WatermarkContainer = styled.div<{ svg: string; opacity: number }>`
  position: absolute;
  inset: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  opacity: ${props => props.opacity};
  pointer-events: none;
  background-image: url('data:image/svg+xml;base64,${props => btoa(props.svg)}');
  background-size: 80% 80%;
  background-position: center;
  background-repeat: no-repeat;
  transform: scale(1.3);
  transform-origin: center;
`;

export const QRPreviewWrapper: React.FC<QRPreviewWrapperProps> = ({
  children,
  cutter,
  cutterColor,
  opacity,
  frame,
  frameColor,
  frameThickness,
  watermark,
  watermarkColor,
  watermarkOpacity,
  logo,
  markerShape,
  markerColor,
}) => {
  return (
    <FrameContainer 
      frame={frame} 
      frameColor={frameColor}
      frameThickness={frameThickness}
    >
      <ScaleContainer>
        <div style={{ position: 'relative' }}>
          <Container className="qr-preview">
            <QRPreviewContainer
              children={children}
              frame={frame}
              frameColor={frameColor}
              frameThickness={frameThickness}
              cutter={cutter}
              cutterColor={cutterColor}
              opacity={opacity}
              watermark={watermark}
              watermarkColor={watermarkColor}
              watermarkOpacity={watermarkOpacity}
              logo={logo}
              markerShape={markerShape}
              markerColor={markerColor}
            />
            {watermark !== 'none' && (
              <WatermarkContainer
                svg={getWatermarkSVG(watermark, watermarkColor)}
                opacity={watermarkOpacity}
              />
            )}
          </Container>
        </div>
      </ScaleContainer>
    </FrameContainer>
  );
}; 