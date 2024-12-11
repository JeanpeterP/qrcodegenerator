import React from "react";
import styled from "styled-components";
import { ShapePreview } from "./ShapePreview";
import {
  GridContainer,
  OptionGrid,
  OptionBox,
  PreviewContainer,
  OptionLabel,
} from "../styles/OptionStyles";
import { ColorPickerWithPresets } from './common/ColorPickerWithPresets';

interface ShapeCustomizationProps {
  shape: string;
  setShape: (shape: string) => void;
  qrColor: string;
  setQRColor: (color: string) => void;
  qrBackground: string;
  setQRBackground: (color: string) => void;
}

export const ShapeCustomization: React.FC<ShapeCustomizationProps> = ({
  shape,
  setShape,
  qrColor,
  setQRColor,
  qrBackground,
  setQRBackground,
}) => {
  const shapeOptions = [
    { value: "square", label: "Square" },
    { value: "dots", label: "Dots" },
    { value: "rounded", label: "Rounded" },
    { value: "classy", label: "Classy" },
    { value: "classy-rounded", label: "Classy Rounded" },
    { value: "extra-rounded", label: "Extra Rounded" },
  ];

  return (
    <>
      <GridContainer>
        <OptionGrid>
          {shapeOptions.map((option) => (
            <OptionBox
              key={option.value}
              active={shape === option.value}
              onClick={() => setShape(option.value)}
            >
              <PreviewContainer>
                <ShapePreview shape={option.value} />
              </PreviewContainer>
              <OptionLabel>{option.label}</OptionLabel>
            </OptionBox>
          ))}
        </OptionGrid>
      </GridContainer>
      <ColorPickerWithPresets
        label="QR Color"
        color={qrColor}
        onChange={setQRColor}
      />
    </>
  );
};

const ColorPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ColorPickerLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.8rem;

  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ColorPicker = styled.input`
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
