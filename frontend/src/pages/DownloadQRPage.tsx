import React from 'react';
import { useParams } from 'react-router-dom';
import { getBackendUrl } from '../utils/constants';
import styled from 'styled-components';
import { ErrorPage } from '../components/ErrorPage';

interface DownloadQRData {
  title: string;
  description?: string;
  contentType: 'download';
  buttonColor?: string;
  buttonText?: string;
  fileUrl?: string;
  originalFileName?: string;
}

const DownloadQRPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [qrData, setQrData] = React.useState<DownloadQRData | null>(null);
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
        
        // Check if the QR code is of the correct type
        if (data.contentType !== 'download') {
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
  
  // Handle different error types
  if (error) {
    if (error === 'invalid_type') {
      return <ErrorPage 
        title="Incorrect QR Code Type"
        message="This QR code is not a Download QR code. Please check the URL and try again."
        suggestion="If you're looking for multiple links, try using the multi-link URL instead."
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
        <Title>{qrData.title || 'Download'}</Title>
        {qrData.description && <Description>{qrData.description}</Description>}
        
        {qrData.fileUrl && (
          <DownloadButton 
            href={qrData.fileUrl}
            download={qrData.originalFileName}
            style={{ backgroundColor: qrData.buttonColor || '#ff6320' }}
          >
            {qrData.buttonText || 'Download'}
          </DownloadButton>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default DownloadQRPage;

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
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 24px;
`;

const DownloadButton = styled.a`
  display: inline-block;
  color: white;
  padding: 15px 30px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1.2rem;
  margin-top: 20px;

  &:hover {
    opacity: 0.9;
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