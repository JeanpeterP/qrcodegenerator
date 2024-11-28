import React from 'react';
import styled from 'styled-components';
// Import Phosphor Icons
import { Sliders, LinkSimple, Palette, Gear, ChartBar } from 'phosphor-react';

interface TopNavigationProps {
    currentStep: number;
}

const steps = [
    { label: 'Data Type', icon: <Sliders size={32} /> },
    { label: 'Destination', icon: <LinkSimple size={32} /> },
    { label: 'Style', icon: <Palette size={32} /> },
    { label: 'Setup', icon: <Gear size={32} /> },
    { label: 'Analytics', icon: <ChartBar size={32} /> },
];

export const TopNavigation: React.FC<TopNavigationProps> = ({ currentStep }) => {
    return (
        <StepperContainer>
            {steps.map((step, index) => (
                <StepperItem key={index}>
                    <StepButton
                        active={currentStep === index + 1}
                        completed={currentStep > index + 1}
                    >
                        {step.icon}
                    </StepButton>
                    <StepLabel>{step.label}</StepLabel>
                    {index < steps.length - 1 && (
                        <StepLine
                            active={currentStep > index + 1}
                        />
                    )}
                </StepperItem>
            ))}
        </StepperContainer>
    );
};

const StepperContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    padding: 3rem;
    background-color: #f8f9fa;
    z-index: 200;
    justify-content: space-between;
    width: 100%;
`;

const StepperItem = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    flex: 1;
    justify-content: center;
`;

const StepButton = styled.button<{ active: boolean; completed: boolean }>`
    background-color: ${({ active, completed }) =>
        completed ? '#1b294b' : active ? '#ff6320' : '#dee2e6'};
    color: ${({ active, completed }) =>
        completed || active ? 'white' : '#6c757d'};
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.5rem;
    cursor: default;
`;

const StepLabel = styled.span`
    font-size: 0.75rem;
    color: #1b294b;
    position: absolute;
    bottom: -1.5rem;
    width: max-content;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
`;

const StepLine = styled.div<{ active: boolean }>`
    position: absolute;
    top: 50%;
    left: calc(50% + 24px);
    width: calc(100% - 48px);
    height: 2px;
    background-color: ${({ active }) =>
        active ? '#1b294b' : 'rgba(0, 0, 0, 0.1)'};
    transform: translateY(-50%);
`; 