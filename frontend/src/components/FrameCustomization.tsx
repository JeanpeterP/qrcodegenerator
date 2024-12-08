import React, { useState, useEffect, useRef } from "react";
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
import {
  ColorPickerContainer,
  ColorPickerLabel,
  ColorPicker,
  PresetColors,
  ColorButton,
  CustomColorButton,
  presetColors,
} from "../styles/ColorPickerStyles";

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

  const colorPickerRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <GridContainer>
        <OptionGrid>
          {frameOptions.map((option) => (
            <OptionBox
              key={
                typeof option.value === "string"
                  ? option.value
                  : option.value.type
              }
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
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none"/>
              <path d="M128,192a24,24,0,0,1,24-24h46.21a24,24,0,0,0,23.4-18.65A96.48,96.48,0,0,0,224,127.17c-.45-52.82-44.16-95.7-97-95.17a96,96,0,0,0-95,96c0,41.81,26.73,73.44,64,86.61A24,24,0,0,0,128,192Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
              <circle cx="128" cy="76" r="12"/>
              <circle cx="84" cy="100" r="12"/>
              <circle cx="84" cy="156" r="12"/>
              <circle cx="172" cy="100" r="12"/>
            </svg>
            Frame Color:
          </span>
          <PresetColors>
            {presetColors.map((presetColor) => (
              <ColorButton
                key={presetColor}
                bgColor={presetColor}
                isSelected={frameColor.toLowerCase() === presetColor.toLowerCase()}
                onClick={() => setFrameColor(presetColor)}
                type="button"
              />
            ))}
            <CustomColorButton
              type="button"
              bgColor={frameColor}
              isSelected={!presetColors.some(
                (color) => color.toLowerCase() === frameColor.toLowerCase()
              )}
              onClick={() => {
                colorPickerRef.current && colorPickerRef.current.click();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none" />
                <path
                  d="M128,192a24,24,0,0,1,24-24h46.21a24,24,0,0,0,23.4-18.65
                    A96.48,96.48,0,0,0,224,127.17c-.45-52.82-44.16-95.7-97-95.17
                    a96,96,0,0,0-95,96c0,41.81,26.73,73.44,64,86.61A24,24,0,0,0,128,192Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="24"
                />
                <circle cx="128" cy="76" r="12" />
                <circle cx="84" cy="100" r="12" />
                <circle cx="84" cy="156" r="12" />
                <circle cx="172" cy="100" r="12" />
              </svg>
              <ColorPicker
                ref={colorPickerRef}
                type="color"
                value={frameColor}
                onChange={(e) => setFrameColor(e.target.value)}
              />
            </CustomColorButton>
          </PresetColors>
        </ColorPickerLabel>
      </ColorPickerContainer>
    </>
  );
};

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
