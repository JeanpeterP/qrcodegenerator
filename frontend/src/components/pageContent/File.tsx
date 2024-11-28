import React from 'react';

interface FileProps {
  fileData: {
    title?: string;
    description?: string;
    buttonColor?: string;
    buttonText?: string;
    fileUrl?: string; // Include if necessary
    originalFileName?: string; // Include if necessary
    isPreview?: boolean; // Optional prop to adjust styling for preview
  };
}

export const File: React.FC<FileProps> = ({ fileData }) => {
  const isPreview = fileData.isPreview;
  
  const buttonStyles = {
    backgroundColor: fileData.buttonColor || '#ff6320',
    padding: isPreview ? '12px 24px' : '15px 30px',
    borderRadius: '8px',
    color: 'white',
    fontSize: isPreview ? '1rem' : '1.2rem',
    marginTop: '20px',
    display: 'inline-block',
    textDecoration: 'none',
  };

  return (
    <div
      className="file-content"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: isPreview ? 'transparent' : '#fafafa',
        padding: 0,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: isPreview ? '1rem' : '1.5rem',
            fontWeight: 700,
            color: '#333',
            marginBottom: '8px',
          }}
        >
          {fileData.title || 'Download'}
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: '#666',
            marginBottom: '24px',
          }}
        >
          {fileData.description || 'No description provided'}
        </p>
        {isPreview ? (
          <button style={buttonStyles}>
            {fileData.buttonText || 'Download'}
          </button>
        ) : fileData.fileUrl ? (
          <a href={fileData.fileUrl} style={buttonStyles} download={fileData.originalFileName}>
            {fileData.buttonText || 'Download'}
          </a>
        ) : null}
      </div>
    </div>
  );
};