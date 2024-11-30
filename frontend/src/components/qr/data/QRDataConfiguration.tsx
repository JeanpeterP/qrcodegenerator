import React from 'react';
import styled from 'styled-components';
import { QRType } from '../../../types/qr';

const Section = styled.section`
  margin-top: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #1b294b;
  margin-bottom: 16px;
`;

interface QRDataConfigurationProps {
  type: QRType;
  // Add other props as needed
}

export const QRDataConfiguration: React.FC<QRDataConfigurationProps> = ({ type }) => {
  return (
    <Section>
      <SectionTitle>Configure QR Data</SectionTitle>
      {/* Add your data input components here based on type */}
    </Section>
  );
}; 