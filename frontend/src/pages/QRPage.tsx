import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBackendUrl } from '../utils/constants';
import styled from 'styled-components';

interface QRCodeData {
  title: string;
  description: string;
  contentType: 'download' | 'multilink' | 'youtube';
  buttonColor?: string;
  buttonText?: string;
  fileUrl?: string;
  originalFileName?: string;
  contentData?: {
    links?: { url: string; label: string }[];
    url?: string;
  };
  logoUrl?: string;
}

const QRPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [qrData, setQrData] = useState<QRCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('No QR ID provided');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const apiUrl = `${getBackendUrl()}/api/qr/${id}`;
        console.log('Fetching QR data from:', apiUrl);

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const text = await response.text();
          console.error('Error response:', text);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received data:', data);
        setQrData(data);
      } catch (err) {
        console.error('Error fetching QR code:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Add debug logging
  console.log('Current state:', { loading, error, qrData });

  if (loading) {
    return (
      <PageContainer>
        <ContentWrapper>
          <LoadingMessage>Loading...</LoadingMessage>
        </ContentWrapper>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ContentWrapper>
          <ErrorMessage>Error: {error}</ErrorMessage>
        </ContentWrapper>
      </PageContainer>
    );
  }

  if (!qrData) {
    return (
      <PageContainer>
        <ContentWrapper>
          <ErrorMessage>No data found</ErrorMessage>
        </ContentWrapper>
      </PageContainer>
    );
  }

  // Debug log the content type and links
  console.log('Content type:', qrData.contentType);
  console.log('Links:', qrData.contentData?.links);

  return (
    <PageContainer>
      <ContentWrapper>
        <ProfileSection>
          {qrData.logoUrl && (
            <LogoContainer>
              <LogoImage src={qrData.logoUrl} alt="Company Logo" />
            </LogoContainer>
          )}
          <Title>{qrData.title || 'Untitled'}</Title>
          {qrData.description && <Description>{qrData.description}</Description>}
        </ProfileSection>

        {qrData.contentType === 'multilink' && qrData.contentData?.links && (
          <LinksContainer>
            {qrData.contentData.links.map((link, index) => (
              <LinkButton 
                key={index} 
                href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <LinkContent>
                  <LinkText>{link.label || 'Untitled Link'}</LinkText>
                  <ShareButton aria-label="Share link">
                    <svg width="3" height="12" viewBox="0 0 3 12" fill="currentColor">
                      <path d="M1.5 12.0122C1.0875 12.0122 0.734375 11.8653 0.440625 11.5716C0.146875 11.2778 0 10.9247 0 10.5122C0 10.0997 0.146875 9.74658 0.440625 9.45283C0.734375 9.15908 1.0875 9.01221 1.5 9.01221C1.9125 9.01221 2.26562 9.15908 2.55938 9.45283C2.85313 9.74658 3 10.0997 3 10.5122C3 10.9247 2.85313 11.2778 2.55938 11.5716C2.26562 11.8653 1.9125 12.0122 1.5 12.0122Z" fill="currentColor"/>
                    </svg>
                  </ShareButton>
                </LinkContent>
              </LinkButton>
            ))}
          </LinksContainer>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default QRPage;

/* Styled Components */
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding: 40px 20px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: #333333;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666666;
  margin-bottom: 24px;
`;

const DownloadButton = styled.a`
  display: inline-block;
  background-color: #ff6320;
  color: white;
  padding: 15px 30px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1.2rem;
  margin-top: 20px;

  &:hover {
    background-color: #e55a1b;
  }
`;

const PDFViewer = styled.embed`
  width: 100%;
  height: 600px;
  border: none;
  margin-top: 20px;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;


const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* Aspect ratio for 16:9 */
  height: 0;
  overflow: hidden;
  margin-top: 20px;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 24px;
`;

const LogoImage = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  padding: 0 16px;
`;

const LinkButton = styled.a`
  display: block;
  text-decoration: none;
  background: white;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 16px 20px;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(0, 0, 0, 0.2);
  }
`;

const LinkContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LinkText = styled.span`
  color: #333;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  flex-grow: 1;
`;

const ShareButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s ease;
  color: #333;
  border-radius: 50%;

  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.05);
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
  color: #ff0000;
`; 