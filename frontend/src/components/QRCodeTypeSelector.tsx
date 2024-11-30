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
  FaCube,
  FaBitcoin,
  FaIdBadge,
  FaMicrochip,
} from 'react-icons/fa';

import { QRType } from '../types/qr';

interface QRCodeTypeSelectorProps {
  onSelect: (type: QRType) => void;
  onHover: (type: QRType) => void;
  selectedType: QRType;
  userChoice: 'qr' | 'dynamicBio' | null;
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  width: 100%;
  max-height: 320px;
  overflow-y: auto;
  padding-right: 8px;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
`;

const Card = styled.button<{ selected?: boolean }>`
  width: 100%;
  background-color: #fff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 12px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: 12px;

  &:hover {
    border-color: #ff6320;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  ${props => props.selected && `
    border-color: #ff6320;
    background-color: #fff5f0;
  `}
`;

const IconWrapper = styled.div`
  font-size: 24px;
  color: #ff6320;
`;

const CardTitle = styled.h3`
  font-size: 0.875rem;
  color: #1b294b;
  margin: 0;
`;

export const QRCodeTypeSelector: React.FC<QRCodeTypeSelectorProps> = ({ onSelect, onHover, selectedType, userChoice }) => {
  const qrOptions: { type: QRType; label: string; icon: any }[] = [
    { type: 'url', label: 'Website', icon: FaLink },
    { type: 'pdf', label: 'PDF', icon: FaFilePdf },
    { type: 'image', label: 'Images', icon: FaRegImage },
    { type: 'video', label: 'Video', icon: FaVideo },
    { type: 'wifi', label: 'WiFi', icon: FaWifi },
    { type: 'email', label: 'Email', icon: FaEnvelope },
    { type: 'app', label: 'App', icon: FaAppStore },
    { type: 'multiplink', label: 'List of Links', icon: FaListUl },
    { type: 'facebook', label: 'Facebook', icon: FaFacebookF },
    { type: 'twitter', label: 'Twitter', icon: FaTwitter },
    { type: 'mp3', label: 'Music', icon: FaMusic },
    { type: 'file', label: 'File', icon: FaFile },
    { type: 'ar', label: 'AR Experience', icon: FaCube },
    { type: 'crypto', label: 'Cryptocurrency', icon: FaBitcoin },
    { type: 'dynamicVcard', label: 'Dynamic vCard', icon: FaIdBadge },
    { type: 'iotConfig', label: 'IoT Config', icon: FaMicrochip },
  ];

  return (
    <GridContainer>
      {qrOptions.map((option) => {
        const IconComponent = option.icon;
        return (
          <Card key={option.type} onClick={() => onSelect(option.type)} onMouseEnter={() => onHover(option.type)} selected={selectedType === option.type}>
            <IconWrapper>
              <IconComponent />
            </IconWrapper>
            <CardTitle>{option.label}</CardTitle>
          </Card>
        );
      })}
    </GridContainer>
  );
}; 