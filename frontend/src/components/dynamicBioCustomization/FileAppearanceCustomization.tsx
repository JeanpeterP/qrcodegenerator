import React from 'react';
import styled from 'styled-components';

interface FileAppearanceCustomizationProps {
    // Add any appearance-specific props here
    // For now, it can be empty since we moved button customization
}

export const FileAppearanceCustomization: React.FC<FileAppearanceCustomizationProps> = () => {
    return (
        <CustomizationContainer>
            <CustomizationField>
                {/* Add appearance-specific customization options here */}
                <p>Appearance customization options coming soon...</p>
            </CustomizationField>
        </CustomizationContainer>
    );
};

const CustomizationContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CustomizationField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    font-size: 0.9rem;
    font-weight: 600;
    color: #333;
`;

const Input = styled.input`
    padding: 0.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 0.9rem;

    &:focus {
        outline: none;
        border-color: #ff6320;
    }
`;

const ColorInput = styled(Input)`
    height: 40px;
    padding: 0;
    cursor: pointer;
`; 