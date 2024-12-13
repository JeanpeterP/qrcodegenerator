import React from 'react';
import styled from 'styled-components';

interface SliderProps {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  min,
  max,
  value,
  onChange,
}) => {
  return (
    <SliderContainer>
      <Label>{label}</Label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <Value>{value}</Value>
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #1b294b;
  font-weight: 500;
`;

const Value = styled.span`
  font-size: 14px;
  color: #6b7280;
`; 