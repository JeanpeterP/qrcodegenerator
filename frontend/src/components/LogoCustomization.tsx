import React from "react";
import styled from "styled-components";
import { LogoPreview } from "./LogoPreview";
import {
  GridContainer,
  OptionGrid,
  OptionBox,
  PreviewContainer,
  OptionLabel,
} from "../styles/OptionStyles";

export type LogoType = "custom" | "stacked" | "open-box" | "closed-box";

interface LogoCustomizationProps {
  logo: {
    type: "stacked" | "open-box" | "closed-box" | "custom";
    src: string | null;
    width?: number;
    height?: number;
  } | null;
  setLogo: React.Dispatch<
    React.SetStateAction<{
      type: "stacked" | "open-box" | "closed-box" | "custom";
      src: string | null;
      width?: number;
      height?: number;
    } | null>
  >;
  customLogo: string;
  setCustomLogo: (logo: string | null) => void;
  logoSize: number;
  setLogoSize: React.Dispatch<React.SetStateAction<number>>;
  gradient: boolean;
  setGradient: React.Dispatch<React.SetStateAction<boolean>>;
  gradientColor1: string;
  setGradientColor1: React.Dispatch<React.SetStateAction<string>>;
  gradientColor2: string;
  setGradientColor2: React.Dispatch<React.SetStateAction<string>>;
  gradientType: string;
  setGradientType: React.Dispatch<React.SetStateAction<string>>;
  gradientRotation: number;
  setGradientRotation: React.Dispatch<React.SetStateAction<number>>;
  cornerDots: string;
  setCornerDots: React.Dispatch<React.SetStateAction<string>>;
  cornerSquares: string;
  setCornerSquares: React.Dispatch<React.SetStateAction<string>>;
}

export const LogoCustomization: React.FC<LogoCustomizationProps> = ({
  logo,
  setLogo,
  customLogo,
  setCustomLogo,
  logoSize,
  setLogoSize,
  gradient,
  setGradient,
  gradientColor1,
  setGradientColor1,
  gradientColor2,
  setGradientColor2,
  gradientType,
  setGradientType,
  gradientRotation,
  setGradientRotation,
  cornerDots,
  setCornerDots,
  cornerSquares,
  setCornerSquares,
}) => {
  const logoOptions: { type: LogoType; label: string }[] = [
    { type: "custom", label: "Custom Upload" },
    { type: "stacked", label: "Stacked Text" },
    { type: "open-box", label: "Open Box" },
    { type: "closed-box", label: "Closed Box" },
  ];

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomLogo(e.target?.result as string);
        setLogo({ type: "custom", src: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <GridContainer>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleLogoUpload}
      />
      <OptionGrid >
        {logoOptions.map((option) => (
          <OptionBox
            key={option.type}
            active={logo?.type === option.type}
            onClick={() => {
              if (option.type === "custom") {
                fileInputRef.current?.click();
              } else {
                setLogo({ type: option.type, src: option.type });
              }
            }}
          >
            <PreviewContainer>
              {option.type === "custom" && customLogo ? (
                <img src={customLogo} alt="Custom logo" />
              ) : (
                <LogoPreview type={option.type} />
              )}
            </PreviewContainer>
            <OptionLabel>{option.label}</OptionLabel>
          </OptionBox>
        ))}
      </OptionGrid>
    </GridContainer>
  );
};
