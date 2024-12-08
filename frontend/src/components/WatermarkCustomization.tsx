import React from 'react';
import styled from 'styled-components';
import {
  GridContainer,
  OptionGrid,
  OptionBox,
  PreviewContainer,
  OptionLabel,
} from "../styles/OptionStyles";
import {
  ColorPickerContainer,
  ColorPickerLabel,
  ColorPicker,
} from "../styles/ColorPickerStyles";
import { WatermarkPreview } from './WatermarkPreview';

interface WatermarkCustomizationProps {
  watermark: string;
  setWatermark: (watermark: string) => void;
  watermarkColor: string;
  setWatermarkColor: (color: string) => void;
  watermarkOpacity: number;
  setWatermarkOpacity: (opacity: number) => void;
}

const shapes = [
  { value: 'none', label: 'None' },
  { value: 'skull', label: 'Skull' },
  { value: 'candycane', label: 'Candy Cane' },
  { value: 'snowflake', label: 'Snowflake' },
  { value: 'santaclaus', label: 'Santa Claus' },
  { value: 'reindeer', label: 'Reindeer' },
  { value: 'christmastree', label: 'Christmas Tree' },
];

export const WatermarkCustomization: React.FC<WatermarkCustomizationProps> = ({
  watermark,
  setWatermark,
  watermarkColor,
  setWatermarkColor,
  watermarkOpacity,
  setWatermarkOpacity,
}) => {
  const handleWatermarkSelect = (value: string) => {
    setWatermark(value);
    if (value !== 'none' && watermarkOpacity === 0) {
      setWatermarkOpacity(0.3);
    }
  };

  const opacityPercentage = Math.round(watermarkOpacity * 100);

  return (
    <GridContainer>
      <OptionGrid>
        {shapes.map((option) => (
          <OptionBox
            key={option.value}
            active={watermark === option.value}
            onClick={() => handleWatermarkSelect(option.value)}
          >
            <PreviewContainer>
              <WatermarkPreview 
                type={option.value}
                color={watermarkColor}
                opacity={1}
              />
            </PreviewContainer>
            <OptionLabel>{option.label}</OptionLabel>
          </OptionBox>
        ))}
      </OptionGrid>

      {watermark !== 'none' && (
        <>
          <ColorPickerContainer>
            <ColorPickerLabel>
              Watermark Color
              <ColorPicker
                type="color"
                value={watermarkColor}
                onChange={(e) => setWatermarkColor(e.target.value)}
              />
            </ColorPickerLabel>
          </ColorPickerContainer>

          <SliderContainer>
            <SliderLabel>
              Watermark Opacity: {opacityPercentage}%
            </SliderLabel>
            <OpacitySlider
              type="range"
              min={0}
              max={0.7}
              step={0.01}
              value={watermarkOpacity}
              onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
            />
          </SliderContainer>
        </>
      )}
    </GridContainer>
  );
};

const SliderContainer = styled.div`
  margin-top: 16px;
`;

const SliderLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 8px;
`;

const OpacitySlider = styled.input<{ value: number }>`
  width: 100%;
  appearance: none;
  height: 8px;
  border-radius: 4px;
  background: #e0e0e0;
  outline: none;
  margin: 8px 0;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ff6320;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    margin-top: -6px;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ff6320;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  &::-webkit-slider-runnable-track {
    height: 8px;
    border-radius: 4px;
    background: ${props => {
      const percentage = (props.value / 0.7) * 100;
      return `linear-gradient(to right, #ff6320 ${percentage}%, #e0e0e0 ${percentage}%)`;
    }};
  }
`;