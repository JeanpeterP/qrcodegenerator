// frontend/src/components/common/ColorPickerStyles.tsx

import styled from "styled-components";

export const ColorPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const ColorPickerLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.9rem;
  color: #666;

  span {
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export const PresetColors = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0;
`;

export const ColorButton = styled.button<{ bgColor: string; isSelected: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: ${props => props.bgColor};
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
  position: relative;

  ${props => props.isSelected && `
    transform: scale(1.1);
    &::after {
      content: '';
      position: absolute;
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
      border: 2px solid #ff6320;
      border-radius: 8px;
    }
  `}

  &:hover {
    transform: ${props => props.isSelected ? 'scale(1.1)' : 'scale(1.05)'};
  }
`;

export const CustomColorButton = styled.button<{ bgColor: string; isSelected: boolean }>`
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: #ffffff;
  border: ${props => props.isSelected ? '2px solid #ff6320' : '1px solid #ccc'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  padding: 0;

  &:hover {
    transform: scale(1.05);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    stroke: ${props => props.bgColor};
    color: ${props => props.bgColor};
  }
`;

export const ColorPicker = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const presetColors = [
  '#000000', // Black
  '#FF5722', // Orange
  '#2196F3', // Blue
  '#4CAF50', // Green
  '#9C27B0', // Purple
];