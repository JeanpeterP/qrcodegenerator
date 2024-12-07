import React from 'react';
import styled from 'styled-components';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
`;

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  color,
  onChange,
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
      />
    </Container>
  );
}; 