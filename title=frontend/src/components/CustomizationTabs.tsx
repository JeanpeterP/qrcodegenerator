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
import { CustomizationSection } from "./CustomizationSection";

interface CustomizationTabsProps {
  // ... [props remain unchanged]
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

const SubSectionTitle = styled.h3`
  font-size: 1rem;
  color: #333;
  margin-bottom: 12px;
`;

export const CustomizationTabs: React.FC<CustomizationTabsProps> = ({
  // ... [props remain unchanged]
}) => {
  return (
    <CustomizationContainer>
      <SectionTitle>QR Code Styling</SectionTitle>

      {/* Frame Customization */}
      <CustomizationSection>
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
      </CustomizationSection>

      {/* Shape Customization */}
      <CustomizationSection>
        <SubSectionTitle>Shape Options</SubSectionTitle>
        <ShapeCustomization
          shape={shape}
          setShape={setShape}
          qrColor={qrColor}
          setQRColor={setQRColor}
          qrBackground={qrBackground}
          setQRBackground={setQRBackground}
        />
      </CustomizationSection>

      {/* Marker Customization */}
      <CustomizationSection>
        <SubSectionTitle>Marker Options</SubSectionTitle>
        <MarkerCustomization
          markerStyle={markerStyle}
          setMarkerStyle={setMarkerStyle}
          markerColor={markerColor}
          setMarkerColor={setMarkerColor}
        />
      </CustomizationSection>

      {/* Logo Customization */}
      <CustomizationSection>
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
 