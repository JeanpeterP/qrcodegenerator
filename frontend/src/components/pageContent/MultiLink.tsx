import React from 'react';

interface MultiLinkProps {
  contentData: {
    title?: string;
    description?: string;
    logoUrl?: string;
    links?: Array<{ label: string; url: string; _id?: string }>;
    isPreview?: boolean; // Optional prop to adjust styling for preview
  };
}

export const MultiLink: React.FC<MultiLinkProps> = ({ contentData }) => {
  const isPreview = contentData.isPreview;

  return (
    <div
      className="multilink-content"
      style={{
        height: '100%',
        backgroundColor: '#fafafa',
        padding: isPreview ? '20px' : '40px 20px',
        overflowY: 'hidden',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '32px',
          }}
        >
          {contentData.logoUrl && (
            <div style={{ marginBottom: '24px' }}>
              <img
                src={contentData.logoUrl}
                alt="Logo"
                style={{
                  width: isPreview ? '48px' : '96px',
                  height: isPreview ? '48px' : '96px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}
          <h1
            style={{
              fontSize: isPreview ? '1rem' : '1.5rem',
              fontWeight: 700,
              color: '#333',
              marginBottom: '8px',
              textAlign: 'center',
            }}
          >
            {contentData.title || 'My Links'}
          </h1>
          {contentData.description && (
            <p
              style={{
                fontSize: '1rem',
                color: '#666',
                marginBottom: '24px',
                textAlign: 'center',
              }}
            >
              {contentData.description}
            </p>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '100%',
            maxWidth: '680px',
            margin: '0 auto',
          }}
        >
          {contentData.links?.map((link, index) => (
            <div
              key={link._id || index}
              style={{
                background: 'white',
                border: '2px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                padding: isPreview ? '8px 12px' : '16px 20px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    color: '#333',
                    fontSize: isPreview ? '0.9rem' : '1rem',
                    fontWeight: 600,
                    textAlign: 'center',
                    flexGrow: 1,
                  }}
                >
                  {link.label || `Link ${index + 1}`}
                </span>
                {!isPreview && (
                  <button
                    style={{
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
                      borderRadius: '50%',
                    }}
                  >
                    <svg
                      width="3"
                      height="12"
                      viewBox="0 0 3 12"
                      fill="currentColor"
                    >
                      <path
                        d="M1.5 12.0122C1.0875 12.0122 0.734375 11.8653 0.440625 11.5716C0.146875 11.2778 0 10.9247 0 10.5122C0 10.0997 0.146875 9.74658 0.440625 9.45283C0.734375 9.15908 1.0875 9.01221 1.5 9.01221C1.9125 9.01221 2.26562 9.15908 2.55938 9.45283C2.85313 9.74658 3 10.0997 3 10.5122C3 10.9247 2.85313 11.2778 2.55938 11.5716C2.26562 11.8653 1.9125 12.0122 1.5 12.0122Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 