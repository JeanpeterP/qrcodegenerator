import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBackendUrl } from '../utils/constants';

interface QRCodeData {
  title: string;
  description: string;
  contentType: 'download' | 'multiplink' | 'youtube';
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
  console.log("QRDATA",qrData);
  return (
    <div className="qr-page">
      <h1>{qrData.title}</h1>
      <p>{qrData.description}</p>

      {qrData.contentType === 'download' && (
        <a 
          href={qrData.fileUrl} 
          className="download-button" 
          download={qrData.originalFileName}
          style={{ backgroundColor: qrData.buttonColor }}
        >
          {qrData.buttonText}
        </a>
      )}

      {qrData.contentType === 'multiplink' && qrData.contentData?.links && (
        <ul className="link-list">
          {qrData.contentData.links.map((link, index) => (
            <li key={index}>
              <a href={link.url}>{link.label}</a>
            </li>
          ))}
        </ul>
      )}

      {qrData.contentType === 'youtube' && qrData.contentData?.url && (
        <div className="video-container">
          <iframe
            src={qrData.contentData.url.replace('watch?v=', 'embed/')}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default QRPage; 