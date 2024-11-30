import React, { useState, useEffect } from 'react';
import { DotType } from "qr-code-styling";
import styled from 'styled-components';
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { MiniQRPreview } from './MiniQRPreview';

interface FrameCustomizationProps {
    frame: string;
    setFrame: (frame: string) => void;
    frameColor: string;
    setFrameColor: (color: string) => void;
    shape: DotType;
    currentFramePage: number;
    setCurrentFramePage: (page: number) => void;
}

export const FrameCustomization: React.FC<FrameCustomizationProps> = ({
    frame, setFrame, frameColor, setFrameColor, shape, currentFramePage, setCurrentFramePage
}) => {
    const frameOptions = [
        { id: "none", label: "None" },
        { id: "simple", label: "Simple" },
        { id: "rounded", label: "Rounded" },
        { id: "fancy", label: "Fancy" },
        { id: "chat", label: "Bubble" },
    ];

    const [framesPerPage, setFramesPerPage] = useState(4);

    useEffect(() => {
        const updateFramesPerPage = () => {
            if (window.innerWidth <= 470) {
                setFramesPerPage(2);
            } else if (window.innerWidth <= 900) {
                setFramesPerPage(3);
            } else {
                setFramesPerPage(4);
            }
        };

        window.addEventListener('resize', updateFramesPerPage);
        updateFramesPerPage();

        return () => {
            window.removeEventListener('resize', updateFramesPerPage);
        };
    }, []);

    const totalPages = Math.ceil(frameOptions.length / framesPerPage);
    const startIndex = currentFramePage * framesPerPage;
    const currentFrames = frameOptions.slice(startIndex, startIndex + framesPerPage);

    return (
        <>
            <GridContainer>
                <PaginationArrow 
                    onClick={() => currentFramePage > 0 && setCurrentFramePage(currentFramePage - 1)}
                    disabled={currentFramePage === 0}
                >
                    <CaretLeft size={24} weight="bold" />
                </PaginationArrow>
                <FrameGrid itemCount={currentFrames.length}>
                    {currentFrames.map((option) => (
                        <FrameOption
                            key={option.id}
                            active={frame === option.id}
                            onClick={() => setFrame(option.id)}
                        >
                            <MiniQRPreview 
                                frame={option.id} 
                                shape={shape} 
                                frameColor={frameColor}
                                markerStyle="dot"
                                markerColor="#000000"
                            />
                            <FrameLabel>{option.label}</FrameLabel>
                        </FrameOption>
                    ))}
                </FrameGrid>
                <PaginationArrow 
                    onClick={() => currentFramePage < totalPages - 1 && setCurrentFramePage(currentFramePage + 1)}
                    disabled={currentFramePage >= totalPages - 1}
                >
                    <CaretRight size={24} weight="bold" />
                </PaginationArrow>
            </GridContainer>
            <ColorPickerContainer>
                <ColorPickerLabel>
                    Frame Color:
                    <ColorPicker
                        type="color"
                        value={frameColor}
                        onChange={(e) => setFrameColor(e.target.value)}
                    />
                </ColorPickerLabel>
            </ColorPickerContainer>
        </>
    );
};

// Styled Components (added missing ones)
const ColorPickerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
    }
`;

const ColorPickerLabel = styled.label`
    display: flex;
    align-items: center;
    font-size: 0.8rem;

    @media (min-width: 768px) {
        font-size: 0.9rem;
    }
`;

const ColorPicker = styled.input`
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    margin-left: 0.5rem;

    &::-webkit-color-swatch-wrapper {
        padding: 0;
    }

    &::-webkit-color-swatch {
        border: none;
        border-radius: 50%;
    }

    @media (min-width: 768px) {
        width: 32px;
        height: 32px;
    }
`;

const GridContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 16px;

    @media (max-width: 470px) {
        flex-direction: column;
    }
`;

const FrameGrid = styled.div<{ itemCount: number }>`
    display: grid;
    grid-template-columns: repeat(${(props) => props.itemCount}, 1fr);
    gap: 16px;
    width: 100%;
    max-width: 600px;
    justify-content: center;

    @media (max-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 470px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const FrameOption = styled.div<{ active: boolean }>`
    border: 2px solid ${(props) => (props.active ? "#ff6320" : "#ced4da")};
    border-radius: 8px;
    padding: 0.5rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease;

    &:hover {
        border-color: #ff6320;
    }
`;

const FrameLabel = styled.div`
    font-size: 0.8rem;
    text-align: center;
    margin-top: 0.5rem;
`;

const PaginationArrow = styled.button<{ disabled?: boolean }>`
    background: ${props => props.disabled ? '#f0f0f0' : '#fff'};
    border: 2px solid ${props => props.disabled ? '#e0e0e0' : '#ff6320'};
    border-radius: 50%;
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    color: ${props => props.disabled ? '#ccc' : '#ff6320'};
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    width: 40px;
    height: 40px;

    &:hover:not(:disabled) {
        background: #ff6320;
        color: white;
        transform: scale(1.1);
    }

    &:active:not(:disabled) {
        transform: scale(0.95);
    }
`;

// Include styled components as needed. 