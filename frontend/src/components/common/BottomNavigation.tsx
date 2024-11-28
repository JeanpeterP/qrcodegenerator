import React from 'react';
import styled from 'styled-components';

interface BottomNavigationProps {
    onNext?: () => void;
    onBack?: () => void;
    nextLabel?: string;
    backLabel?: string;
    disableNext?: boolean;
    disableBack?: boolean;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
    onNext,
    onBack,
    nextLabel = 'Next',
    backLabel = 'Back',
    disableNext = false,
    disableBack = false,
}) => {
    return (
        <NavigationWrapper>
            <Button onClick={onBack} disabled={disableBack}>
                {backLabel}
            </Button>
            <Button onClick={onNext} disabled={disableNext}>
                {nextLabel}
            </Button>
        </NavigationWrapper>
    );
};

const NavigationWrapper = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: white;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    background: white;
    cursor: pointer;
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;