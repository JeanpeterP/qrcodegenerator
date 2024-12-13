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
import { MarkerPreview } from './MarkerPreview';

interface MarkerCustomizationProps {
  markerShape: string;
  setMarkerShape: (shape: string) => void;
  markerColor: string;
  setMarkerColor: (color: string) => void;
}

interface MarkerOption {
  value: string;
  label: string;
}

export const MarkerCustomization: React.FC<MarkerCustomizationProps> = ({
  markerShape,
  setMarkerShape,
  markerColor,
  setMarkerColor,
}) => {
  console.log('Current markerShape:', markerShape);

  const handleMarkerClick = (value: string) => {
    console.log('Setting marker shape to:', value);
    setMarkerShape(value);
  };

  const markerOptions = [
    { value: 'marker-dot', label: 'Dot' },
    { value: 'marker-square', label: 'Square' },
    { value: 'marker-rounded', label: 'Rounded' },
    { value: 'marker-diamond', label: 'Diamond' },
    { value: 'marker-flower', label: 'Flower' },
    { value: 'marker-cross', label: 'Cross' },
    { value: 'marker-target', label: 'Target' },
    { value: 'marker-hexagon', label: 'Hexagon' },
    { value: 'marker-star', label: 'Star' },
  ];

  return (
    <>
      <GridContainer>
        <OptionGrid>
          {markerOptions.map((option) => (
            <OptionBox
              key={option.value}
              active={markerShape === option.value}
              onClick={() => setMarkerShape(option.value)}
            >
              <PreviewContainer>
                <MarkerPreview 
                  styleType={option.value} 
                  markerColor={markerColor}
                />
              </PreviewContainer>
              <OptionLabel>{option.label}</OptionLabel>
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

const MarkerOuter = styled.div<{ styleType: string }>`
  width: 42px;
  height: 42px;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  ${props => {
    switch (props.styleType) {
      case 'marker-dot':
        return 'border-radius: 50%;';
      case 'marker-rounded':
        return 'border-radius: 15px;';
      default:
        return 'border-radius: 0;';
    }
  }}
`;

const MarkerInner = styled.div<{ styleType: string }>`
  width: 26px;
  height: 26px;
  background-color: #f8f9fa;
  position: relative;
  
  ${props => {
    switch (props.styleType) {
      case 'marker-dot':
        return 'border-radius: 50%;';
      case 'marker-rounded':
        return 'border-radius: 8px;';
      default:
        return 'border-radius: 0;';
    }
  }}
`;
