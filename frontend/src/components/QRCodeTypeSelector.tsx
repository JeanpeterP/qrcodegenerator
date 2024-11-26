import React from 'react';
import styled from 'styled-components';

// Import modern icons
import {
  FaLink,
  FaWifi,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaFilePdf,
  FaRegImage,
  FaAppStore,
  FaGooglePlay,
  FaListUl,
  FaVideo,
  FaMusic,
  FaFile,
} from 'react-icons/fa';

import { QRType } from './QRCodeGenerator';

interface QRCodeTypeSelectorProps {
  onSelect: (qrType: QRType) => void;
  onHover: (qrType: QRType) => void;
  userChoice: 'qr' | 'dynamicBio';
}

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Card = styled.button`
  width: calc(25% - 16px);
  min-width: 220px;
  background-color: #fff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease-in-out;
  overflow: hidden;

  &:hover {
    border-color: #ff6320;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const IconWrapper = styled.div`
  font-size: 40px;
  color: #ff6320;
  margin-bottom: 16px;
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  color: #1b294b;
  margin-bottom: 8px;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

export const QRCodeTypeSelector: React.FC<QRCodeTypeSelectorProps> = ({ onSelect, onHover, userChoice }) => {
  const qrOptions: { type: QRType; label: string; description: string; icon: any }[] = [
    { type: 'url', label: 'Website', description: 'Link to any website URL', icon: FaLink },
    { type: 'pdf', label: 'PDF', description: 'Show a PDF', icon: FaFilePdf },
    { type: 'image', label: 'Images', description: 'Share multiple images', icon: FaRegImage },
    { type: 'video', label: 'Video', description: 'Show a video', icon: FaVideo },
    { type: 'wifi', label: 'WiFi', description: 'Connect to a Wi-Fi network', icon: FaWifi },
    { type: 'email', label: 'Email', description: 'Send an email', icon: FaEnvelope },
    { type: 'app', label: 'App', description: 'Redirect to an app store', icon: FaAppStore },
    { type: 'multiplink', label: 'List of Links', description: 'Share multiple links', icon: FaListUl },
    { type: 'facebook', label: 'Facebook', description: 'Share your Facebook page', icon: FaFacebookF },
    { type: 'twitter', label: 'Twitter', description: 'Share your Twitter', icon: FaTwitter },
    { type: 'mp3', label: 'Music', description: 'Play an MP3 file', icon: FaMusic },
    { type: 'file', label: 'File', description: 'Share any file type', icon: FaFile },
  ];

  return (
    <GridContainer>
      {qrOptions.map((option) => {
        const IconComponent = option.icon;
        return (
          <Card key={option.type} onClick={() => onSelect(option.type)} onMouseEnter={() => onHover(option.type)}>
            <IconWrapper>
              <IconComponent />
            </IconWrapper>
            <CardTitle>{option.label}</CardTitle>
            <CardDescription>{option.description}</CardDescription>
          </Card>
        );
      })}
    </GridContainer>
  );
}; 