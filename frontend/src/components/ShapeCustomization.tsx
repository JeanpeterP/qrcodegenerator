import React, { useState } from "react";
import {
  GridContainer,
  OptionGrid,
  OptionBox,
  PreviewContainer,
  OptionLabel,
} from "../styles/OptionStyles";
import { ShapePreview } from "./ShapePreview";
import { ColorPickerWithPresets } from './common/ColorPickerWithPresets';
import { AdvancedSettings } from './common/AdvancedSettings';

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
  const [showAdvanced, setShowAdvanced] = useState(false);

  const shapeOptions = [
    { value: 'shape-square', label: 'Square' },
    { value: 'shape-circle', label: 'Circle' },
    { value: 'shape-diamond', label: 'Diamond' },
    { value: 'shape-hexagon', label: 'Hexagon' },
    { value: 'shape-star', label: 'Star' },
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
      <AdvancedSettings
        showAdvanced={showAdvanced}
        setShowAdvanced={setShowAdvanced}
        title="Shape Advanced Settings"
      >
        <ColorPickerWithPresets
          label="QR Color"
          color={qrColor}
          onChange={setQRColor}
        />
        <ColorPickerWithPresets
          label="Background Color"
          color={qrBackground}
          onChange={setQRBackground}
        />
      </AdvancedSettings>
    </>
  );
};
