import React, { useState } from "react";
import { DotType } from "qr-code-styling";
import { MiniQRPreview } from "./MiniQRPreview";
import {
  GridContainer,
  OptionGrid,
  OptionBox,
  PreviewContainer,
  OptionLabel,
} from "../styles/OptionStyles";
import { ColorPickerWithPresets } from './common/ColorPickerWithPresets';
import { CustomizationContainer } from "./CustomizationContainer";
import { Frame } from '../types';
import { AdvancedSettings } from './common/AdvancedSettings';
import styled from 'styled-components';

interface FrameCustomizationProps {
  frame: string | Frame;
  setFrame: (frame: string | Frame) => void;
  frameColor: string;
  setFrameColor: (color: string) => void;
  frameThickness: number;
  setFrameThickness: (thickness: number) => void;
  shape: DotType;
  currentFramePage: number;
  setCurrentFramePage: React.Dispatch<React.SetStateAction<number>>;
}

export const FrameCustomization: React.FC<FrameCustomizationProps> = ({
  frame,
  setFrame,
  frameColor,
  setFrameColor,
  frameThickness,
  setFrameThickness,
  shape,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const frameOptions = [
    { value: 'none', label: 'No Frame' },
    { value: 'simple', label: 'Simple' },
    { value: 'rounded', label: 'Rounded' },
    { value: 'fancy', label: 'Fancy' },
    { value: 'chat', label: 'Chat' },
    { value: { type: 'colorful' }, label: 'Colorful' },
  ];

  return (
    <>
      <GridContainer>
        <OptionGrid>
          {frameOptions.map((option) => (
            <OptionBox
              key={typeof option.value === "string" ? option.value : option.value.type}
              active={
                frame === option.value ||
                (typeof frame === "object" &&
                  "type" in frame &&
                  typeof option.value === "object" &&
                  "type" in option.value &&
                  frame.type === option.value.type)
              }
              onClick={() =>
                setFrame(
                  typeof option.value === "object"
                    ? { type: "colorful" }
                    : option.value
                )
              }
            >
              <PreviewContainer>
                <MiniQRPreview
                  frame={option.value}
                  shape={shape}
                  frameColor={frameColor}
                  frameThickness={frameThickness}
                  markerStyle="dot"
                  markerColor="#000000"
                />
              </PreviewContainer>
              <OptionLabel>{option.label}</OptionLabel>
            </OptionBox>
          ))}
        </OptionGrid>
      </GridContainer>
      <AdvancedSettings
        showAdvanced={showAdvanced}
        setShowAdvanced={setShowAdvanced}
        title="Frame Advanced Settings"
      >
        <ColorPickerWithPresets
          label="Frame Color"
          color={frameColor}
          onChange={setFrameColor}
        />
        <ThicknessInput>
          <label>Frame Thickness</label>
          <input
            type="number"
            min={1}
            max={20}
            value={frameThickness}
            onChange={(e) => setFrameThickness(parseInt(e.target.value))}
          />
        </ThicknessInput>
      </AdvancedSettings>
    </>
  );
};

const ThicknessInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  label {
    font-size: 14px;
    color: #1b294b;
    margin-bottom: 8px;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    font-size: 14px;
    box-sizing: border-box;
  }
`;
