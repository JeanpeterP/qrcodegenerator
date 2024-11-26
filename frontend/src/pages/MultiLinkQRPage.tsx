import React from 'react';
import { useParams } from 'react-router-dom';
import { getBackendUrl } from '../utils/constants';
import { ErrorPage } from '../components/ErrorPage';
import { MultiLink } from '../components/pageContent/MultiLink';
import { LoadingMessage } from '../components/common/LoadingMessage';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { PageContainer } from '../components/common/PageContainer';

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
      <MultiLink
        contentData={{
          title: qrData.title,
          description: qrData.description,
          logoUrl: qrData.logoUrl,
          links: qrData.contentData.links,
        }}
      />
    </PageContainer>
  );
};

export default MultiLinkQRPage;

// Remove the unnecessary styled components as they are moved to the component 