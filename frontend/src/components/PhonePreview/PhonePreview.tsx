import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import iphone16Frame from '../../images/iphone16pro.png';
import { File } from '../pageContent/File';
import { MultiLink } from '../pageContent/MultiLink';
import { YouTube } from '../pageContent/YouTube';
import colorfulBioMobile from '../../images/ColorFulBioMobile.png';
import colorfulBioDesktop from '../../images/ColorfulBioDesktop.png';
import { DownloadSimple } from '@phosphor-icons/react';

const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  text-align: center;
`;

const PlaceholderText = styled.p`
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin-top: 16px;
`;

const PlaceholderIcon = styled.div`
  width: 64px;
  height: 64px;
  background-color: #f0f0f0;
  border-radius: 50%;
  margin-bottom: 16px;
`;

const PreviewColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;

`;

const PhonePreviewColumn = styled(PreviewColumn)<{ show: boolean }>`
  display: ${props => props.show ? 'flex' : 'none'};
  max-width: 375px;
  width: 100%;
  background: transparent;
  align-items: center;
  padding: 20px;
  justify-content: center;
  position: relative;
  
  @media (max-width: 1200px) {
    max-width: 300px;
    padding: 10px;
  }

  @media (max-width: 900px) {
    max-width: 375px;
    padding: 20px;
  }

  @media (max-width: 470px) {
    max-width: 300px;
    padding: 10px;
  }
`;

const PhoneFrame = styled.div<{ backgroundType: string; isQRPreview?: boolean }>`
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 375/769;
  z-index: 2;
  
  ${props => !props.isQRPreview && props.backgroundType === 'colorful' && `
    &::before {
      content: '';
      position: absolute;
      top: 2.5%;
      left: 5.3%;
      width: 89.3%;
      height: 95.3%;
      background-image: url(${colorfulBioMobile});
      background-size: cover;
      background-position: center;
      border-radius: 25px;
      z-index: 1;
    }
  `}

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${iphone16Frame}) no-repeat center center;
    background-size: contain;
    z-index: 3;
    pointer-events: none;
  }
`;

const PhoneContent = styled.div<{ backgroundType: string; isQRPreview?: boolean }>`
  position: absolute;
  top: 9%;
  left: 5.3%;
  width: 89.3%;
  height: 83%;
  overflow-y: hidden;
  background-color: ${props => props.isQRPreview ? '#ffffff' : 'transparent'};
  border-radius: 6px;
  z-index: 2;
  display: ${props => props.isQRPreview ? 'flex' : 'block'};
  justify-content: center;
  align-items: center;

  & > * {
    position: relative;
    z-index: 2;
    background-color: transparent;
  }

  ${props => props.isQRPreview && `
    & > div {
      transform: scale(0.8);
    }
  `}
`;

const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #1b294b;
`;

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

interface PhonePreviewProps {
    show: boolean;
    qrType: string;
    qrData: {
        file?: {
            title?: string;
            description?: string;
            buttonColor?: string;
            buttonText?: string;
        };
        contentData?: {
            title?: string;
            description?: string;
            logoUrl?: string;
            links?: Array<{ label: string; url: string; _id?: string }>;
        };
        youtube?: {
            url: string;
        };
    };
    backgroundType: string;
    isQRPreview?: boolean;
    qrCodeRef?: React.RefObject<HTMLDivElement>;
    frame: string;
    frameColor: string;
}

export const PhonePreview: React.FC<PhonePreviewProps> = ({ 
    show, 
    qrType, 
    qrData, 
    backgroundType,
    isQRPreview = false,
    qrCodeRef,
    frame,
    frameColor,
}) => {
    const hasImplementedPreview = (type: string) => {
        return ['file', 'multiplink', 'youtube'].includes(type);
    };

    const renderPlaceholderContent = () => {
        return (
            <PlaceholderContainer>
                <PlaceholderIcon />
                <PlaceholderText>
                    Preview not available yet.
                    <br />
                    Select this type to create your QR code.
                </PlaceholderText>
            </PlaceholderContainer>
        );
    };

    return (
        <PhonePreviewColumn show={show}>
            <PhoneFrame backgroundType={backgroundType} isQRPreview={isQRPreview}>
                <PhoneContent 
                    backgroundType={backgroundType} 
                    isQRPreview={isQRPreview}
                >
                    {isQRPreview ? (
                        <FrameContainer frame={frame} frameColor={frameColor}>
                            <div ref={qrCodeRef} />
                        </FrameContainer>
                    ) : (
                        hasImplementedPreview(qrType) ? (
                            <>
                                {qrType === 'file' && qrData.file && (
                                    <File
                                        fileData={{
                                            title: qrData.file.title,
                                            description: qrData.file.description,
                                            buttonColor: qrData.file.buttonColor,
                                            buttonText: qrData.file.buttonText,
                                            isPreview: true,
                                        }}
                                    />
                                )}
                                {qrType === 'multiplink' && qrData.contentData && (
                                    <MultiLink
                                        contentData={{
                                            title: qrData.contentData.title,
                                            description: qrData.contentData.description,
                                            logoUrl: qrData.contentData.logoUrl,
                                            links: qrData.contentData.links,
                                            isPreview: true,
                                        }}
                                    />
                                )}
                                {qrType === 'youtube' && qrData.youtube && (
                                    <YouTube
                                        youtubeData={qrData.youtube}
                                        isPreview={true}
                                    />
                                )}
                            </>
                        ) : (
                            renderPlaceholderContent()
                        )
                    )}
                </PhoneContent>
            </PhoneFrame>
        </PhonePreviewColumn>
    );
};

const PhoneContainer = styled.div`
    // Existing styles
`;

const Screen = styled.div<{ backgroundType: string }>`
    // Existing styles
    background-image: url(/images/backgrounds/${(props) => props.backgroundType}Mobile.png);
    background-size: cover;
    background-position: center;

    @media (min-width: 768px) {
        background-image: url(/images/backgrounds/${(props) => props.backgroundType}Desktop.png);
    }
`;

interface PreviewProps {
  qrCodeInstance: any;
  handleDownload: () => void;
  frame: string;
  shape: string;
  frameColor: string;
  qrType: string;
  generatedUrl: string;
  setGeneratedUrl: React.Dispatch<React.SetStateAction<string>>;
  setGenerateQRCode: React.Dispatch<React.SetStateAction<boolean>>;
  qrData: any;
  cutterShape: string;
  previewType: 'qr' | 'preview';
}

export const Preview: React.FC<PreviewProps> = (props) => {
  const {
    qrCodeInstance,
    handleDownload,
    frame,
    shape,
    frameColor,
    qrType,
    generatedUrl,
    setGeneratedUrl,
    setGenerateQRCode,
    qrData,
    cutterShape,
    previewType,
  } = props;

  const qrCodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (qrCodeInstance && qrCodeRef.current) {
      qrCodeInstance.clear();
      qrCodeInstance.makeCode(generatedUrl);
    }
  }, [qrCodeInstance, generatedUrl]);

  const handleDownloadClick = () => {
    handleDownload();
  };

  return (
    <>
      <PhonePreview
        show={true}
        qrType={qrType}
        qrData={qrData}
        backgroundType="none"
        isQRPreview={previewType === 'qr'}
        qrCodeRef={qrCodeRef}
        frame={frame}
        frameColor={frameColor}
      />
      {previewType === 'qr' && (
        <PreviewDownloadButton onClick={handleDownloadClick}>
          <DownloadSimple size={20} weight="bold" />
        </PreviewDownloadButton>
      )}
    </>
  );
};

const PreviewDownloadButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #fff;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;