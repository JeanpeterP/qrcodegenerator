import React from "react";
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
import { CustomizationContainer, CustomizationContent } from "./CustomizationContainer";
import { Frame } from '../types';

interface FrameCustomizationProps {
  frame: string | Frame;
  setFrame: (frame: string | Frame) => void;
  frameColor: string;
  setFrameColor: (color: string) => void;
  shape: DotType;
  currentFramePage: number;
  setCurrentFramePage: React.Dispatch<React.SetStateAction<number>>;
}

export const FrameCustomization: React.FC<FrameCustomizationProps> = ({
  frame,
  setFrame,
  frameColor,
  setFrameColor,
  shape,
}) => {
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
              active={frame === option.value || (typeof frame === "object" && "type" in frame && typeof option.value === "object" && "type" in option.value && frame.type === option.value.type)}
              onClick={() => setFrame(typeof option.value === "object" ? { type: "colorful" } : option.value)}
            >
              <PreviewContainer>
                <MiniQRPreview
                  frame={option.value}
                  shape={shape}
                  frameColor={frameColor}
                  markerStyle="dot"
                  markerColor="#000000"
                />
              </PreviewContainer>
              <OptionLabel>{option.label}</OptionLabel>
            </OptionBox>
          ))}
        </OptionGrid>
      </GridContainer>
      <ColorPickerWithPresets
        label="Frame Color"
        color={frameColor}
        onChange={setFrameColor}
      />
    </>
  );
};
