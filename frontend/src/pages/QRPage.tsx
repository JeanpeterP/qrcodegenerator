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
}

const QRPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [qrData, setQrData] = useState<QRCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const apiUrl = `${getBackendUrl()}/api/qr/${id}`;
    console.log('Fetching QR data from:', apiUrl);

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          console.error('Error response:', text);
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Received data:', data);
        setQrData(data);
      })
      .catch(err => {
        console.error('Error fetching QR code:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!qrData) return <div>No data found</div>;
  console.log("QRDATA", qrData);

  return (
    <PageContainer>
      <ContentWrapper>
        <Title>{qrData.title}</Title>
        <Description>{qrData.description}</Description>

        {/* Download Content Type */}
        {qrData.contentType === 'download' && qrData.fileUrl && (
          <>
            {qrData.originalFileName?.toLowerCase().endsWith('.pdf') ? (
              <PDFViewer src={qrData.fileUrl} type="application/pdf" />
            ) : (
              <DownloadButton
                href={qrData.fileUrl}
                download={qrData.originalFileName}
                style={{ backgroundColor: qrData.buttonColor || '#ff6320' }}
              >
                {qrData.buttonText || 'Download File'}
              </DownloadButton>
            )}
          </>
        )}

        {/* Multilink Content Type */}
        {qrData.contentType === 'multilink' && qrData.contentData?.links && (
          <LinkList>
            {qrData.contentData.links.map((link, index) => {
              const cleanUrl = link.url
                .replace(/^(?!https?:\/\/)/, 'https://'); // Ensure URL starts with 'https://'

              return (
                <LinkItem key={index}>
                  <a href={cleanUrl} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </LinkItem>
              );
            })}
          </LinkList>
        )}

        {/* YouTube Content Type */}
        {qrData.contentType === 'youtube' && qrData.contentData?.url && (
          <VideoContainer>
            <iframe
              src={qrData.contentData.url.replace('watch?v=', 'embed/')}
              frameBorder="0"
              allowFullScreen
            />
          </VideoContainer>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default QRPage;

/* Styled Components */
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  background: white;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 15px 25px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 600px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 40px;
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

const LinkItem = styled.li`
  margin-bottom: 20px;

  a {
    display: block;
    padding: 15px;
    background-color: #ff6320;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-size: 1.2rem;
    transition: background-color 0.3s;

    &:hover {
      background-color: #e55a1b;
    }
  }
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