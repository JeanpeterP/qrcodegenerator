import React from 'react';
import styled from 'styled-components';
import { getBackendUrl } from '../../utils/constants';

interface UrlPageProps {
  title?: string;
  description?: string;
  bannerImageUrl?: string;
  buttonText?: string;
  buttonColor?: string;
  actionUrl?: string;
}

export const UrlPage: React.FC<UrlPageProps> = ({
  title,
  description,
  bannerImageUrl,
  buttonText = 'View More',
  buttonColor = '#ff6320',
  actionUrl
}) => {
  return (
    <Container>
      {bannerImageUrl && (
        <BannerImage
          src={`${bannerImageUrl}`}
          alt="Banner"
        />
      )}
      <Content>
        {title && <Title>{title}</Title>}
        {description && <Description>{description}</Description>}
        <ActionButton
          href={actionUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: buttonColor }}
        >
          {buttonText}
        </ActionButton>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const BannerImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 25vh;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ActionButton = styled.a`
  display: inline-block;
  padding: 12px 24px;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
`; 