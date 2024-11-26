import React from 'react';
import styled from 'styled-components';
import iphone16Frame from '../../images/iphone16pro.png';
import { File } from '../pageContent/File';
import { MultiLink } from '../pageContent/MultiLink';
import { YouTube } from '../pageContent/YouTube';

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
  background: #f8f9fa;
  align-items: center;
  padding: 20px;
  justify-content: center;

  
  @media (max-width: 1200px) {
    display: none;
  }
`;

const PhoneFrame = styled.div`
  position: relative;
  width: 375px;
  height: 769px;
  background: url(${iphone16Frame}) no-repeat center center;
  background-size: cover;
`;

const PhoneContent = styled.div`
  position: absolute;
  top: 66px;
  left: 26px;
  width: 321px;
  height: 637px;
  overflow-y: hidden;
  background-color: #fff;
  border-radius: 40px;
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
}

export const PhonePreview: React.FC<PhonePreviewProps> = ({ show, qrType, qrData }) => {
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
            <PhoneFrame>
                <PhoneContent>
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