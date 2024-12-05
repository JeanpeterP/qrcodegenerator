import React from "react";
import styled from "styled-components";
import { SkullPreview } from "./SkullPreview";
import {
  GridContainer,
  OptionGrid,
  OptionBox,
  PreviewContainer,
  OptionLabel,
} from "../styles/OptionStyles";

interface CutterCustomizationProps {
  cutter: string;
  setCutter: (cutter: string) => void;
  cutterShape: string;
  setCutterShape: React.Dispatch<React.SetStateAction<string>>;
}

export const CutterCustomization: React.FC<CutterCustomizationProps> = ({
  cutter,
  setCutter,
  cutterShape,
  setCutterShape,
}) => {
  const cutterOptions = [
    { id: "none", label: "None" },
    { id: "skull", label: "Skull" },
  ];

  return (
    <GridContainer>
      <OptionGrid itemCount={cutterOptions.length}>
        {cutterOptions.map((option) => (
          <OptionBox
            key={option.id}
            active={cutterShape === option.id}
            onClick={() => {
              setCutter(option.id);
              setCutterShape(option.id);
            }}
          >
            <PreviewContainer>
              {option.id === "skull" ? (
                <SkullPreview />
              ) : (
                <DefaultPreview />
              )}
            </PreviewContainer>
            <OptionLabel>{option.label}</OptionLabel>
          </OptionBox>
        ))}
      </OptionGrid>
    </GridContainer>
  );
};

const DefaultPreview = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f0f0f0;
  border-radius: 4px;
`;