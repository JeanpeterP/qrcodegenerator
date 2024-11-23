import React from 'react';
import styled from 'styled-components';
import { LogoPreview } from './LogoPreview';

export type LogoType = 'custom' | 'stacked' | 'open-box' | 'closed-box';

interface LogoCustomizationProps {
    logo: LogoType;
    setLogo: (logo: LogoType) => void;
    customLogo: string;
    setCustomLogo: (logo: string) => void;
}

export const LogoCustomization: React.FC<LogoCustomizationProps> = ({
    logo,
    setLogo,
    customLogo,
    setCustomLogo
}) => {
    const logoOptions: { type: LogoType; label: string }[] = [
        { type: 'custom', label: 'Custom Upload' },
        { type: 'stacked', label: 'Stacked Text' },
        { type: 'open-box', label: 'Open Box' },
        { type: 'closed-box', label: 'Closed Box' },
    ];

    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCustomLogo(e.target?.result as string);
                setLogo('custom');
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <GridContainer>
            <LogoGrid itemCount={logoOptions.length}>
                {logoOptions.map((option) => (
                    <LogoOption
                        key={option.type}
                        active={logo === option.type}
                        onClick={() => option.type !== 'custom' && setLogo(option.type)}
                    >
                        <LogoPreviewContainer>
                            {option.type === 'custom' && customLogo ? (
                                <img 
                                    src={customLogo} 
                                    alt="Custom logo" 
                                    style={{ 
                                        maxWidth: '100%', 
                                        maxHeight: '100%', 
                                        objectFit: 'contain' 
                                    }} 
                                />
                            ) : (
                                <LogoPreview type={option.type} />
                            )}
                        </LogoPreviewContainer>
                        <LogoLabel>{option.label}</LogoLabel>
                        {option.type === 'custom' && (
                            <LogoUploadInput
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                onClick={(e) => e.stopPropagation()}
                            />
                        )}
                    </LogoOption>
                ))}
            </LogoGrid>
        </GridContainer>
    );
};

const GridContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
`;

const LogoGrid = styled.div<{ itemCount: number }>`
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

const LogoOption = styled.div<{ active: boolean }>`
    position: relative;
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

const LogoPreviewContainer = styled.div`
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
    border-radius: 4px;
    overflow: hidden;
`;

const LogoLabel = styled.div`
    font-size: 0.8rem;
    text-align: center;
    margin-top: 0.5rem;
`;

const LogoUploadInput = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
`;
 