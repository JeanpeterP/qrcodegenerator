import React, { useRef } from 'react';
import styled from 'styled-components';
import { QrCode, DeviceMobile, X } from 'phosphor-react';
import { Preview } from "./Preview";
import { PhonePreview } from './PhonePreview/PhonePreview';
import { QRData, QRType } from '../types/qr';
import QRCodeStyling from "qr-code-styling";
import { getMaskForShape } from '../utils/getMaskForShape';
import CutterMask from './CutterMask';

interface PreviewModalProps {
  previewType: 'qr' | 'phone';
  setPreviewType: (type: 'qr' | 'phone') => void;
  onClose: () => void;
  // Preview props
  qrCodeInstance: QRCodeStyling | null;
  handleDownload: (format: "png" | "svg") => Promise<void>;
  generateQRCodeData: () => Promise<string>;
  frame: string;
  shape: any; // Replace with proper DotType when available
  frameColor: string;
  qrType: QRType;
  generatedUrl: string | null;
  setGeneratedUrl: (url: string | null) => void;
  setGenerateQRCode: (value: boolean) => void;
  qrData: QRData;
  // Phone Preview props
  backgroundType: string;
  gradient: boolean;
  setGradient: (value: boolean) => void;
  gradientColor1: string;
  setGradientColor1: (color: string) => void;
  gradientColor2: string;
  setGradientColor2: (color: string) => void;
  gradientType: string;
  setGradientType: (type: string) => void;
  gradientRotation: number;
  setGradientRotation: (rotation: number) => void;
  cornerDots: string;
  setCornerDots: (dots: string) => void;
  cornerSquares: string;
  setCornerSquares: (squares: string) => void;
  currentFramePage: number;
  setCurrentFramePage: (page: number) => void;
  currentShapePage: number;
  setCurrentShapePage: (page: number) => void;
  customLogo: string | null;
  setCustomLogo: (logo: string | null) => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  buttonText: string;
  setButtonText: (text: string) => void;
  buttonColor: string;
  setButtonColor: (color: string) => void;
  dynamicBioType: string;
  setBackgroundType: (type: string) => void;
  // Add these new properties
  cutterShape: string;
  setCutterShape: React.Dispatch<React.SetStateAction<string>>;
  opacity: number;
  setOpacity: React.Dispatch<React.SetStateAction<number>>;
  cutter: string;
  cutterColor: string;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  previewType,
  setPreviewType,
  onClose,
  qrCodeInstance,
  handleDownload,
  generateQRCodeData,
  frame,
  shape,
  frameColor,
  qrType,
  generatedUrl,
  setGeneratedUrl,
  setGenerateQRCode,
  qrData,
  backgroundType,
  gradient,
  setGradient,
  gradientColor1,
  setGradientColor1,
  gradientColor2,
  setGradientColor2,
  gradientType,
  setGradientType,
  gradientRotation,
  setGradientRotation,
  cornerDots,
  setCornerDots,
  cornerSquares,
  setCornerSquares,
  currentFramePage,
  setCurrentFramePage,
  currentShapePage,
  setCurrentShapePage,
  customLogo,
  setCustomLogo,
  title,
  setTitle,
  description,
  setDescription,
  buttonText,
  setButtonText,
  buttonColor,
  setButtonColor,
  dynamicBioType,
  setBackgroundType,
  cutterShape,
  setCutterShape,
  opacity,
  setOpacity,
  cutter,
  cutterColor,
}) => {
  const qrCodeContainerRef = useRef<HTMLDivElement>(null);

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>
        <ModalToggleContainer>
          <ToggleButton
            active={previewType === 'qr'}
            onClick={() => setPreviewType('qr')}
          >
            <QrCode /> QR Preview
          </ToggleButton>
          <ToggleButton
            active={previewType === 'phone'}
            onClick={() => setPreviewType('phone')}
          >
            <DeviceMobile /> Phone Preview
          </ToggleButton>
        </ModalToggleContainer>
        <PreviewContainer>
          {previewType === 'qr' && (
            <div className="qr-preview" style={{ position: 'relative' }}>
              <div ref={qrCodeContainerRef} />
              {cutter !== 'none' && (
                <CutterMask
                  maskShape={cutter}
                  color={cutterColor}
                  opacity={opacity}
                />
              )}
            </div>
          )}
          {previewType === 'phone' && (
            <PhonePreview
              show={true}
              qrType={qrType}
              qrData={qrData}
              backgroundType={backgroundType}
            />
          )}
        </PreviewContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(27, 41, 75, 0.8); /* Unfocused background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 16px;
  max-width: 90%;
  width: 400px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ff6320;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #e0551c;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #333;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    color: #ff6320;
    transform: scale(1.1);
  }
`;

const ModalToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 24px 0 16px;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 8px 16px;
  background: ${props => props.active ? '#ff6320' : 'transparent'};
  color: ${props => props.active ? '#fff' : '#333'};
  border: 2px solid ${props => props.active ? '#ff6320' : '#e9ecef'};
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Aspekta 550', Arial, sans-serif;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.active ? '#ff6320' : '#e9ecef'};
    border-color: ${props => props.active ? '#ff6320' : '#ff6320'};
  }

  svg {
    margin-right: 8px;
    width: 20px;
    height: 20px;
  }
`;

const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
`;
