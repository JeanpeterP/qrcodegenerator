import React from "react";
import styled from "styled-components";
import { CornerSquareType } from "qr-code-styling";
import {
  GridContainer,
  OptionGrid,
  OptionBox,
  PreviewContainer,
  OptionLabel,
} from "../styles/OptionStyles";
import { ColorPickerWithPresets } from './common/ColorPickerWithPresets';

interface MarkerCustomizationProps {
  markerStyle: CornerSquareType;
  setMarkerStyle: (style: CornerSquareType) => void;
  markerColor: string;
  setMarkerColor: (color: string) => void;
}

const MarkerPreview = ({ styleType }: { styleType: CornerSquareType }) => {
  return (
    <MarkerExampleContainer>
      <MarkerOuter styleType={styleType}>
        <MarkerInner styleType={styleType} />
      </MarkerOuter>
    </MarkerExampleContainer>
  );
};

export const MarkerCustomization: React.FC<MarkerCustomizationProps> = ({
  markerStyle,
  setMarkerStyle,
  markerColor,
  setMarkerColor,
}) => {
  const markerStyles: CornerSquareType[] = [
    "square",
    "dot",
    "extra-rounded",
  ];

  return (
    <>
      <GridContainer>
        <OptionGrid>
          {markerStyles.map((style) => (
            <OptionBox
              key={style}
              active={markerStyle === style}
              onClick={() => setMarkerStyle(style)}
            >
              <PreviewContainer>
                <MarkerPreview styleType={style} />
              </PreviewContainer>
              <OptionLabel>{style}</OptionLabel>
            </OptionBox>
          ))}
        </OptionGrid>
      </GridContainer>
      <ColorPickerWithPresets
        label="Marker Color"
        color={markerColor}
        onChange={setMarkerColor}
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

const MarkerExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const MarkerOuter = styled.div<{ styleType: CornerSquareType }>`
  width: 42px;
  height: 42px;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => {
    switch (props.styleType) {
      case "dot":
        return "border-radius: 50%;";
      case "extra-rounded":
        return "border-radius: 15px;";
      default: // square
        return "border-radius: 0;";
    }
  }}
`;

const MarkerInner = styled.div<{ styleType: CornerSquareType }>`
  width: 26px;
  height: 26px;
  background-color: #f8f9fa;

  ${(props) => {
    switch (props.styleType) {
      case "dot":
        return "border-radius: 50%;";
      case "extra-rounded":
        return "border-radius: 8px;";
      default: // square
        return "border-radius: 0;";
    }
  }}
`;
