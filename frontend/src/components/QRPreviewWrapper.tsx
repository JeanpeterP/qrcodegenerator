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
  watermark: string;
  watermarkColor: string;
  watermarkOpacity: number;
  logo: {
    type: "stacked" | "open-box" | "closed-box" | "custom";
    src: string | null;
    width?: number;
    height?: number;
  } | null;
}

const FrameContainer = styled.div<{ frame: string | Frame; frameColor: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => {
    switch (typeof props.frame === 'object' ? props.frame.type : props.frame) {
      case 'simple':
        return `border: 4px solid ${props.frameColor};`;
      case 'rounded':
        return `
          border: 4px solid ${props.frameColor};
          border-radius: 16px;
        `;
      case 'fancy':
        return `
          border: 4px solid ${props.frameColor};
          border-radius: 16px;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        `;
      case 'colorful':
        return `
          position: relative;
          border: 4px solid transparent;
          border-radius: 16px;
          background-image: linear-gradient(#fff, #fff), 
                          linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeead);
          background-origin: border-box;
          background-clip: content-box, border-box;
        `;
      case 'chat':
        return `
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
  min-width: 300px;
  min-height: 300px;
  aspect-ratio: 1;
`;

const QRPreviewContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  & > div {
    transform: scale(1.5);
    transform-origin: center center;
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
  watermark,
  watermarkColor,
  watermarkOpacity,
  logo,
}) => {
  return (
    <FrameContainer frame={frame} frameColor={frameColor} className="qr-frame">
      <ScaleContainer>
        <div style={{ position: 'relative' }}>
          <Container className="qr-preview">
            <QRPreviewContainer>
              {children}
            </QRPreviewContainer>
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