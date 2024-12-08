import React from "react";
import styled from "styled-components";
import { DotType } from "qr-code-styling";
import { ShapePreview } from "./ShapePreview";
import {
  GridContainer,
  OptionGrid,
  OptionBox,
  PreviewContainer,
  OptionLabel,
} from "../styles/OptionStyles";

interface ShapeCustomizationProps {
  shape: DotType;
  setShape: (shape: DotType) => void;
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
              onClick={() => setShape(option.value as DotType)}
            >
              <PreviewContainer>
                <ShapePreview shape={option.value as DotType} />
              </PreviewContainer>
              <OptionLabel>{option.label}</OptionLabel>
            </OptionBox>
          ))}
        </OptionGrid>
      </GridContainer>
      <ColorPickerContainer>
        <ColorPickerLabel>
          QR Color:
          <ColorPicker
            type="color"
            value={qrColor}
            onChange={(e) => setQRColor(e.target.value)}
          />
        </ColorPickerLabel>
      </ColorPickerContainer>
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
