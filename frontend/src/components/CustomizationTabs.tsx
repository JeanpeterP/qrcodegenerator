import React from "react";
import styled from "styled-components";
import { FrameCustomization } from "./FrameCustomization";
import { ShapeCustomization } from "./ShapeCustomization";
import { MarkerCustomization } from "./MarkerCustomization";
import { LogoCustomization } from "./LogoCustomization";
import { WatermarkCustomization } from "./WatermarkCustomization";
import { CornerSquareType } from "qr-code-styling";
import { Frame } from "../types";

interface CustomizationTabsProps {
  // Frame props
  frame: string | Frame;
  setFrame: (frame: string | Frame) => void;
  frameColor: string;
  setFrameColor: (color: string) => void;
  // Shape props
  shape: string;
  setShape: (shape: string) => void;
  qrColor: string;
  setQRColor: (color: string) => void;
  qrBackground: string;
  setQRBackground: (color: string) => void;
  // Marker props
  markerStyle: string;
  setMarkerStyle: (style: string) => void;
  markerColor: string;
  setMarkerColor: (color: string) => void;
  markerShape: string;
  setMarkerShape: (shape: string) => void;
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
  watermark: string;
  setWatermark: (watermark: string) => void;
  watermarkColor: string;
  setWatermarkColor: (color: string) => void;
  watermarkOpacity: number;
  setWatermarkOpacity: (opacity: number) => void;
  // Cutter props
  cutter: string;  // Changed from boolean
  setCutter: React.Dispatch<React.SetStateAction<string>>;
  cutterShape: string;
  setCutterShape: React.Dispatch<React.SetStateAction<string>>;
  // Opacity props
  opacity: number;
  setOpacity: React.Dispatch<React.SetStateAction<number>>;
  cutterColor: string;
  setCutterColor: React.Dispatch<React.SetStateAction<string>>;
  logoColor: string;
  setLogoColor: React.Dispatch<React.SetStateAction<string>>;
  frameThickness: number;
  setFrameThickness: (thickness: number) => void;
}

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #1b294b;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 24px;
    height: 24px;
    color: #1b294b;
  }
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

const SubSectionTitle = styled.h3`
  font-size: 1rem;
  color: #333;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 20px;
    height: 20px;
    color: #333;
  }
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
  markerShape,
  setMarkerShape,
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
  watermark,
  setWatermark,
  watermarkColor,
  setWatermarkColor,
  watermarkOpacity,
  setWatermarkOpacity,
  cutter,
  setCutter,
  cutterShape,
  setCutterShape,
  opacity,
  setOpacity,
  cutterColor,
  setCutterColor,
  logoColor,
  setLogoColor,
  frameThickness,
  setFrameThickness,
}) => {
  return (
    <CustomizationContainer>
      <SectionTitle>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><path d="M130.05,206.11c-1.34,0-2.69,0-4,0L94,224a104.61,104.61,0,0,1-34.11-19.2l-.12-36c-.71-1.12-1.38-2.25-2-3.41L25.9,147.24a99.15,99.15,0,0,1,0-38.46l31.84-18.1c.65-1.15,1.32-2.29,2-3.41l.16-36A104.58,104.58,0,0,1,94,32l32,17.89c1.34,0,2.69,0,4,0L162,32a104.61,104.61,0,0,1,34.11,19.2l.12,36c.71,1.12,1.38,2.25,2,3.41l31.85,18.14a99.15,99.15,0,0,1,0,38.46l-31.84,18.1c-.65,1.15-1.32,2.29-2,3.41l-.16,36A104.58,104.58,0,0,1,162,224Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/></svg>
        QR Code Styling
      </SectionTitle>

      {/* Frame Customization */}
      <SubSectionTitle>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polyline points="160 80 192 80 192 112" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><polyline points="96 176 64 176 64 144" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><rect x="32" y="48" width="192" height="160" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/></svg>
        Frame Options
      </SubSectionTitle>
      <FrameCustomization
        frame={frame}
        setFrame={setFrame}
        frameColor={frameColor}
        setFrameColor={setFrameColor}
        frameThickness={frameThickness}
        setFrameThickness={setFrameThickness}
        shape={shape}
        currentFramePage={currentFramePage}
        setCurrentFramePage={setCurrentFramePage}
        markerStyle={markerStyle}
        markerColor={markerColor}
        cornerDots={cornerDots}
        cornerSquares={cornerSquares}
      />

      <Divider />

      {/* Shape Customization */}
      <SubSectionTitle>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polygon points="64 64 24 184 104 184 64 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><circle cx="156" cy="76" r="44" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><rect x="136" y="152" width="88" height="56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/></svg>
        Shape Options
      </SubSectionTitle>
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
      <SubSectionTitle>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><rect x="168" y="40" width="48" height="48" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><rect x="40" y="40" width="48" height="48" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><rect x="168" y="168" width="48" height="48" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><rect x="40" y="168" width="48" height="48" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><line x1="64" y1="168" x2="64" y2="88" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><line x1="168" y1="192" x2="88" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><line x1="192" y1="88" x2="192" y2="168" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><line x1="88" y1="64" x2="168" y2="64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/></svg>
        Marker Options
      </SubSectionTitle>
      <MarkerCustomization
        markerShape={markerShape}
        setMarkerShape={setMarkerShape}
        markerColor={markerColor}
        setMarkerColor={setMarkerColor}
      />

      <Divider />

      {/* Logo Customization */}
      <SubSectionTitle>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><rect x="96" y="96" width="64" height="64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/></svg>
        Logo Options
      </SubSectionTitle>
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
        logoColor={logoColor}
        setLogoColor={setLogoColor}
      />

      <Divider />

      {/* Watermark Customization */}
      <SubSectionTitle>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M208,144c0-72-80-128-80-128S48,72,48,144a80,80,0,0,0,160,0Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><path d="M136,192c20-3.37,36.61-20,40-40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/></svg>
        Watermark Options
      </SubSectionTitle>
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