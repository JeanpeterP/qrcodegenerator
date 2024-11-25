import React from 'react';
import { useParams } from 'react-router-dom';
import { getBackendUrl } from '../utils/constants';
import styled from 'styled-components';
import { ErrorPage } from '../components/ErrorPage';

interface MultiLinkQRData {
  title: string;
  description?: string;
  contentType: 'multiplink';
  logoUrl?: string;
  contentData: {
    links: Array<{
      url: string;
      label: string;
      _id: string;
    }>;
  };
}

const MultiLinkQRPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [qrData, setQrData] = React.useState<MultiLinkQRData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${getBackendUrl()}/api/qr/${id}`);
        if (!response.ok) {
          throw new Error('QR code not found');
        }
        const data = await response.json();
        
        if (data.contentType !== 'multiplink') {
          setError('invalid_type');
          return;
        }
        
        setQrData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
  
  if (error) {
    if (error === 'invalid_type') {
      return <ErrorPage 
        title="Incorrect QR Code Type"
        message="This QR code is not a Multi-Link QR code. Please check the URL and try again."
        suggestion="If you're looking for a download link, try using the download URL instead."
      />;
    }
    return <ErrorPage 
      title="QR Code Not Found"
      message="We couldn't find the QR code you're looking for."
      suggestion="Please check the URL and try again."
    />;
  }
  
  if (!qrData) return <ErrorMessage>No data found</ErrorMessage>;

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

        <LinksContainer>
          {qrData.contentData.links.map((link) => (
            <LinkButton 
              key={link._id}
              href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <LinkContent>
                <LinkText>{link.label}</LinkText>
                <ShareButton aria-label="Share link">
                  <svg width="3" height="12" viewBox="0 0 3 12" fill="currentColor">
                    <path d="M1.5 12.0122C1.0875 12.0122 0.734375 11.8653 0.440625 11.5716C0.146875 11.2778 0 10.9247 0 10.5122C0 10.0997 0.146875 9.74658 0.440625 9.45283C0.734375 9.15908 1.0875 9.01221 1.5 9.01221C1.9125 9.01221 2.26562 9.15908 2.55938 9.45283C2.85313 9.74658 3 10.0997 3 10.5122C3 10.9247 2.85313 11.2778 2.55938 11.5716C2.26562 11.8653 1.9125 12.0122 1.5 12.0122Z" fill="currentColor"/>
                  </svg>
                </ShareButton>
              </LinkContent>
            </LinkButton>
          ))}
        </LinksContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default MultiLinkQRPage;

// Styled Components
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

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
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

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 24px;
  text-align: center;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
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