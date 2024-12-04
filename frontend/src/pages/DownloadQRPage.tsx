import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { File } from '../components/pageContent/File';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { getBackendUrl } from '../utils/constants';

const DownloadQRPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [fileData, setFileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await fetch(`${getBackendUrl()}/api/qr/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch file data');
        }
        const data = await response.json();
        console.log('Fetched QR data:', data); // Debug log
        setFileData(data);
      } catch (err) {
        console.error('Error fetching file:', err);
        setError(err instanceof Error ? err.message : 'Failed to load file');
      } finally {
        setLoading(false);
      }
    };

    fetchFileData();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  if (!fileData) {
    return (
      <Container>
        <ErrorMessage>File not found</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <File
        fileData={{
          fileUrl: fileData.fileUrl,
          originalFileName: fileData.originalFileName,
          mimeType: fileData.mimeType,
          title: fileData.title,
          description: fileData.description,
          buttonText: fileData.buttonText,
          buttonColor: fileData.buttonColor,
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f8f9fa;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default DownloadQRPage;

// Remove the unnecessary styled components as they are moved to the component 