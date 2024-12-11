import React from 'react';
import styled from 'styled-components';
import { Gear } from 'phosphor-react';

interface AdvancedSettingsProps {
  showAdvanced: boolean;
  setShowAdvanced: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  children: React.ReactNode;
}

export const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  showAdvanced,
  setShowAdvanced,
  title = 'Advanced Settings',
  children,
}) => {
  return (
    <AdvancedSettingsContainer>
      <ToggleButton onClick={() => setShowAdvanced(!showAdvanced)}>
        <Gear size={16} />
        {showAdvanced ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
      </ToggleButton>
      {showAdvanced && <SettingsContent>{children}</SettingsContent>}
    </AdvancedSettingsContainer>
  );
};

const AdvancedSettingsContainer = styled.div`
  margin-top: 16px;
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: #ff6320;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 0;
  margin-bottom: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

const SettingsContent = styled.div`
  background: #f9fafb;
  padding: 16px;
  border-radius: 8px;
`; 