import React from 'react';
import styled from 'styled-components';

interface Shape {
  value: string;
  label: string;
}

interface ShapeSelectorProps {
  shapes: Shape[];
  selectedShape: string;
  onShapeSelect: (shape: string) => void;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.5rem;
`;

const ShapeButton = styled.button<{ selected: boolean }>`
  padding: 0.5rem;
  border: 2px solid ${props => props.selected ? '#4a90e2' : '#ddd'};
  border-radius: 4px;
  background: ${props => props.selected ? '#e6f0fa' : 'white'};
  color: ${props => props.selected ? '#4a90e2' : '#666'};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: #4a90e2;
    background: #f5f9fe;
  }
`;

export const ShapeSelector: React.FC<ShapeSelectorProps> = ({
  shapes,
  selectedShape,
  onShapeSelect,
}) => {
  return (
    <Grid>
      {shapes.map((shape) => (
        <ShapeButton
          key={shape.value}
          selected={selectedShape === shape.value}
          onClick={() => onShapeSelect(shape.value)}
        >
          {shape.label}
        </ShapeButton>
      ))}
    </Grid>
  );
}; 