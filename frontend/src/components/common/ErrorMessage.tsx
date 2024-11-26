import React from 'react';
import styled from 'styled-components';

const StyledError = styled.div`
  color: #dc3545;
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
`;

interface ErrorMessageProps {
  children: React.ReactNode;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
  return <StyledError>{children}</StyledError>;
}; 