import React from "react";
import styled from "styled-components";
import { FrameCustomization } from "./FrameCustomization";
import { ShapeCustomization } from "./ShapeCustomization";
import { MarkerCustomization } from "./MarkerCustomization";
import { LogoCustomization } from "./LogoCustomization";
import { ChevronDown } from "lucide-react";
import { DotType, CornerSquareType } from "qr-code-styling";

interface CustomizationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  // Frame props
  frame: string;
  setFrame: (frame: string) => void;
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
}

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #1b294b;
  margin-bottom: 16px;
`;

const TabsContainer = styled.div`
  width: 100%;
`;

const TabList = styled.div`
  display: flex;
  margin-bottom: 20px;

  @media (max-width: 470px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  background-color: ${(props) => (props.active ? "#ff6320" : "#f9f9f9")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  border: 2px solid ${(props) => (props.active ? "#ff6320" : "#ccc")};
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? "#e0551c" : "#e9e9e9")};
  }

  & + & {
    margin-left: 10px;

    @media (max-width: 470px) {
      margin-left: 0;
    }
  }
`;

const TabContent = styled.div`
  padding: 16px;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 10px;
`;

export const CustomizationTabs: React.FC<CustomizationTabsProps> = ({
  activeTab,
  setActiveTab,
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
}) => {
  return (
    <TabsContainer>
      <SectionTitle>QR Code Styling</SectionTitle>
      <TabList>
        <TabButton
          active={activeTab === "frame"}
          onClick={() => setActiveTab("frame")}
        >
          Frame <ChevronDown size={16} />
        </TabButton>
        <TabButton
          active={activeTab === "shape"}
          onClick={() => setActiveTab("shape")}
        >
          Shape & Color <ChevronDown size={16} />
        </TabButton>
        <TabButton
          active={activeTab === "markers"}
          onClick={() => setActiveTab("markers")}
        >
          Markers <ChevronDown size={16} />
        </TabButton>
        <TabButton
          active={activeTab === "logo"}
          onClick={() => setActiveTab("logo")}
        >
          Logo <ChevronDown size={16} />
        </TabButton>
      </TabList>
      <TabContent>
        {activeTab === "frame" && (
          <FrameCustomization
            frame={frame}
            setFrame={setFrame}
            frameColor={frameColor}
            setFrameColor={setFrameColor}
            shape={shape}
            currentFramePage={currentFramePage}
            setCurrentFramePage={setCurrentFramePage}
          />
        )}
        {activeTab === "shape" && (
          <ShapeCustomization
            shape={shape}
            setShape={setShape}
            qrColor={qrColor}
            setQRColor={setQRColor}
            qrBackground={qrBackground}
            setQRBackground={setQRBackground}
          />
        )}
        {activeTab === "markers" && (
          <MarkerCustomization
            markerStyle={markerStyle}
            setMarkerStyle={setMarkerStyle}
            markerColor={markerColor}
            setMarkerColor={setMarkerColor}
          />
        )}
        {activeTab === "logo" && (
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
        )}
      </TabContent>
    </TabsContainer>
  );
};

// Styled Components
const CustomizerSection = styled.div`
  margin-top: 1rem;
  max-width: 529px;
`;

const CustomizerTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

// Include other styled components like TabsContainer, TabButton
