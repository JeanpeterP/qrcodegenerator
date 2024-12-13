import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { QrCode, DeviceMobile, X, DownloadSimple } from 'phosphor-react';
import { Preview } from "./Preview";
import { PhonePreview } from './PhonePreview/PhonePreview';
import { QRData, QRType } from '../types/qr';
import { AdvancedQRCode } from './AdvancedQRCode';
import { getMaskForShape } from '../utils/getMaskForShape';
import CutterMask from './CutterMask';
import { DotType as QRDotType } from "qr-code-styling";
import { Frame } from '../types';
import { LogoType } from './LogoCustomization';
import { QRPreviewWrapper } from './QRPreviewWrapper';
import ReactDOM from 'react-dom';

interface PreviewModalProps {
  previewType: 'qr' | 'phone';
  setPreviewType: (type: 'qr' | 'phone') => void;
  onClose: () => void;
  // Preview props
  qrCodeInstance: typeof AdvancedQRCode | null;
  handleDownload: (format: "png" | "svg") => Promise<void>;
  generateQRCodeData: () => Promise<string>;
  frame: string | Frame;
  setFrame: (frame: string | Frame) => void;
  shape: string;
  frameColor: string;
  setFrameColor: React.Dispatch<React.SetStateAction<string>>;
  frameThickness: number;
  setFrameThickness: React.Dispatch<React.SetStateAction<number>>;
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
  cutterShape: string;
  setCutterShape: React.Dispatch<React.SetStateAction<string>>;
  opacity: number;
  setOpacity: React.Dispatch<React.SetStateAction<number>>;
  cutter: string;
  cutterColor: string;
  watermark: string;
  watermarkColor: string;
  watermarkOpacity: number;
  setShape: React.Dispatch<React.SetStateAction<string>>;
  logo: {
    type: LogoType;
    src: string | null;
    width?: number;
    height?: number;
  } | null;
  logoColor: string;
  setLogoColor: React.Dispatch<React.SetStateAction<string>>;
  data: string;
  size: number;
  markerShape: string;
  markerColor: string;
  qrColor: string;
  setQRColor: React.Dispatch<React.SetStateAction<string>>;
  qrBackground: string;
  setQRBackground: React.Dispatch<React.SetStateAction<string>>;
  setLogo: React.Dispatch<React.SetStateAction<{
    type: LogoType;
    src: string | null;
    width?: number;
    height?: number;
  } | null>>;
  logoSize: number;
  setLogoSize: React.Dispatch<React.SetStateAction<number>>;
  setCutter: React.Dispatch<React.SetStateAction<string>>;
  setCutterColor: React.Dispatch<React.SetStateAction<string>>;
  setWatermark: React.Dispatch<React.SetStateAction<string>>;
  setWatermarkColor: React.Dispatch<React.SetStateAction<string>>;
  setWatermarkOpacity: React.Dispatch<React.SetStateAction<number>>;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  previewType,
  setPreviewType,
  onClose,
  qrCodeInstance,
  handleDownload,
  generateQRCodeData,
  frame,
  setFrame,
  shape,
  frameColor,
  setFrameColor,
  frameThickness,
  setFrameThickness,
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
  watermark,
  watermarkColor,
  watermarkOpacity,
  setShape,
  logo,
  logoColor,
  setLogoColor,
  data,
  size,
  markerShape,
  markerColor,
  qrColor,
  setQRColor,
  qrBackground,
  setQRBackground,
  setLogo,
  logoSize,
  setLogoSize,
  setCutter,
  setCutterColor,
  setWatermark,
  setWatermarkColor,
  setWatermarkOpacity,
}) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (qrCodeInstance && qrCodeRef.current) {
      const qrCodeDiv = qrCodeRef.current.querySelector('#qr-code') as HTMLElement;
      if (qrCodeDiv) {
        qrCodeDiv.innerHTML = '';
        ReactDOM.render(
          <AdvancedQRCode 
            data={data}
            size={size}
            markerShape={markerShape}
            markerColor={markerColor}
            shape={shape}
            qrColor={qrColor}
            hideBackground={false}
          />,
          qrCodeDiv
        );
      }
    }
  }, [qrCodeInstance, previewType]);

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
          {/* <ToggleButton
            active={previewType === 'phone'}
            onClick={() => setPreviewType('phone')}
          >
            <DeviceMobile /> Phone Preview
          </ToggleButton> */}
        </ModalToggleContainer>
        <PreviewContainer>
          {previewType === 'qr' && (
            <>
              <div ref={qrCodeRef}>
                <QRPreviewWrapper
                  cutter={cutter}
                  cutterColor={cutterColor}
                  opacity={opacity}
                  frame={frame}
                  frameColor={frameColor}
                  frameThickness={frameThickness}
                  watermark={watermark}
                  watermarkColor={watermarkColor}
                  watermarkOpacity={watermarkOpacity}
                  logo={logo}
                  markerShape={markerShape}
                  markerColor={markerColor}
                >
                  <div id="qr-code">
                    {qrCodeInstance && (
                      <div style={{ width: '100%', height: '100%' }} />
                    )}
                  </div>
                </QRPreviewWrapper>
              </div>
              <ModalDownloadButton onClick={() => handleDownload('png')}>
                <DownloadSimple size={20} weight="bold" />
              </ModalDownloadButton>
            </>
          )}
          {previewType === 'phone' && (
            <PhonePreview
              show={true}
              qrType={qrType}
              qrData={qrData}
              backgroundType={backgroundType}
              frame={frame}
              frameColor={frameColor}
              cutter={cutterShape}
              cutterColor={cutterColor}
              opacity={opacity}
              watermark={watermark}
              watermarkColor={watermarkColor}
              watermarkOpacity={watermarkOpacity}
              logo={logo}
              frameThickness={frameThickness}
              markerShape={markerShape}
              markerColor={markerColor}
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
  padding: 24px;
  max-width: 90%;
  width: 400px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

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
  width: 100%;
  overflow: hidden;
  #qr-code {
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    & > div {
      width: 100%;
      height: 100%;
    }
  }
  
  .qr-preview {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const ModalDownloadButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(255, 99, 32, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  padding: 0;
  z-index: 10;

  &:hover {
    background: #ff6320;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;
