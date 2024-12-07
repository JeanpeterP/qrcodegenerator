import React from 'react';
import styled from 'styled-components';
import { CutterPreview } from './CutterPreview';

const CutterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 16px;
  padding: 16px;
`;

const CustomizationSection = styled.div`
  padding: 16px;
`;

const ColorInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px;
  margin: 8px 0;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
`;

const OpacityContainer = styled.div`
  margin-top: 16px;
`;

const OpacitySlider = styled.input`
  width: 100%;
  margin: 8px 0;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
`;

const cutterOptions = [
  { id: "none", label: "None" },
  { id: "skull", label: "Skull" },
  { id: "candycane", label: "Candy Cane" },
  { id: "reindeer", label: "Reindeer" },
  { id: "christmastree", label: "Christmas Tree" },
];

interface CutterCustomizationProps {
  cutterShape: string;
  setCutterShape: (shape: string) => void;
  opacity: number;
  setOpacity: (opacity: number) => void;
  cutter: string;
  setCutter: (cutter: string) => void;
  cutterColor: string;
  setCutterColor: (color: string) => void;
}

export const CutterCustomization: React.FC<CutterCustomizationProps> = ({
  cutterShape,
  setCutterShape,
  opacity,
  setOpacity,
  cutterColor,
  setCutterColor,
}) => {
  console.log('CutterCustomization props:', {
    cutterShape,
    opacity,
    cutterColor
  });

  return (
    <div>
      <CutterGrid>
        {cutterOptions.map((option) => (
          <CutterPreview
            key={option.id}
            type={option.id}
            selected={cutterShape === option.id}
            onClick={() => {
              console.log('Selecting cutter:', option.id);
              setCutterShape(option.id);
            }}
          />
        ))}
      </CutterGrid>

      {cutterShape !== 'none' && (
        <CustomizationSection>
          <div>
            <Label>Color</Label>
            <ColorInput
              type="color"
              value={cutterColor}
              onChange={(e) => setCutterColor(e.target.value)}
            />
          </div>

          <OpacityContainer>
            <Label>Opacity: {Math.round(opacity * 100)}%</Label>
            <OpacitySlider
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
            />
          </OpacityContainer>
        </CustomizationSection>
      )}
    </div>
  );
};