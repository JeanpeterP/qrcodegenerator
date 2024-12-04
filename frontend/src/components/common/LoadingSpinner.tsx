import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 40, 
  color = '#ff6320' 
}) => {
  return (
    <SpinnerWrapper>
      <Spinner size={size} color={color} />
    </SpinnerWrapper>
  );
};

// Styled Components
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Spinner = styled.div<{ size: number; color: string }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid ${props => props.color};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`; 