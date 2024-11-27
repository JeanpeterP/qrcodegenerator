import React from 'react';
import styled from 'styled-components';
import { FrameCustomization } from './FrameCustomization';
import { ShapeCustomization } from './ShapeCustomization';
import MarkerCustomization from './MarkerCustomization';
import { LogoCustomization } from './LogoCustomization';
import { ChevronDown } from "lucide-react";
import { DotType } from "qr-code-styling";
import { CornerSquareType } from 'qr-code-styling';

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
        src: string | null;
        width?: number;
        height?: number;
    } | null;
    setLogo: React.Dispatch<React.SetStateAction<{
        src: string | null;
        width?: number;
        height?: number;
    } | null>>;
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
    // Navigation props
    currentFramePage: number;
    setCurrentFramePage: (page: number) => void;
    currentShapePage: number;
    setCurrentShapePage: (page: number) => void;
    customLogo: string | null;
    setCustomLogo: (logo: string | null) => void;
}

// Rename the styled component to avoid name conflict
const TabsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    gap: 0.5rem;
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
        <CustomizerSection>
            <CustomizerTitle>Customize</CustomizerTitle>
            <TabsContainer>
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
            </TabsContainer>

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
                    currentShapePage={currentShapePage}
                    setCurrentShapePage={setCurrentShapePage}
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
                    customLogo={customLogo || ''}
                    setCustomLogo={setCustomLogo}
                />
            )}
        </CustomizerSection>
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

const TabButton = styled.button<{ active: boolean }>`
    background: ${(props) => (props.active ? "#ff6320" : "#f8f9fa")};
    border: none;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${(props) => (props.active ? "white" : "#616568")};
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 4px;
    margin-right: 0.5rem;

    &:hover {
        background-color: #ff6320;
        color: white;
    }

    svg {
        margin-left: 0.5rem;
        transform: ${(props) => (props.active ? "rotate(180deg)" : "rotate(0)")};
        transition: transform 0.3s ease;
    }
`;

// Include other styled components like TabsContainer, TabButton 