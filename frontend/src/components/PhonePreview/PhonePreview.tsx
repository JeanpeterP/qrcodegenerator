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

  height: 100%;
  overflow-y: hidden;
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
            <PhoneFrame>
                <PhoneContent>
                    {qrType === 'file' && (
                        <div className="download-preview" style={{
                            minHeight: '100vh',
                            backgroundColor: '#fafafa',
                            padding: '40px 20px',
                        }}>
                            <div style={{
                                width: '100%',
                                maxWidth: '680px',
                                margin: '0 auto',
                                textAlign: 'center'
                            }}>
                                <h1 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 700,
                                    color: '#333',
                                    marginBottom: '8px'
                                }}>
                                    {qrData.file?.title || 'Download File'}
                                </h1>
                                <p style={{
                                    fontSize: '1rem',
                                    color: '#666',
                                    marginBottom: '24px'
                                }}>
                                    {qrData.file?.description || 'No description provided'}
                                </p>
                                <button 
                                    style={{ 
                                        backgroundColor: qrData.file?.buttonColor || '#ff6320',
                                        padding: '15px 30px',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: 'white',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem',
                                        marginTop: '20px',
                                        display: 'inline-block',
                                        textDecoration: 'none'
                                    }}
                                >
                                    {qrData.file?.buttonText || 'Download'}
                                </button>
                            </div>
                        </div>
                    )}
                    {qrType === 'multiplink' && (
                        <div className="multilink-preview" style={{
                            height: '100%',
                            backgroundColor: '#fafafa',
                            padding: '40px 20px',
                            overflowY: 'hidden'
                        }}>
                            <div style={{
                                width: '100%',
                                maxWidth: '680px',
                                margin: '0 auto'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    marginBottom: '32px'
                                }}>
                                    <h1 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        color: '#333',
                                        marginBottom: '8px',
                                        textAlign: 'center'
                                    }}>{qrData.contentData?.title || 'My Links'}</h1>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px',
                                    width: '100%',
                                    maxWidth: '680px',
                                    margin: '0 auto',
                                }}>
                                    {qrData.contentData?.links?.map((link, index) => (
                                        <div 
                                            key={index}
                                            style={{
                                                background: 'white',
                                                border: '2px solid rgba(0, 0, 0, 0.1)',
                                                borderRadius: '12px',
                                                padding: '16px 20px',
                                                position: 'relative'
                                            }}
                                        >
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}>
                                                <span style={{
                                                    color: '#333',
                                                    fontSize: '1rem',
                                                    fontWeight: 600,
                                                    textAlign: 'center',
                                                    flexGrow: 1
                                                }}>{link.label || `Link ${index + 1}`}</span>
                                                <button style={{
                                                    position: 'absolute',
                                                    right: '16px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    padding: '8px',
                                                    cursor: 'pointer',
                                                    opacity: 0.5,
                                                    color: '#333',
                                                    borderRadius: '50%'
                                                }}>
                                                    <svg width="3" height="12" viewBox="0 0 3 12" fill="currentColor">
                                                        <path d="M1.5 12.0122C1.0875 12.0122 0.734375 11.8653 0.440625 11.5716C0.146875 11.2778 0 10.9247 0 10.5122C0 10.0997 0.146875 9.74658 0.440625 9.45283C0.734375 9.15908 1.0875 9.01221 1.5 9.01221C1.9125 9.01221 2.26562 9.15908 2.55938 9.45283C2.85313 9.74658 3 10.0997 3 10.5122C3 10.9247 2.85313 11.2778 2.55938 11.5716C2.26562 11.8653 1.9125 12.0122 1.5 12.0122Z" fill="currentColor"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
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