import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBackendUrl } from '../utils/constants';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorPage } from '../components/ErrorPage';
import { MultiLink } from '../components/pageContent/MultiLink';
import { File } from '../components/pageContent/File';
import { PageContainer } from '../components/common/PageContainer';
import { UrlPage } from '../components/pageContent/UrlPage';

interface QRCodeData {
  id: string;
  title: string;
  description?: string;
  contentType: 'download' | 'multilink' | 'youtube' | 'url';
  logoUrl?: string;
  contentData?: any; // You can type this more precisely based on your API response
  bannerImageUrl?: string;
  buttonText?: string;
  buttonColor?: string;
  actionUrl?: string;
}

const QRPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [qrData, setQrData] = useState<QRCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQRCodeData = async () => {
      try {
        const response = await fetch(`${getBackendUrl()}/api/qr/${id}`);
        if (!response.ok) {
          throw new Error('QR code not found');
        }
        const result = await response.json();
        setQrData(result.data);
        console.log("DATA", result);
        console.log("QRDATA after setting", result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchQRCodeData();
  }, [id]);

  if (loading) {
    return (
      <PageContainer>
        <LoadingSpinner />
      </PageContainer>
    );
  }

  if (error) {
    return <ErrorPage title="Error" message={error} />;
  }

  if (!qrData) {
    return <ErrorPage title="QR Code Not Found" message="No data found for this QR code." />;
  }

  // Render the appropriate component based on contentType
  switch (qrData.contentType) {
    case 'download':
      return (
        <PageContainer>
          <File
            fileData={{
              fileUrl: qrData.contentData.fileUrl,
              originalFileName: qrData.contentData.originalFileName,
              mimeType: qrData.contentData.mimeType,
              title: qrData.title,
              description: qrData.description,
              buttonText: qrData.contentData.buttonText,
              buttonColor: qrData.contentData.buttonColor,
            }}
          />
        </PageContainer>
      );
    case 'multilink':
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
    case 'url':
      return (
        <PageContainer>
          <UrlPage
            title={qrData.title}
            description={qrData.description}
            bannerImageUrl={qrData.bannerImageUrl}
            buttonText={qrData.buttonText}
            buttonColor={qrData.buttonColor}
            actionUrl={qrData.actionUrl}
          />
        </PageContainer>
      );
    // Add more cases for other content types as needed
    default:
      return (
        <ErrorPage
          title="Unsupported Content Type"
          message={`Content type '${qrData.contentType}' is not supported.`}
        />
      );
  }
};

export default QRPage; 