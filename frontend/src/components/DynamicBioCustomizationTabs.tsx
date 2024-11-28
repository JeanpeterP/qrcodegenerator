import React from 'react';
import styled from 'styled-components';

// Import customization components based on Dynamic Bio types
import { FileCustomization } from './dynamicBioCustomization/FileCustomization';
import { FileAppearanceCustomization } from './dynamicBioCustomization/FileAppearanceCustomization';
import { BackgroundCustomization } from './dynamicBioCustomization/BackgroundCustomization';
// Import other customization components as needed

import { ChevronDown } from 'lucide-react';

interface DynamicBioCustomizationTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
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
    activeTab,
    setActiveTab,
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
    return (
        <CustomizerSection>
            <TabsContainer>
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
            </TabsContainer>

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
        </CustomizerSection>
    );
};

// Styled Components
const CustomizerSection = styled.div`
    margin-top: 1rem;
    max-width: 529px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const TabsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    gap: 0.5rem;
`;

const TabButton = styled.button<{ active: boolean }>`
    background: ${(props) => (props.active ? '#ff6320' : '#f8f9fa')};
    border: none;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${(props) => (props.active ? 'white' : '#616568')};
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
        transform: ${(props) => (props.active ? 'rotate(180deg)' : 'rotate(0)')};
        transition: transform 0.3s ease;
    }
`;