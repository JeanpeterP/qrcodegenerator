import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DotType } from "qr-code-styling";
import { ShapePreview } from './ShapePreview';
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import {
  GridContainer,
  OptionGrid,
  OptionBox,
  PreviewContainer,
  OptionLabel,
} from "../styles/OptionStyles";

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

    const [shapesPerPage, setShapesPerPage] = useState(4);

    useEffect(() => {
        const updateShapesPerPage = () => {
            if (window.innerWidth <= 470) {
                setShapesPerPage(2);
            } else if (window.innerWidth <= 900) {
                setShapesPerPage(3);
            } else {
                setShapesPerPage(4);
            }
        };

        window.addEventListener('resize', updateShapesPerPage);
        updateShapesPerPage(); // initial check

        return () => {
            window.removeEventListener('resize', updateShapesPerPage);
        };
    }, []);

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
                <OptionGrid itemCount={currentShapes.length}>
                    {currentShapes.map((option) => (
                        <OptionBox
                            key={option.value}
                            active={shape === option.value}
                            onClick={() => setShape(option.value as DotType)}
                        >
                            <PreviewContainer>
                                <ShapePreview shape={option.value as DotType} />
                            </PreviewContainer>
                            <OptionLabel>{option.label}</OptionLabel>
                        </OptionBox>
                    ))}
                </OptionGrid>
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

const PaginationArrow = styled.button<{ disabled?: boolean }>`
    background: ${(props) => (props.disabled ? '#f0f0f0' : '#fff')};
    border: 2px solid ${(props) => (props.disabled ? '#e0e0e0' : '#ff6320')};
    border-radius: 50%;
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
    color: ${(props) => (props.disabled ? '#ccc' : '#ff6320')};
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    width: 40px;
    height: 40px;

    @media (max-width: 470px) {
        width: 100%;
        border-radius: 8px;
    }

    &:hover:not(:disabled) {
        background: #ff6320;
        color: white;
        transform: scale(1.1);
    }

    &:active:not(:disabled) {
        transform: scale(0.95);
    }
`;