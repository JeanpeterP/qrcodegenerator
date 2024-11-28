import React from 'react';
import styled from 'styled-components';
import { BottomNavigation } from '../common/BottomNavigation';

interface QRBuilderLayoutProps {
    children: React.ReactNode;
    onNext?: () => void;
    onBack?: () => void;
    nextLabel?: string;
    backLabel?: string;
    disableNext?: boolean;
    disableBack?: boolean;
}

export const QRBuilderLayout: React.FC<QRBuilderLayoutProps> = ({
    children,
    onNext,
    onBack,
    nextLabel = 'Next',
    backLabel = 'Back',
    disableNext = false,
    disableBack = false,
}) => {
    return (
        <LayoutWrapper>
            <ContentContainer>
                {children}
            </ContentContainer>
            <BottomNavigation
                onNext={onNext}
                onBack={onBack}
                nextLabel={nextLabel}
                backLabel={backLabel}
                disableNext={disableNext}
                disableBack={disableBack}
            />
        </LayoutWrapper>
    );
};

const LayoutWrapper = styled.div`
    min-height: 100vh;
    padding-bottom: 80px; // Space for the bottom navigation
`;

const ContentContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
`; 