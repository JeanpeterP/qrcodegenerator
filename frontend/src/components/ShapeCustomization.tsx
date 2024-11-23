import React from 'react';
import styled from 'styled-components';
import { DotType } from "qr-code-styling";
import { ShapePreview } from './ShapePreview';
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface ShapeCustomizationProps {
    shape: DotType;
    setShape: (shape: DotType) => void;
    qrColor: string;
    setQRColor: (color: string) => void;
    qrBackground: string;
    setQRBackground: (color: string) => void;
    currentShapePage: number;
    setCurrentShapePage: (page: number) => void;
}

export const ShapeCustomization: React.FC<ShapeCustomizationProps> = ({
    shape,
    setShape,
    qrColor,
    setQRColor,
    qrBackground,
    setQRBackground,
    currentShapePage,
    setCurrentShapePage
}) => {
    const shapeOptions = [
        { value: "square", label: "Square" },
        { value: "dots", label: "Dots" },
        { value: "rounded", label: "Rounded" },
        { value: "classy", label: "Classy" },
        { value: "classy-rounded", label: "Classy Rounded" },
        { value: "extra-rounded", label: "Extra Rounded" },
    ];

    const shapesPerPage = 4;
    const totalPages = Math.ceil(shapeOptions.length / shapesPerPage);
    const startIndex = currentShapePage * shapesPerPage;
    const currentShapes = shapeOptions.slice(startIndex, startIndex + shapesPerPage);

    return (
        <>
            <GridContainer>
                <PaginationArrow 
                    onClick={() => currentShapePage > 0 && setCurrentShapePage(currentShapePage - 1)}
                    disabled={currentShapePage === 0}
                >
                    <CaretLeft size={24} weight="bold" />
                </PaginationArrow>
                <ShapeGrid itemCount={currentShapes.length}>
                    {currentShapes.map((option) => (
                        <ShapeOption
                            key={option.value}
                            active={shape === option.value}
                            onClick={() => setShape(option.value as DotType)}
                        >
                            <ShapePreviewContainer>
                                <ShapePreview shape={option.value as DotType} />
                            </ShapePreviewContainer>
                            <ShapeLabel>{option.label}</ShapeLabel>
                        </ShapeOption>
                    ))}
                </ShapeGrid>
                <PaginationArrow 
                    onClick={() => currentShapePage < totalPages - 1 && setCurrentShapePage(currentShapePage + 1)}
                    disabled={currentShapePage >= totalPages - 1}
                >
                    <CaretRight size={24} weight="bold" />
                </PaginationArrow>
            </GridContainer>
            <ColorPickerContainer>
                <ColorPickerLabel>
                    QR Color:
                    <ColorPicker
                        type="color"
                        value={qrColor}
                        onChange={(e) => setQRColor(e.target.value)}
                    />
                </ColorPickerLabel>
            </ColorPickerContainer>
        </>
    );
};

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
    gap: 0.5rem;
    margin-top: 0.5rem;
`;

const ShapeGrid = styled.div<{ itemCount: number }>`
    display: grid;
    grid-template-columns: ${props => 
        props.itemCount <= 4 
            ? `repeat(${props.itemCount}, 1fr)` 
            : 'repeat(4, 1fr)'
    };
    gap: 1rem;
    width: ${props => props.itemCount < 4 ? 'auto' : '100%'};
    max-width: 600px;
    justify-content: center;
`;

const ShapeOption = styled.div<{ active: boolean }>`
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

const ShapePreviewContainer = styled.div`
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
    border-radius: 4px;
    overflow: hidden;
`;

const ShapeLabel = styled.div`
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