import React, { useRef, useEffect } from 'react';
import QRCodeStyling, { DotType, CornerSquareType } from "qr-code-styling";
import styled from 'styled-components';
import { Frame } from '../types';

interface MiniQRPreviewProps {
  frame: string | Frame;
  shape: DotType;
  frameColor: string;
  markerStyle: CornerSquareType;
  markerColor: string;
}

export const MiniQRPreview: React.FC<MiniQRPreviewProps> = ({ frame, shape, frameColor, markerStyle, markerColor }) => {
  const qrCodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const qrCode = new QRCodeStyling({
      width: frame === "chat" ? 32 : 58,
      height: frame === "chat" ? 32 : 58,
      data: "https://example.com",
      dotsOptions: {
        type: shape,
        color: "#000000",
      },
      cornersSquareOptions: {
        color: markerColor,
        type: markerStyle,
      },
      backgroundOptions: {
        color: "transparent",
      },
      qrOptions: {
        errorCorrectionLevel: 'H'
      }
    });

    if (qrCodeRef.current) {
      qrCodeRef.current.innerHTML = "";
      qrCode.append(qrCodeRef.current);
    }

    return () => {
      if (qrCodeRef.current) {
        qrCodeRef.current.innerHTML = "";
      }
    };
  }, [frame, shape, frameColor, markerStyle, markerColor]);

  return (
    <MiniPreviewContainer frame={frame} shape={shape} frameColor={frameColor}>
      <div ref={qrCodeRef} style={{ 
        width: frame === "chat" ? "28px" : "50px",
        height: frame === "chat" ? "28px" : "50px"
      }} />
    </MiniPreviewContainer>
  );
};

// Styled Components
const MiniPreviewContainer = styled.div<{ frame: string | Frame; shape: string; frameColor: string }>`
  width: ${props => props.frame === "chat" ? "32px" : "60px"};
  height: ${props => props.frame === "chat" ? "32px" : "55px"};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-top: ${(props) => (props.frame === "chat" ? "20px" : "0")};
  position: relative;
  padding: 2px;

  ${(props) =>
    props.frame === "simple" &&
    `
    border: 2px solid ${props.frameColor};
    border-radius: 0;
  `}

  ${(props) =>
    props.frame === "rounded" &&
    `
    border: 2px solid ${props.frameColor};
    border-radius: 8px;
  `}

  ${(props) =>
    props.frame === "fancy" &&
    `
    border: 2px solid ${props.frameColor};
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0,0,0,0.3);
  `}

  ${(props) =>
    props.frame === "chat" &&
    `
    border: 2px solid ${props.frameColor};
    border-radius: 8px;
    
    &::before {
      content: "Scan Me";
      position: absolute;
      top: -28px;
      left: 50%;
      transform: translateX(-50%);
      background: ${props.frameColor};
      color: white;
      padding: 3px 8px;
      border-radius: 8px;
      font-size: 8px;
      white-space: nowrap;
      font-weight: bold;
      box-shadow: 0 1px 2px rgba(0,0,0,0.2);
      z-index: 2;
    }

    &::after {
      content: "";
      position: absolute;
      top: -14px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 10px solid ${props.frameColor};
      z-index: 1;
    }
  `}

  ${(props) => {
    if (
      typeof props.frame === 'object' &&
      props.frame !== null &&
      'type' in props.frame &&
      props.frame.type === 'colorful'
    ) {
      return `
        border: 2px solid;
        border-image: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeead) 1;
        border-radius: 8px;
      `;
    }
    return '';
  }}

  & > div {
    width: ${props => props.frame === "chat" ? "24px" : "50px"} !important;
    height: ${props => props.frame === "chat" ? "24px" : "50px"} !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  canvas {
    width: ${props => props.frame === "chat" ? "32px" : "50px"} !important;
    height: ${props => props.frame === "chat" ? "32px" : "50px"} !important;
    position: relative !important;
  }
`; 

const ColorPickerLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: #616568;

  input {
    margin-left: 0.5rem;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`; 

const LogoOption = styled.div<{ active: boolean }>`
  border: 2px solid ${(props) => (props.active ? "#ff6320" : "#ced4da")};
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => (props.active ? "#fff5f0" : "white")};
  transition: all 0.3s ease;

  &:hover {
    border-color: #ff6320;
    background-color: #fff5f0;
  }
`; 