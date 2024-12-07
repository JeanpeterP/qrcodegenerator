import React, { useState, useEffect } from "react";
import { DotType } from "qr-code-styling";
import styled from "styled-components";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { MiniQRPreview } from "./MiniQRPreview";
import {
  GridContainer,
  OptionGrid,
  OptionBox,
  PreviewContainer,
  OptionLabel,
} from "../styles/OptionStyles";
import { Frame } from '../types';

interface FrameCustomizationProps {
  frame: string | Frame;
  setFrame: (frame: string | Frame)=> void;
  frameColor: string;
  setFrameColor: (color: string) => void;
  shape: DotType;
  currentFramePage: number;
  setCurrentFramePage: (page: number) => void;
}

export const FrameCustomization: React.FC<FrameCustomizationProps> = ({
  frame,
  setFrame,
  frameColor,
  setFrameColor,
  shape,
  currentFramePage,
  setCurrentFramePage,
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
        <OptionGrid itemCount={frameOptions.length}>
          {frameOptions.map((option) => (
            <OptionBox
              key={typeof option.value === 'string' ? option.value : option.value.type}
              active={
                frame === option.value ||
                (typeof frame === 'object' && 
                 'type' in frame && 
                 typeof option.value === 'object' && 
                 'type' in option.value && 
                 frame.type === option.value.type)
              }
              onClick={() => setFrame(
                typeof option.value === 'object' 
                  ? { type: 'colorful' } 
                  : option.value
              )}
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
      <ColorPickerContainer>
        <ColorPickerLabel>
          Frame Color:
          <ColorPicker
            type="color"
            value={frameColor}
            onChange={(e) => setFrameColor(e.target.value)}
          />
        </ColorPickerLabel>
      </ColorPickerContainer>
    </>
  );
};

// Styled Components (added missing ones)
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

const PaginationArrow = styled.button<{ disabled?: boolean }>`
  background: ${(props) => (props.disabled ? "#f0f0f0" : "#fff")};
  border: 2px solid ${(props) => (props.disabled ? "#e0e0e0" : "#ff6320")};
  border-radius: 50%;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  color: ${(props) => (props.disabled ? "#ccc" : "#ff6320")};
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;

  &:hover:not(:disabled) {
    background: #ff6320;
    color: white;
    transform: scale(1.1);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }
`;

// Include styled components as needed.
