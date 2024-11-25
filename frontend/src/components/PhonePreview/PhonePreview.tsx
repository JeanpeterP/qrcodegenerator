import React from 'react';
import styled from 'styled-components';


const PreviewColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const PhonePreviewColumn = styled(PreviewColumn)<{ show: boolean }>`
  display: ${props => props.show ? 'flex' : 'none'};
  max-width: 375px;
  background: #f8f9fa;
  align-items: center;
  padding: 20px;
  
  @media (max-width: 1200px) {
    display: none;
  }
`;

const PhoneFrame = styled.div`
  width: 240px;
  height: 487px;
  background: white;
  border-radius: 40px;
  border: 12px solid #1b294b;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 25px;
    background: #1b294b;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
`;

const PhoneContent = styled.div`
  padding: 20px;
  height: 100%;
  overflow-y: auto;
`;

const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #1b294b;
`;

interface PhonePreviewProps {
    show: boolean;
    qrType: string;
    qrData: {
        file?: {
            title?: string;
            description?: string;
            buttonColor?: string;
            buttonText?: string;
        };
        contentData?: {
            title?: string;
            links?: Array<{ label: string; url: string; }>;
        };
        youtube?: {
            url: string;
        };
    };
}

export const PhonePreview: React.FC<PhonePreviewProps> = ({ show, qrType, qrData }) => {
    return (
        <PhonePreviewColumn show={show}>
            <Title>Phone Preview</Title>
            <PhoneFrame>
                <PhoneContent>
                    {qrType === 'file' && (
                        <div className="download-preview">
                            <h1>{qrData.file?.title || 'Download File'}</h1>
                            <p>{qrData.file?.description || 'No description provided'}</p>
                            <button 
                                style={{ 
                                    backgroundColor: qrData.file?.buttonColor || '#ff6320',
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                {qrData.file?.buttonText || 'Download'}
                            </button>
                        </div>
                    )}
                    {qrType === 'multiplink' && (
                        <div className="multilink-preview">
                            <h1>{qrData.contentData?.title || 'My Links'}</h1>
                            <div className="links-container">
                                {qrData.contentData?.links?.map((link, index) => (
                                    <div 
                                        key={index}
                                        className="link-item"
                                        style={{
                                            padding: '15px',
                                            margin: '10px 0',
                                            backgroundColor: 'white',
                                            borderRadius: '12px',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        <p>{link.label || `Link ${index + 1}`}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {qrType === 'youtube' && (
                        <div className="youtube-preview">
                            <div className="video-container">
                                <div className="video-placeholder" 
                                    style={{
                                        aspectRatio: '16/9',
                                        backgroundColor: '#000',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <svg viewBox="0 0 24 24" width="48" height="48" fill="red">
                                        <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.2c-3.84 0-7.2-3.36-7.2-7.2s3.36-7.2 7.2-7.2 7.2 3.36 7.2 7.2-3.36 7.2-7.2 7.2zm-1.2-10.8l4.8 3.6-4.8 3.6V8.4z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="video-info" style={{ padding: '15px' }}>
                                <h3>Video Preview</h3>
                                <p>{qrData.youtube?.url}</p>
                            </div>
                        </div>
                    )}
                </PhoneContent>
            </PhoneFrame>
        </PhonePreviewColumn>
    );
};