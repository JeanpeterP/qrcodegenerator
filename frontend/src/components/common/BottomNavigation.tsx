import React from 'react';
import styled from 'styled-components';

interface BottomNavigationProps {
    onBack?: () => void;
    onNext?: () => void;
    backLabel?: string;
    nextLabel?: string;
    disableBack?: boolean;
    disableNext?: boolean;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
    onBack,
    onNext,
    backLabel = 'Back',
    nextLabel = 'Next',
    disableBack = false,
    disableNext = false,
}) => {
    return (
        <NavigationWrapper>
            <NavigationContainer>
                <ButtonGroup>
                    {onBack && (
                        <NavigationButton onClick={onBack} disabled={disableBack}>
                            <IconWrapper>
                                <BackIcon />
                            </IconWrapper>
                            {backLabel}
                        </NavigationButton>
                    )}
                    {onNext && (
                        <NavigationButton onClick={onNext} disabled={disableNext} primary>
                            {nextLabel}
                            <IconWrapper>
                                <NextIcon />
                            </IconWrapper>
                        </NavigationButton>
                    )}
                </ButtonGroup>
            </NavigationContainer>
        </NavigationWrapper>
    );
};

const NavigationWrapper = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;

const NavigationContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
`;

const NavigationButton = styled.button<{ primary?: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    border: none;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    background: ${props => props.primary ? '#ff6320' : '#f8f9fa'};
    color: ${props => props.primary ? 'white' : '#212529'};

    &:hover {
        background: ${props => props.primary ? '#e55a1d' : '#e9ecef'};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const IconWrapper = styled.span`
    display: flex;
    align-items: center;
`;

const BackIcon = styled.span`
    border: solid currentColor;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(135deg);
`;

const NextIcon = styled(BackIcon)`
    transform: rotate(-45deg);
`; 