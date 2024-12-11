import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import QRCodeStyling from "qr-code-styling";
import { DownloadSimple } from "@phosphor-icons/react";
import { QRData } from "../types/qr";
import { PhonePreview } from './PhonePreview/PhonePreview';
import html2canvas from 'html2canvas';
import { getWatermarkSVG } from '../components/watermarks/getWatermarkSVG';
import { Frame } from '../types';
import { LogoType } from './LogoCustomization';

type PreviewType = 'qr' | 'phone';

// Type guard function
function isPreviewType(value: string): value is PreviewType {
    return value === 'qr' || value === 'phone';
}

interface PreviewProps {
    qrCodeInstance: QRCodeStyling | null;
    handleDownload: (format: "png" | "svg") => Promise<void>;
    generateQRCodeData: () => Promise<string>;
    frame: string | Frame;
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
    setFrame: (frame: string | Frame) => void;
    logo: {
        type: LogoType;
        src: string | null;
        width?: number;
        height?: number;
    } | null;
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
    cutter,
    setFrame,
    logo,
}) => {
    const qrCodeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (qrCodeInstance && qrCodeRef.current) {
            qrCodeInstance.update({
                image: logo?.src || '',
                imageOptions: {
                    hideBackgroundDots: true,
                    imageSize: 0.4,
                    margin: 5,
                    crossOrigin: "anonymous",
                },
            });
            qrCodeRef.current.innerHTML = '';
            qrCodeInstance.append(qrCodeRef.current);
        }
    }, [qrCodeInstance, logo, previewType]);

    const handleDownloadClick = async () => {
        if (!qrCodeInstance) return;
        
        try {
            // Add validation for file type QR codes
            if (qrType === "file") {
                // Check if qrData has the required file information
                const fileData = (qrData as any).fileData;
                if (!fileData) {
                    alert("Please select a file first before downloading the QR code.");
                    return;
                }
            }

            if ((qrType === "file" || qrType === "multiplink") && !generatedUrl) {
                setGenerateQRCode(true);
                const url = await generateQRCodeData();
                if (!url) {
                    throw new Error('Failed to generate QR code data');
                }
                setGeneratedUrl(url.toString());
                qrCodeInstance.update({
                    data: url.toString(),
                });
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                throw new Error('Could not get canvas context');
            }

            const size = 2400;
            canvas.width = size;
            canvas.height = size;

            ctx.clearRect(0, 0, size, size);

            // Draw frame if needed
            if (frame !== 'none') {
                const padding = size * 0.1;
                const frameSize = size - (padding * 2);
                const cornerSize = size * 0.15;
                
                ctx.strokeStyle = frameColor;
                ctx.lineWidth = size * 0.02;
                ctx.beginPath();

                switch (frame) {
                    case 'none':
                        break;
                    case 'simple':
                        ctx.rect(padding, padding, frameSize, frameSize);
                        break;
                    case 'rounded':
                        const radius = size * 0.05;
                        ctx.roundRect(padding, padding, frameSize, frameSize, radius);
                        break;
                    case 'fancy':
                        // Top left corner
                        ctx.moveTo(padding, padding + cornerSize);
                        ctx.lineTo(padding, padding);
                        ctx.lineTo(padding + cornerSize, padding);
                        // Top right corner
                        ctx.moveTo(size - padding - cornerSize, padding);
                        ctx.lineTo(size - padding, padding);
                        ctx.lineTo(size - padding, padding + cornerSize);
                        // Bottom right corner
                        ctx.moveTo(size - padding, size - padding - cornerSize);
                        ctx.lineTo(size - padding, size - padding);
                        ctx.lineTo(size - padding - cornerSize, size - padding);
                        // Bottom left corner
                        ctx.moveTo(padding + cornerSize, size - padding);
                        ctx.lineTo(padding, size - padding);
                        ctx.lineTo(padding, size - padding - cornerSize);
                        break;
                    case 'chat':
                        // Chat bubble
                        const bubbleRadius = size * 0.1;
                        const tailSize = size * 0.15;
                        
                        // Draw main bubble body
                        ctx.roundRect(
                            padding, 
                            padding, 
                            frameSize, 
                            frameSize - tailSize, 
                            bubbleRadius
                        );
                        
                        // Draw tail
                        ctx.moveTo(padding + frameSize * 0.3, size - padding - tailSize);
                        ctx.lineTo(padding + frameSize * 0.2, size - padding);
                        ctx.lineTo(padding + frameSize * 0.4, size - padding - tailSize);
                        break;
                    case 'colorful':
                        // Create gradient with 45-degree angle
                        const gradient = ctx.createLinearGradient(
                            padding, 
                            padding, 
                            size - padding, 
                            size - padding
                        );
                        // Using the same colors as MiniQRPreview
                        gradient.addColorStop(0, '#ff6b6b');
                        gradient.addColorStop(0.25, '#4ecdc4');
                        gradient.addColorStop(0.5, '#45b7d1');
                        gradient.addColorStop(0.75, '#96ceb4');
                        gradient.addColorStop(1, '#ffeead');
                        
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = size * 0.02; // Match the 2px border from mini preview
                        
                        // Draw a simple rectangular frame with rounded corners (8px equivalent)
                        const borderRadius = size * 0.008; // 8px equivalent for 1024px canvas
                        ctx.roundRect(
                            padding,
                            padding,
                            frameSize,
                            frameSize,
                            borderRadius
                        );
                        
                        // Remove all the flourishes since they're not in the mini preview
                        break;
                }
                
                ctx.stroke();
                ctx.closePath();
            }

            // Draw QR code
            const qrSize = size * 0.85;
            const qrX = (size - qrSize) / 2;
            const qrY = (size - qrSize) / 2;
            
            const qrCanvas = qrCodeRef.current?.querySelector('canvas');
            if (!qrCanvas) {
                throw new Error('QR code canvas not found');
            }
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
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
            alert(`Error generating QR code: ${errorMessage}`);
        } finally {
            setGenerateQRCode(false);
        }
    };

    const handleFrameClick = (frameType: string) => {
        if (frameType === 'colorful') {
            setFrame({
                type: 'colorful',
                svg: `<g xmlns="http://www.w3.org/2000/svg" clip-path="url(#05897ff8e6)">
                    <g mask="url(#cc0e3b1c75)">
                        <g transform="matrix(0.152004, 0, 0, 0.152004, 41.024999, 41.025)">
                            <image x="0" y="0" width="449" xmlns:xlink="http://www.w3.org/1999/xlink" 
                                xlink:href="data:image/png;base64,..." height="449" preserveAspectRatio="xMidYMid meet"/>
                        </g>
                    </g>
                </g>`
            });
        } else {
            setFrame(frameType);
        }
    };

    if (!isPreviewType(previewType)) {
        return null;
    }

    return (
        <>
            <PhonePreview
                show={true}
                qrType={qrType}
                qrData={qrData}
                backgroundType="none"
                isQRPreview={previewType === 'qr'}
                qrCodeRef={qrCodeRef}
                frame={frame}
                frameColor={frameColor}
                cutter={cutterShape}
                cutterColor={cutterColor}
                opacity={opacity}
                watermark={watermark}
                watermarkColor={watermarkColor}
                watermarkOpacity={watermarkOpacity}
                logo={logo}
            />
            <PreviewDownloadButton onClick={handleDownloadClick}>
                <DownloadSimple size={20} weight="bold" />
            </PreviewDownloadButton>
        </>
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
    bottom: 175px;
    right: 55px;
    background: rgba(255, 99, 32, 0.9);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
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

    @media (max-width: 900px) {
        display: none; // Hide download button on mobile
    }
`;
