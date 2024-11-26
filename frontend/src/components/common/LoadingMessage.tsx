import React from 'react';
import styled from 'styled-components';

const StyledLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #666;
  font-size: 1.1rem;
`;

export const LoadingMessage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <StyledLoadingContainer>{children}</StyledLoadingContainer>;
}; 