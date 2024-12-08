import React from "react";
import styled from "styled-components";
import { FrameCustomization } from "./FrameCustomization";
import { ShapeCustomization } from "./ShapeCustomization";
import { MarkerCustomization } from "./MarkerCustomization";
import { LogoCustomization } from "./LogoCustomization";
import { CutterCustomization } from "./CutterCustomization";
import { WatermarkCustomization } from "./WatermarkCustomization";
import { DotType, CornerSquareType } from "qr-code-styling";
import { Frame } from "../types";

interface CustomizationTabsProps {
  // Frame props
  frame: string | Frame;
  setFrame: (frame: string | Frame) => void;
  frameColor: string;
  setFrameColor: (color: string) => void;
  // Shape props
  shape: DotType;
  setShape: (shape: DotType) => void;
  qrColor: string;
  setQRColor: (color: string) => void;
  qrBackground: string;
  setQRBackground: (color: string) => void;
  // Marker props
  markerStyle: CornerSquareType;
  setMarkerStyle: (style: CornerSquareType) => void;
  markerColor: string;
  setMarkerColor: (color: string) => void;
  // Logo props
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
  currentFramePage: number;
  setCurrentFramePage: React.Dispatch<React.SetStateAction<number>>;
  currentShapePage: number;
  setCurrentShapePage: React.Dispatch<React.SetStateAction<number>>;
  customLogo: string | null;
  setCustomLogo: React.Dispatch<React.SetStateAction<string | null>>;
  cutter: string;
  setCutter: (cutter: string) => void;
  cutterShape: string;
  setCutterShape: React.Dispatch<React.SetStateAction<string>>;
  opacity: number;
  setOpacity: (opacity: number) => void;
  cutterColor: string;
  setCutterColor: React.Dispatch<React.SetStateAction<string>>;
  watermark: string;
  setWatermark: (watermark: string) => void;
  watermarkColor: string;
  setWatermarkColor: (color: string) => void;
  watermarkOpacity: number;
  setWatermarkOpacity: (opacity: number) => void;
}

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #1b294b;
  margin-bottom: 16px;
`;

const CustomizationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 24px 0;
`;

// New styled component for section subtitles
const SubSectionTitle = styled.h3`
  font-size: 1rem;
  color: #333;
  margin-bottom: 12px;
`;

export const CustomizationTabs: React.FC<CustomizationTabsProps> = ({
  frame,
  setFrame,
  frameColor,
  setFrameColor,
  shape,
  setShape,
  qrColor,
  setQRColor,
  qrBackground,
  setQRBackground,
  markerStyle,
  setMarkerStyle,
  markerColor,
  setMarkerColor,
  logo,
  setLogo,
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
  currentFramePage,
  setCurrentFramePage,
  currentShapePage,
  setCurrentShapePage,
  customLogo,
  setCustomLogo,
  cutter,
  setCutter,
  cutterShape,
  setCutterShape,
  opacity,
  setOpacity,
  cutterColor,
  setCutterColor,
  watermark,
  setWatermark,
  watermarkColor,
  setWatermarkColor,
  watermarkOpacity,
  setWatermarkOpacity,
}) => {
  return (
    <CustomizationContainer>
      <SectionTitle>QR Code Styling</SectionTitle>

      {/* Frame Customization */}
      <SubSectionTitle>Frame Options</SubSectionTitle>
      <FrameCustomization
        frame={frame}
        setFrame={setFrame}
        frameColor={frameColor}
        setFrameColor={setFrameColor}
        shape={shape}
        currentFramePage={currentFramePage}
        setCurrentFramePage={setCurrentFramePage}
      />

      <Divider />

      {/* Shape Customization */}
      <SubSectionTitle>Shape Options</SubSectionTitle>
      <ShapeCustomization
        shape={shape}
        setShape={setShape}
        qrColor={qrColor}
        setQRColor={setQRColor}
        qrBackground={qrBackground}
        setQRBackground={setQRBackground}
      />

      <Divider />

      {/* Marker Customization */}
      <SubSectionTitle>Marker Options</SubSectionTitle>
      <MarkerCustomization
        markerStyle={markerStyle}
        setMarkerStyle={setMarkerStyle}
        markerColor={markerColor}
        setMarkerColor={setMarkerColor}
      />

      <Divider />

      {/* Logo Customization */}
      <SubSectionTitle>Logo Options</SubSectionTitle>
      <LogoCustomization
        logo={logo}
        setLogo={setLogo}
        logoSize={logoSize}
        setLogoSize={setLogoSize}
        gradient={gradient}
        setGradient={setGradient}
        gradientColor1={gradientColor1}
        setGradientColor1={setGradientColor1}
        gradientColor2={gradientColor2}
        setGradientColor2={setGradientColor2}
        gradientType={gradientType}
        setGradientType={setGradientType}
        gradientRotation={gradientRotation}
        setGradientRotation={setGradientRotation}
        cornerDots={cornerDots}
        setCornerDots={setCornerDots}
        cornerSquares={cornerSquares}
        setCornerSquares={setCornerSquares}
        customLogo={customLogo || ""}
        setCustomLogo={setCustomLogo}
      />

      <Divider />

      {/* Cutter Customization */}
      {/* <SubSectionTitle>Cutter Options</SubSectionTitle>
      <CutterCustomization
        cutterShape={cutterShape}
        setCutterShape={setCutterShape}
        opacity={opacity}
        setOpacity={setOpacity}
        cutter={cutter}
        setCutter={setCutter}
        cutterColor={cutterColor}
        setCutterColor={setCutterColor}
      />

      <Divider /> */}

      {/* Watermark Customization */}
      <SubSectionTitle>Watermark Options</SubSectionTitle>
      <WatermarkCustomization
        watermark={watermark}
        setWatermark={setWatermark}
        watermarkColor={watermarkColor}
        setWatermarkColor={setWatermarkColor}
        watermarkOpacity={watermarkOpacity}
        setWatermarkOpacity={setWatermarkOpacity}
      />
    </CustomizationContainer>
  );
};
