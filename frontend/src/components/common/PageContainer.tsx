import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
`;

export const PageContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Container>{children}</Container>;
}; 