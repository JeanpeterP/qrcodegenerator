import React, { useRef, useEffect } from 'react';
import QRCodeStyling, { DotType, CornerSquareType } from "qr-code-styling";
import styled from 'styled-components';

interface MiniQRPreviewProps {
  frame: string;
  shape: DotType;
  frameColor: string;
  markerStyle: CornerSquareType;
  markerColor: string;
}

export const MiniQRPreview: React.FC<MiniQRPreviewProps> = ({ frame, shape, frameColor, markerStyle, markerColor }) => {
  const qrCodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const qrCode = new QRCodeStyling({
      width: 58,
      height: 58,
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
      <div ref={qrCodeRef} />
    </MiniPreviewContainer>
  );
};

// Styled Components
const MiniPreviewContainer = styled.div<{ frame: string; shape: string; frameColor: string }>`
  width: 60px;
  height: 60px;
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
      top: -25px;
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
    }

    &::after {
      content: "";
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 8px solid ${props.frameColor};
    }
  `}

  & > div {
    width: 50px !important;
    height: 50px !important;
    position: relative !important;
    left: 0 !important;
    top: 0 !important;
    transform: none !important;
  }

  canvas {
    width: 100% !important;
    height: 100% !important;
    position: relative !important;
    left: 0 !important;
    top: 0 !important;
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