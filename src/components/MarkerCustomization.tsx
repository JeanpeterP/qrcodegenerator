import React from 'react';
import styled from 'styled-components';
import { CornerSquareType } from 'qr-code-styling';

interface MarkerCustomizationProps {
    markerStyle: CornerSquareType;
    setMarkerStyle: (style: CornerSquareType) => void;
    markerColor: string;
    setMarkerColor: (color: string) => void;
}

const MarkerPreview = ({ styleType }: { styleType: CornerSquareType }) => {
    return (
        <MarkerExampleContainer>
            <MarkerOuter styleType={styleType}>
                <MarkerInner styleType={styleType} />
            </MarkerOuter>
        </MarkerExampleContainer>
    );
};

export default function MarkerCustomization({
    markerStyle,
    setMarkerStyle,
    markerColor,
    setMarkerColor,
}: MarkerCustomizationProps) {
    const markerStyles: CornerSquareType[] = [
        "square",
        "dot",
        "extra-rounded",
    ];

    return (
        <>
            <GridContainer>
                <MarkerGrid itemCount={markerStyles.length}>
                    {markerStyles.map((style) => (
                        <MarkerOption
                            key={style}
                            active={markerStyle === style}
                            onClick={() => setMarkerStyle(style)}
                        >
                            <MarkerPreviewContainer>
                                <MarkerPreview styleType={style} />
                            </MarkerPreviewContainer>
                            <MarkerLabel>{style}</MarkerLabel>
                        </MarkerOption>
                    ))}
                </MarkerGrid>
            </GridContainer>
            <ColorPickerContainer>
                <ColorPickerLabel>
                    Marker Color:
                    <ColorPicker
                        type="color"
                        value={markerColor}
                        onChange={(e) => setMarkerColor(e.target.value)}
                    />
                </ColorPickerLabel>
            </ColorPickerContainer>
        </>
    );
}

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

const MarkerGrid = styled.div<{ itemCount: number }>`
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

const MarkerOption = styled.div<{ active: boolean }>`
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

const MarkerPreviewContainer = styled.div`
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
    border-radius: 4px;
    overflow: hidden;
`;

const MarkerLabel = styled.div`
    font-size: 0.8rem;
    text-align: center;
    margin-top: 0.5rem;
`;

const MarkerExampleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const MarkerOuter = styled.div<{ styleType: CornerSquareType }>`
    width: 42px;
    height: 42px;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    
    ${props => {
        switch (props.styleType) {
            case 'dot':
                return 'border-radius: 50%;';
            case 'extra-rounded':
                return 'border-radius: 15px;';
            default: // square
                return 'border-radius: 0;';
        }
    }}
`;

const MarkerInner = styled.div<{ styleType: CornerSquareType }>`
    width: 26px;
    height: 26px;
    background-color: #f8f9fa;
    
    ${props => {
        switch (props.styleType) {
            case 'dot':
                return 'border-radius: 50%;';
            case 'extra-rounded':
                return 'border-radius: 8px;';
            default: // square
                return 'border-radius: 0;';
        }
    }}
`;