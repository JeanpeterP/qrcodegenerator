import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import QRCodeStyling from "qr-code-styling";
import { DownloadSimple } from "@phosphor-icons/react";
import { QRData } from "../types/qr";
import { PhonePreview } from './PhonePreview/PhonePreview';
import html2canvas from 'html2canvas';

type PreviewType = 'qr' | 'phone';

// Type guard function
function isPreviewType(value: string): value is PreviewType {
    return value === 'qr' || value === 'phone';
}

interface PreviewProps {
    qrCodeInstance: QRCodeStyling | null;
    handleDownload: (format: "png" | "svg") => Promise<void>;
    generateQRCodeData: () => Promise<string>;
    frame: string;
    shape: string;
    frameColor: string;
    qrType: string;
    generatedUrl: string | null;
    setGeneratedUrl: (url: string | null) => void;
    setGenerateQRCode: (value: boolean) => void;
    qrData: QRData;
    cutterShape: string;
    previewType: PreviewType;
    cutterColor: string;
    opacity: number;
    watermark: string;
    watermarkColor: string;
    watermarkOpacity: number;
    cutter: string;
}

export const Preview: React.FC<PreviewProps> = ({
    qrCodeInstance,
    handleDownload,
    generateQRCodeData,
    frame,
    shape,
    frameColor,
    qrType,
    generatedUrl,
    setGeneratedUrl,
    setGenerateQRCode,
    qrData,
    cutterShape,
    previewType,
    cutterColor,
    opacity,
    watermark,
    watermarkColor,
    watermarkOpacity,
    cutter
}) => {
    const qrCodeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (qrCodeInstance && qrCodeRef.current) {
            qrCodeRef.current.innerHTML = '';
            qrCodeInstance.append(qrCodeRef.current);
        }
    }, [qrCodeInstance, previewType]);

    const handleDownloadClick = async () => {
        if (!qrCodeInstance) return;
        
        try {
            if ((qrType === "file" || qrType === "multiplink") && !generatedUrl) {
                setGenerateQRCode(true);
                const url = await generateQRCodeData();
                if (url) {
                    setGeneratedUrl(url.toString());
                    qrCodeInstance.update({
                        data: url.toString(),
                    });
                }
            }
            
            const frameContainer = qrCodeRef.current?.closest('.frame-container');
            
            if (frameContainer) {
                const canvas = await html2canvas(frameContainer as HTMLElement, {
                    backgroundColor: null,
                    scale: 2,
                });
                
                const dataURL = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = 'qr-code.png';
                link.href = dataURL;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                console.error('Frame container not found:', qrCodeRef.current);
                throw new Error('QR code container not found');
            }
        } catch (error) {
            console.error("Error generating/downloading QR code:", error);
            alert("Error generating QR code. Please try again.");
        } finally {
            setGenerateQRCode(false);
        }
    };

    if (!isPreviewType(previewType)) {
        return null;
    }

    return (
        <PreviewContainer>
            <PhonePreview
                show={true}
                qrType={qrType}
                qrData={qrData}
                backgroundType="none"
                isQRPreview={true}
                qrCodeRef={qrCodeRef}
                frame={frame}
                frameColor={frameColor}
                cutter={cutterShape}
                cutterColor={cutterColor}
                opacity={opacity}
                watermark={watermark}
                watermarkColor={watermarkColor}
                watermarkOpacity={watermarkOpacity}
            />
            <PreviewDownloadButton onClick={handleDownloadClick}>
                <DownloadSimple size={20} weight="bold" />
            </PreviewDownloadButton>
        </PreviewContainer>
    );
};

const PreviewContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 375px;
    margin: 0 auto;
    padding: 20px;
`;

const PreviewDownloadButton = styled.button`
    position: absolute;
    bottom: -16px;
    right: -16px;
    background: rgba(255, 99, 32, 0.9);
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;
    padding: 0;
    z-index: 10;

    &:hover {
        background: #ff6320;
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.95);
    }
`;
