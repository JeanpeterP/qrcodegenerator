import React from 'react';
import styled from 'styled-components';
import { Plus } from 'lucide-react';
import { LogoType } from './LogoCustomization';

interface LogoPreviewProps {
  type: LogoType;
  src?: string | null;
}

export const LogoPreview: React.FC<LogoPreviewProps> = ({ type, src }) => {
  if (type === 'custom' && src) {
    return (
      <LogoPreviewContainer>
        <img src={src} alt="Custom logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </LogoPreviewContainer>
    );
  }

  return (
    <LogoPreviewContainer>
      {type === 'custom' && (
        <CustomUploadBox>
          <Plus size={24} />
        </CustomUploadBox>
      )}
      {type !== 'custom' && src && (
        <img src={src} alt={`${type} logo`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      )}
    </LogoPreviewContainer>
  );
};

// Styled Components
const LogoPreviewContainer = styled.div`
    width: 60px;
    height: 60px;
    background-color: #f8f9fa;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CustomUploadBox = styled.div`
    width: 40px;
    height: 40px;
    border: 2px dashed #ccc;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666;
`;

const StackedText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
    font-size: 12px;
    line-height: 1.2;
    color: #333;
`;

const OpenBoxContainer = styled.div`
    position: relative;
    width: 50px;
    height: 30px;
    border: 2px solid #333;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 8px;
`;

const OpenBoxText = styled.span`
    font-size: 8px;
    font-weight: bold;
    color: #333;
`;

const ClosedBoxContainer = styled.div`
    width: 50px;
    height: 30px;
    border: 2px solid #333;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 8px;
`;

const ClosedBoxText = styled.span`
    font-size: 8px;
    font-weight: bold;
    color: #333;
`;

// Include other styled components like CustomUploadBox 