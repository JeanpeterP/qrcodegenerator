import React, { useRef } from 'react';
import styled from 'styled-components';
import { ColorPickerContainer, ColorPickerLabel, PresetColors, ColorButton, CustomColorButton, ColorPicker } from '../../styles/ColorPickerStyles';

interface ColorPickerWithPresetsProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
  presetColors?: string[];
}

export const ColorPickerWithPresets: React.FC<ColorPickerWithPresetsProps> = ({
  label,
  color,
  onChange,
  presetColors = ['#7C0909', '#FF6320', '#000000', '#0066FF', '#4B0082']
}) => {
  const colorPickerRef = useRef<HTMLInputElement>(null);

  return (
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
          {label}:
        </span>
        <PresetColors>
          {presetColors.map((presetColor) => (
            <ColorButton
              key={presetColor}
              bgColor={presetColor}
              isSelected={color.toLowerCase() === presetColor.toLowerCase()}
              onClick={() => onChange(presetColor)}
              type="button"
            />
          ))}
          <CustomColorButton
            type="button"
            bgColor={color}
            isSelected={!presetColors.some(
              (presetColor) => presetColor.toLowerCase() === color.toLowerCase()
            )}
            onClick={() => {
              colorPickerRef.current?.click();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none" />
              <path
                d="M128,192a24,24,0,0,1,24-24h46.21a24,24,0,0,0,23.4-18.65A96.48,96.48,0,0,0,224,127.17c-.45-52.82-44.16-95.7-97-95.17a96,96,0,0,0-95,96c0,41.81,26.73,73.44,64,86.61A24,24,0,0,0,128,192Z"
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
              value={color}
              onChange={(e) => onChange(e.target.value)}
            />
          </CustomColorButton>
        </PresetColors>
      </ColorPickerLabel>
    </ColorPickerContainer>
  );
}; 