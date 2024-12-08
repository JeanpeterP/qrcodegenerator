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

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 470px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.button<{ selected?: boolean }>`
  width: 100%;
  min-width: 120px;
  height: 80px;
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
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;

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
  flex-shrink: 0;
`;

const CardTitle = styled.h3`
  font-size: 0.875rem;
  color: #1b294b;
  margin: 0;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SelectionTitle = styled.h2`
    font-size: 1.25rem;
    color: #1b294b;
    margin: 0 0 16px 0;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const QRCodeTypeSelector: React.FC<QRCodeTypeSelectorProps> = ({ onSelect, onHover, selectedType, userChoice }) => {
  const qrOptions: { type: QRType; label: string; icon: any }[] = [
    { type: 'url', label: 'Website', icon: FaLink },
    { type: 'pdf', label: 'PDF', icon: FaFilePdf },
    { type: 'image', label: 'Images', icon: FaRegImage },
    { type: 'video', label: 'Video', icon: FaVideo },
    { type: 'wifi', label: 'WiFi', icon: FaWifi },
    { type: 'email', label: 'Email', icon: FaEnvelope },
    // { type: 'app', label: 'App', icon: FaAppStore },
    // { type: 'multiplink', label: 'List of Links', icon: FaListUl },
    { type: 'facebook', label: 'Facebook', icon: FaFacebookF },
    { type: 'twitter', label: 'Twitter', icon: FaTwitter },
    // { type: 'mp3', label: 'Music', icon: FaMusic },
    // { type: 'file', label: 'File', icon: FaFile },
    // { type: 'ar', label: 'AR Experience', icon: FaCube },
    // { type: 'crypto', label: 'Cryptocurrency', icon: FaBitcoin },
    // { type: 'dynamicVcard', label: 'Dynamic vCard', icon: FaIdBadge },
    // { type: 'iotConfig', label: 'IoT Config', icon: FaMicrochip },
  ];

  return (
    <>
      <SelectionTitle>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none"/>
          <rect x="48" y="48" width="64" height="64" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
          <rect x="144" y="48" width="64" height="64" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
          <rect x="48" y="144" width="64" height="64" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
          <rect x="144" y="144" width="64" height="64" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
        </svg>
        Select QR Code Type
      </SelectionTitle>
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
    </>
  );
}; 