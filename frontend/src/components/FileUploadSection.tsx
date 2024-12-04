import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { Upload, X, File as FileIcon } from 'lucide-react';
import { QRData } from '../types/qr';
import { HandleInputChangeFunction } from './QRCodeGenerator';

interface FileUploadSectionProps {
    qrData: QRData;
    handleInputChange: HandleInputChangeFunction;
}

export const FileUploadSection: React.FC<FileUploadSectionProps> = ({
    qrData,
    handleInputChange,
}) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Create a new array with the accepted files
        const newFiles = acceptedFiles;
        
        handleInputChange({
            target: {
                value: newFiles[0], // Take only the first file since we're handling single files
                name: 'fileData',
            },
        } as any, 'file');
    }, [handleInputChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1, // Change to 1 since we're handling single files
        multiple: false, // Change to false
        accept: {
            'application/pdf': ['.pdf'],
            'image/*': ['.png', '.jpg', '.jpeg'],
            'application/zip': ['.zip'],
        },
    });

    const removeFile = (index: number) => {
        const currentFiles = Array.isArray(qrData.file.fileData) ? qrData.file.fileData : [];
        const files = [...currentFiles];
        files.splice(index, 1);
        
        handleInputChange({
            target: {
                value: files.length > 0 ? files : null,
                name: 'fileData',
            },
        } as any, 'file');
    };

    // Update the files display logic
    const files = qrData.file.fileData ? [qrData.file.fileData] : [];
    const canAddMoreFiles = files.length === 0;

    return (
        <SectionContainer>
            {canAddMoreFiles && (
                <DropzoneContainer {...getRootProps()} isDragActive={isDragActive}>
                    <input {...getInputProps()} />
                    <UploadContent>
                        <Upload size={24} />
                        {isDragActive ? (
                            <p>Drop the files here</p>
                        ) : (
                            <>
                                <p>Drag & drop files here, or click to select</p>
                                <small>Maximum 3 files, 10MB each</small>
                            </>
                        )}
                    </UploadContent>
                </DropzoneContainer>
            )}

            {files.length > 0 && (
                <FileList>
                    {files.map((file: File, index: number) => (
                        <FilePreview key={`${file.name}-${index}`}>
                            <FileIconWrapper>
                                <FileIcon size={24} />
                            </FileIconWrapper>
                            <FileDetails>
                                <FileName>{file.name}</FileName>
                                <FileSize>
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </FileSize>
                            </FileDetails>
                            <RemoveButton onClick={() => removeFile(index)}>
                                <X size={18} />
                            </RemoveButton>
                        </FilePreview>
                    ))}
                </FileList>
            )}
        </SectionContainer>
    );
};

// Styled Components
const SectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    height: auto;
    transition: all 0.3s ease;
`;

const DropzoneContainer = styled.div<{ isDragActive: boolean }>`
    border: 2px dashed ${props => props.isDragActive ? '#ff6320' : '#e5e7eb'};
    border-radius: 8px;
    padding: 24px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: ${props => props.isDragActive ? 'rgba(255, 99, 32, 0.05)' : '#f9fafb'};

    &:hover {
        border-color: #ff6320;
        background-color: rgba(255, 99, 32, 0.05);
    }
`;

const UploadContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: #6b7280;

    svg {
        color: #ff6320;
        margin-bottom: 8px;
    }

    p {
        margin: 0;
        font-size: 0.95rem;
    }

    small {
        font-size: 0.8rem;
        opacity: 0.7;
    }
`;

const FileList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const FilePreview = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background-color: #f9fafb;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    transition: all 0.2s ease;

    &:hover {
        border-color: #ff6320;
        background-color: #fff;
    }
`;

const FileIconWrapper = styled.div`
    color: #ff6320;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FileDetails = styled.div`
    flex: 1;
    min-width: 0; // Prevents text overflow
`;

const FileName = styled.div`
    font-size: 0.9rem;
    font-weight: 500;
    color: #374151;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const FileSize = styled.div`
    font-size: 0.8rem;
    color: #6b7280;
`;

const RemoveButton = styled.button`
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
        color: #ef4444;
        background-color: rgba(239, 68, 68, 0.1);
    }
`;

export default FileUploadSection;