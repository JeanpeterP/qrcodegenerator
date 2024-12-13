import React, { useState } from "react";
import { LogoPreview } from "./LogoPreview";
import { getLogoSource } from "../utils/logoUtils";
import { OptionGrid, OptionBox, PreviewContainer, OptionLabel } from "../styles/OptionStyles";
import { ColorPickerWithPresets } from './common/ColorPickerWithPresets';
import { AdvancedSettings } from './common/AdvancedSettings';
import { Slider } from './common/Slider';
import { Toggle } from './common/Toggle';

export type LogoType = "custom" | "modern-split" | "circular" | "minimal-frame" | "tech-style";

interface LogoCustomizationProps {
  logo: {
    type: LogoType;
    src: string | null;
    width?: number;
    height?: number;
  } | null;
  setLogo: React.Dispatch<
    React.SetStateAction<{
      type: LogoType;
      src: string | null;
      width?: number;
      height?: number;
    } | null>
  >;
  customLogo: string;
  setCustomLogo: (logo: string | null) => void;
  logoSize: number;
  setLogoSize: React.Dispatch<React.SetStateAction<number>>;
  logoColor: string;
  setLogoColor: React.Dispatch<React.SetStateAction<string>>;
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
  hideBackground: boolean;
  setHideBackground: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LogoCustomization: React.FC<LogoCustomizationProps> = ({
  logo,
  setLogo,
  customLogo,
  setCustomLogo,
  logoSize,
  setLogoSize,
  logoColor,
  setLogoColor,
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
  hideBackground,
  setHideBackground,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const logoOptions: { type: LogoType; label: string }[] = [
    { type: "custom", label: "Custom Upload" },
    { type: "modern-split", label: "Modern Split" },
    { type: "circular", label: "Circular" },
    { type: "minimal-frame", label: "Minimal Frame" },
    { type: "tech-style", label: "Tech Style" },
  ];

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleLogoSelect = (type: LogoType) => {
    if (type === "custom") {
      fileInputRef.current?.click();
    } else {
      setLogo({
        type,
        src: getLogoSource(type),
        width: 50,
        height: 30,
      });
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxSize = 50; // Maximum size for the logo
          const ratio = img.width / img.height;
          let width = maxSize;
          let height = maxSize;
          
          if (ratio > 1) {
            height = width / ratio;
          } else {
            width = height * ratio;
          }

          setLogo({
            type: "custom",
            src: e.target?.result as string,
            width,
            height,
          });
          setCustomLogo(e.target?.result as string);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleLogoUpload}
      />
      <OptionGrid>
        {logoOptions.map((option) => (
          <OptionBox
            key={option.type}
            active={logo?.type === option.type}
            onClick={() => handleLogoSelect(option.type)}
          >
            <PreviewContainer>
              <LogoPreview 
                type={option.type} 
                src={option.type === 'custom' ? customLogo : getLogoSource(option.type)}
              />
            </PreviewContainer>
            <OptionLabel>{option.label}</OptionLabel>
          </OptionBox>
        ))}
      </OptionGrid>
      <AdvancedSettings
        showAdvanced={showAdvanced}
        setShowAdvanced={setShowAdvanced}
        title="Logo Advanced Settings"
      >
        <ColorPickerWithPresets
          label="Logo Color"
          color={logoColor}
          onChange={setLogoColor}
        />
        <Slider
          label="Logo Size"
          min={10}
          max={100}
          value={logoSize}
          onChange={setLogoSize}
        />
        <Toggle
          label="Hide Background"
          checked={hideBackground}
          onChange={setHideBackground}
        />
      </AdvancedSettings>
    </>
  );
};
