import React from 'react';
import styled from 'styled-components';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const ToggleSwitch = styled.div<{ checked: boolean }>`
  width: 40px;
  height: 20px;
  background: ${props => props.checked ? '#FF6320' : '#ccc'};
  border-radius: 20px;
  position: relative;
  transition: background 0.2s;
  
  &:after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.checked ? '22px' : '2px'};
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    transition: left 0.2s;
  }
`;

const Label = styled.span`
  font-size: 14px;
  color: #333;
`;

export const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange }) => {
  return (
    <ToggleContainer onClick={() => onChange(!checked)}>
      <ToggleSwitch checked={checked} />
      <Label>{label}</Label>
    </ToggleContainer>
  );
}; 