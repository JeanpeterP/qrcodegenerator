import React, { useState } from 'react';
import styled from 'styled-components';
import { QRData } from '../types/qr';
import { HandleInputChangeFunction } from './QRCodeGenerator';

// Add necessary imports
import { Input, ColorPicker, ColorPickerLabel } from './common/FormElements';

// Import customization components based on Dynamic Bio types
import { FileCustomization } from './dynamicBioCustomization/FileCustomization';
import { FileAppearanceCustomization } from './dynamicBioCustomization/FileAppearanceCustomization';
import { BackgroundCustomization } from './dynamicBioCustomization/BackgroundCustomization';
// Import other customization components as needed

import { ChevronDown } from 'lucide-react';

interface DynamicBioCustomizationTabsProps {
    qrType: string;
    qrData: QRData;
    handleInputChange: HandleInputChangeFunction;
    // Add props specific to Dynamic Bio customization
    // For example, for file customization:
    title: string;
    setTitle: (title: string) => void;
    description: string;
    setDescription: (description: string) => void;
    buttonText: string;
    setButtonText: (text: string) => void;
    buttonColor: string;
    setButtonColor: (color: string) => void;
    dynamicBioType: string; // E.g., 'file', 'download', etc.
    backgroundType: string;
    setBackgroundType: (type: string) => void;
}

export const DynamicBioCustomizationTabs: React.FC<DynamicBioCustomizationTabsProps> = ({
    qrType,
    qrData,
    handleInputChange,
    title,
    setTitle,
    description,
    setDescription,
    buttonText,
    setButtonText,
    buttonColor,
    setButtonColor,
    dynamicBioType,
    backgroundType,
    setBackgroundType,
}) => {
    const [activeTab, setActiveTab] = useState<string>('content');

    return (
        <TabsContainer>
            <SectionTitle>Dynamic Bio Styling</SectionTitle>
            <TabList>
                <TabButton
                    active={activeTab === 'content'}
                    onClick={() => setActiveTab('content')}
                >
                    Content <ChevronDown size={16} />
                </TabButton>
                <TabButton
                    active={activeTab === 'appearance'}
                    onClick={() => setActiveTab('appearance')}
                >
                    Appearance <ChevronDown size={16} />
                </TabButton>
                <TabButton
                    active={activeTab === 'background'}
                    onClick={() => setActiveTab('background')}
                >
                    Background <ChevronDown size={16} />
                </TabButton>
            </TabList>

            <TabContent>
                {activeTab === 'content' && dynamicBioType === 'file' && (
                    <FileCustomization
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                        buttonText={buttonText}
                        setButtonText={setButtonText}
                        buttonColor={buttonColor}
                        setButtonColor={setButtonColor}
                    />
                )}

                {activeTab === 'appearance' && dynamicBioType === 'file' && (
                    <FileAppearanceCustomization />
                )}

                {activeTab === 'background' && (
                    <BackgroundCustomization
                        backgroundType={backgroundType}
                        setBackgroundType={setBackgroundType}
                    />
                )}
            </TabContent>
        </TabsContainer>
    );
};

// Styled Components (matching CustomizationTabs exactly)
const TabsContainer = styled.div`
    width: 100%;
    margin-top: 20px;
`;

const SectionTitle = styled.h2`
    font-size: 1.25rem;
    color: #1b294b;
    margin-bottom: 16px;
`;

const TabList = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const TabButton = styled.button<{ active: boolean }>`
    flex: 1;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    background-color: ${props => (props.active ? '#ff6320' : '#f9f9f9')};
    color: ${props => (props.active ? '#fff' : '#333')};
    border: 2px solid ${props => (props.active ? '#ff6320' : '#ccc')};
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${props => (props.active ? '#e0551c' : '#e9e9e9')};
    }

    & + & {
        margin-left: 10px;
    }

    svg {
        margin-left: 0.5rem;
        transform: ${props => (props.active ? 'rotate(180deg)' : 'rotate(0)')};
        transition: transform 0.3s ease;
    }
`;

const TabContent = styled.div`
    padding: 16px;
    background-color: #fff;
    border: 2px solid #ccc;
    border-radius: 10px;
`;