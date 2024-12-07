import React from 'react';
import styled from 'styled-components';
import { CustomizationContainer, CustomizationTitle, CustomizationContent } from './CustomizationContainer';
import { ColorPicker } from './ColorPicker';
import { OpacitySlider } from './OpacitySlider';
import { ShapeSelector } from './ShapeSelector';

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
  console.log('WatermarkCustomization props:', {
    watermark,
    watermarkOpacity,
    watermarkColor,
  });

  const handleShapeSelect = (shape: string) => {
    console.log('Selecting watermark:', shape);
    setWatermark(shape);
  };

  return (
    <CustomizationContainer>
      <CustomizationTitle>Watermark</CustomizationTitle>
      <CustomizationContent>
        <ShapeSelector
          shapes={shapes}
          selectedShape={watermark}
          onShapeSelect={handleShapeSelect}
        />
        {watermark !== 'none' && (
          <>
            <ColorPicker
              label="Watermark Color"
              color={watermarkColor}
              onChange={setWatermarkColor}
            />
            <OpacitySlider
              label="Watermark Opacity"
              value={watermarkOpacity}
              onChange={setWatermarkOpacity}
            />
          </>
        )}
      </CustomizationContent>
    </CustomizationContainer>
  );
};