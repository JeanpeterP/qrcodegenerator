import React from 'react';
import styled from 'styled-components';
import iphone16Frame from '../../images/iphone16pro.png';
import { File } from '../pageContent/File';
import { MultiLink } from '../pageContent/MultiLink';
import { YouTube } from '../pageContent/YouTube';
import colorfulBioMobile from '../../images/ColorFulBioMobile.png';
import colorfulBioDesktop from '../../images/ColorfulBioDesktop.png';

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
  background: transparent;
  align-items: center;
  padding: 20px;
  justify-content: center;
  position: relative;
  
  @media (max-width: 1200px) {
    display: none;
  }
`;

const PhoneFrame = styled.div<{ backgroundType: string }>`
  position: relative;
  width: 375px;
  height: 769px;
  z-index: 2;
  
  ${props => props.backgroundType === 'colorful' && `
    &::before {
      content: '';
      position: absolute;
      top: 19px;
      left: 20px;
      width: 335px;
      height: 733px;
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

const PhoneContent = styled.div<{ backgroundType: string }>`
  position: absolute;
  top: 69px;
  left: 20px;
  width: 335px;
  height: 639px;
  overflow-y: hidden;
  background-color: transparent;
  border-radius: 6px;
  z-index: 2;

  & > * {
    position: relative;
    z-index: 2;
    background-color: transparent;
  }
`;

const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #1b294b;
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
}

export const PhonePreview: React.FC<PhonePreviewProps> = ({ show, qrType, qrData, backgroundType }) => {
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
            <PhoneFrame backgroundType={backgroundType}>
                <PhoneContent backgroundType={backgroundType}>
                    {hasImplementedPreview(qrType) ? (
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