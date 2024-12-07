import React from 'react';
import styled from 'styled-components';
import { getWatermarkSVG } from './watermarks/getWatermarkSVG';

interface QRPreviewWrapperProps {
  children: React.ReactNode;
  cutter: string;
  cutterColor: string;
  opacity: number;
  frame: string;
  frameColor: string;
  watermark: string;
  watermarkColor: string;
  watermarkOpacity: number;
}

const FrameContainer = styled.div<{ frame: string; frameColor: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.frame === 'simple' &&
    `
    border: 4px solid ${props.frameColor};
  `}

  ${(props) =>
    props.frame === 'rounded' &&
    `
    border: 4px solid ${props.frameColor};
    border-radius: 16px;
  `}

  ${(props) =>
    props.frame === 'fancy' &&
    `
    border: 4px solid ${props.frameColor};
    border-radius: 16px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  `}

  ${(props) =>
    props.frame === 'chat' &&
    `
    border: 4px solid ${props.frameColor};
    border-radius: 16px;
    
    &::before {
      content: 'Scan Me';
      position: absolute;
      top: -65px;
      left: 50%;
      transform: translateX(-50%);
      background: ${props.frameColor};
      color: white;
      padding: 12px 24px;
      border-radius: 16px;
      font-size: 18px;
      white-space: nowrap;
      font-weight: bold;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    &::after {
      content: '';
      position: absolute;
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-top: 20px solid ${props.frameColor};
    }
  `}
`;

const ScaleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QRPreviewContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const WatermarkContainer = styled.div<{ svg: string; opacity: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.opacity};
  pointer-events: none;
  background-image: url('data:image/svg+xml;base64,${props => btoa(props.svg)}');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

export const QRPreviewWrapper: React.FC<QRPreviewWrapperProps> = ({
  children,
  cutter,
  cutterColor,
  opacity,
  frame,
  frameColor,
  watermark,
  watermarkColor,
  watermarkOpacity,
}) => {
  return (
    <FrameContainer frame={frame} frameColor={frameColor}>
      <ScaleContainer>
        <div style={{ position: 'relative' }}>
          <QRPreviewContainer className="qr-preview">
            {children}
          </QRPreviewContainer>
          {watermark !== 'none' && (
            <WatermarkContainer
              svg={getWatermarkSVG(watermark, watermarkColor)}
              opacity={watermarkOpacity}
            />
          )}
        </div>
      </ScaleContainer>
    </FrameContainer>
  );
}; 