import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface ErrorPageProps {
  title: string;
  message: string;
  suggestion?: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ title, message, suggestion }) => {
  return (
    <ErrorContainer>
      <ErrorContent>
        <ErrorIcon>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12" y2="16" />
          </svg>
        </ErrorIcon>
        <ErrorTitle>{title}</ErrorTitle>
        <ErrorMessage>{message}</ErrorMessage>
        {suggestion && <ErrorSuggestion>{suggestion}</ErrorSuggestion>}
        <HomeButton to="/">Return to Home</HomeButton>
      </ErrorContent>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fafafa;
`;

const ErrorContent = styled.div`
  text-align: center;
  max-width: 500px;
  padding: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ErrorIcon = styled.div`
  color: #ff6320;
  margin-bottom: 24px;

  svg {
    width: 64px;
    height: 64px;
  }
`;

const ErrorTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
  font-weight: 600;
`;

const ErrorMessage = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.5;
`;

const ErrorSuggestion = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  background-color: #ff6320;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e55a1b;
  }
`; 