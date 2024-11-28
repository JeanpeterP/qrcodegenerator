import React from 'react';
import styled from 'styled-components';
import colorfulBioMobile from '../../images/ColorFulBioMobile.png';

interface BackgroundCustomizationProps {
    backgroundType: string;
    setBackgroundType: (type: string) => void;
}

export const BackgroundCustomization: React.FC<BackgroundCustomizationProps> = ({
    backgroundType,
    setBackgroundType,
}) => {
    return (
        <Container>
            <Title>Background</Title>
            <OptionsGrid>
                <BackgroundOption 
                    selected={backgroundType === 'colorful'}
                    onClick={() => setBackgroundType('colorful')}
                >
                    <BackgroundPreview imageUrl={colorfulBioMobile} />
                    <OptionLabel>Colorful</OptionLabel>
                </BackgroundOption>
                {/* Add more background options here */}
            </OptionsGrid>
        </Container>
    );
};
const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #1b294b;
`;

const Container = styled.div`
    padding: 1rem;
`;

const OptionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
`;

const BackgroundOption = styled.div<{ selected: boolean }>`
    position: relative;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    aspect-ratio: 9/16;
    border: 2px solid ${props => props.selected ? '#ff6320' : 'transparent'};
    transition: border-color 0.2s ease;

    &:hover {
        border-color: #ff6320;
    }
`;

const BackgroundPreview = styled.div<{ imageUrl: string }>`
    width: 100%;
    height: 100%;
    background-image: url(${props => props.imageUrl});
    background-size: cover;
    background-position: center;
`;

const OptionLabel = styled.span`
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    padding: 0.5rem 0;
    font-size: 0.8rem;
`; 