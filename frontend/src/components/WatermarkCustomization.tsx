import React, { useState } from 'react';
import { OpacitySlider } from './OpacitySlider';
import { ColorPickerWithPresets } from './common/ColorPickerWithPresets';
import { WatermarkPreview } from './WatermarkPreview';
import {
  GridContainer,
  OptionGrid,
  OptionBox,
  PreviewContainer,
  OptionLabel,
} from "../styles/OptionStyles";
import { AdvancedSettings } from './common/AdvancedSettings';

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
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleWatermarkSelect = (value: string) => {
    setWatermark(value);
    if (value !== 'none' && watermarkOpacity === 0) {
      setWatermarkOpacity(0.3);
    }
  };

  return (
    <>
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
      </GridContainer>
      {watermark !== 'none' && (
        <AdvancedSettings
          showAdvanced={showAdvanced}
          setShowAdvanced={setShowAdvanced}
          title="Watermark Advanced Settings"
        >
          <ColorPickerWithPresets
            label="Watermark Color"
            color={watermarkColor}
            onChange={setWatermarkColor}
          />
          <OpacitySlider
            label="Watermark Opacity"
            value={watermarkOpacity}
            onChange={setWatermarkOpacity}
          />
        </AdvancedSettings>
      )}
    </>
  );
};