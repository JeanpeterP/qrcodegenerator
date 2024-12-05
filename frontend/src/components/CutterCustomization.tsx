import React from "react";
import styled from "styled-components";
import { SkullPreview } from "./SkullPreview";
import {
  GridContainer,
  OptionGrid,
  OptionBox,
  PreviewContainer,
  OptionLabel,
} from "../styles/OptionStyles";

interface CutterCustomizationProps {
  cutterShape: string;
  setCutterShape: React.Dispatch<React.SetStateAction<string>>;
  opacity: number;
  setOpacity: (opacity: number) => void;
  cutterColor: string;
  setCutterColor: (color: string) => void;
  cutter: string;
  setCutter: (cutter: string) => void;
}

export const CutterCustomization: React.FC<CutterCustomizationProps> = ({
  cutterShape,
  setCutterShape,
  opacity,
  setOpacity,
  cutterColor,
  setCutterColor,
  cutter,
  setCutter
}) => {
  const cutterOptions = [
    { id: "none", label: "None" },
    { id: "skull", label: "Skull" },
    { id: "candycane", label: "Candy Cane" },
    { id: "reindeer", label: "Reindeer" },
    { id: "christmastree", label: "Christmas Tree" },
  ];

  return (
    <GridContainer>
      <SectionTitle>Select Cutter Shape</SectionTitle>
      <Description>Choose a shape to overlay on your QR code</Description>
      <OptionGrid itemCount={cutterOptions.length}>
        {cutterOptions.map((option) => (
          <OptionBox
            key={option.id}
            active={cutterShape === option.id}
            onClick={() => {
              setCutter(option.id);
              setCutterShape(option.id);
            }}
          >
            <PreviewContainer>
              {option.id === "skull" ? (
                <SkullPreview />
              ) : (
                <DefaultPreview />
              )}
            </PreviewContainer>
            <OptionLabel>{option.label}</OptionLabel>
          </OptionBox>
        ))}
      </OptionGrid>

      <SectionTitle>Cutter Color</SectionTitle>
      <Description>Choose the color of your shape overlay</Description>
      <ColorPickerWrapper>
        <ColorInput
          type="color"
          value={cutterColor}
          onChange={(e) => setCutterColor(e.target.value)}
        />
        <ColorValue>{cutterColor}</ColorValue>
      </ColorPickerWrapper>

      <SectionTitle>Shape Opacity</SectionTitle>
      <Description>Adjust how visible the shape overlay is (0-100%)</Description>
      <SliderContainer>
        <StyledSlider
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={opacity}
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
        />
        <OpacityValue>{Math.round(opacity * 100)}%</OpacityValue>
      </SliderContainer>
    </GridContainer>
  );
};

const DefaultPreview = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f0f0f0;
  border-radius: 4px;
`;

const SectionTitle = styled.h3`
  margin-top: 20px;
  color: #333;
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0 1rem;
`;

const ColorPickerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ColorInput = styled.input`
  -webkit-appearance: none;
  border: none;
  width: 50px;
  height: 30px;
  cursor: pointer;
  background-color: transparent;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 4px;
  }
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledSlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 12px;
  border-radius: 6px;
  background: #ddd;
  outline: none;
  margin-top: 10px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #d4af37;
    cursor: pointer;
    margin-top: -5px;
    border: none;
  }

  &::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #d4af37;
    cursor: pointer;
    border: none;
  }
`;

const OpacityValue = styled.span`
  min-width: 3rem;
  color: #666;
`;

const ColorValue = styled.span`
  margin-left: 1rem;
  color: #666;
  font-family: monospace;
`;