// frontend/src/components/common/ColorPickerStyles.tsx

import styled from "styled-components";

export const ColorPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const ColorPickerLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.8rem;

  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const ColorPicker = styled.input`
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 0.5rem;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 50%;
  }

  @media (min-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;