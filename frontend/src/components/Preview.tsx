import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import QRCodeStyling from "qr-code-styling";
import { DownloadSimple } from "@phosphor-icons/react";
import { QRData } from "../types/qr";
import { PhonePreview } from './PhonePreview/PhonePreview';
import html2canvas from 'html2canvas';
import { getWatermarkSVG } from '../components/watermarks/getWatermarkSVG';

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
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }

            const qrCanvas = qrCodeRef.current?.querySelector('canvas');
            if (!qrCanvas) {
                throw new Error('QR code canvas not found');
            }

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                throw new Error('Could not get canvas context');
            }

            const size = 1024;
            canvas.width = size;
            canvas.height = size;

            ctx.clearRect(0, 0, size, size);

            // Draw frame if needed
            if (frame !== 'none') {
                ctx.strokeStyle = frameColor;
                ctx.lineWidth = size * 0.02;
                const padding = size * 0.1;
                ctx.strokeRect(padding, padding, size - (padding * 2), size - (padding * 2));
            }

            // Draw QR code
            const qrSize = size * 0.8;
            const qrX = (size - qrSize) / 2;
            const qrY = (size - qrSize) / 2;
            ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

            // Draw watermark if needed
            if (watermark !== 'none') {
                const watermarkImg = new Image();
                watermarkImg.src = `data:image/svg+xml;base64,${btoa(getWatermarkSVG(watermark, watermarkColor))}`;
                
                await new Promise((resolve, reject) => {
                    watermarkImg.onload = resolve;
                    watermarkImg.onerror = reject;
                });

                // Match the preview sizing by making watermark cover the full frame area
                ctx.globalAlpha = watermarkOpacity;
                const padding = size * 0.1; // Same padding as frame
                const watermarkSize = size - (padding * 2); // Fill the entire frame area
                const watermarkX = padding;
                const watermarkY = padding;
                
                ctx.save();
                
                // Create a clipping path for the frame area
                ctx.beginPath();
                ctx.rect(padding, padding, watermarkSize, watermarkSize);
                ctx.clip();
                
                // Draw watermark to fill the entire frame area
                ctx.drawImage(watermarkImg, watermarkX, watermarkY, watermarkSize, watermarkSize);
                
                ctx.restore();
                ctx.globalAlpha = 1.0;
            }

            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `qr-code-${Date.now()}.png`;
            link.href = dataURL;
            link.click();

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
