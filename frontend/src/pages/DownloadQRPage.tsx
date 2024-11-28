import React from 'react';
import { useParams } from 'react-router-dom';
import { getBackendUrl } from '../utils/constants';
import { ErrorPage } from '../components/ErrorPage';
import { File } from '../components/pageContent/File';
import { LoadingMessage } from '../components/common/LoadingMessage';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { PageContainer } from '../components/common/PageContainer';
import colorfulBioMobile from '../images/ColorFulBioMobile.png';
import colorfulBioDesktop from '../images/ColorfulBioDesktop.png';
import styled from 'styled-components';

interface DownloadQRData {
  title: string;
  description?: string;
  contentType: 'download';
  buttonColor?: string;
  buttonText?: string;
  fileUrl?: string;
  originalFileName?: string;
  backgroundType?: string;
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
      <BackgroundWrapper backgroundType={qrData.backgroundType}>
        <File
          fileData={{
            title: qrData.title,
            description: qrData.description,
            buttonColor: qrData.buttonColor,
            buttonText: qrData.buttonText,
            fileUrl: qrData.fileUrl,
            originalFileName: qrData.originalFileName,
          }}
        />
      </BackgroundWrapper>
    </PageContainer>
  );
};

const BackgroundWrapper = styled.div<{ backgroundType?: string }>`
  position: relative;
  min-height: 100vh;
  width: 100%;
  
  ${props => props.backgroundType === 'colorful' && `
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url(${colorfulBioMobile});
      background-size: cover;
      background-position: center;
      z-index: -1;
    }
    
    @media (min-width: 768px) {
      &::before {
        background-image: url(${colorfulBioDesktop});
      }
    }
  `}
`;

export default DownloadQRPage;

// Remove the unnecessary styled components as they are moved to the component 