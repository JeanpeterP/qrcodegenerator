import React from 'react';
import styled from 'styled-components';

interface OpacitySliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 4px;
  cursor: pointer;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: #4a90e2;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const OpacitySlider: React.FC<OpacitySliderProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <Container>
      <Label>
        {label}
        <span>{Math.round(value * 100)}%</span>
      </Label>
      <Input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </Container>
  );
}; 