import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import QRCodeStyling from "qr-code-styling";
import { DownloadSimple } from "@phosphor-icons/react";
import { QRData } from "../types/qr";
import { PhonePreview } from './PhonePreview/PhonePreview';
import html2canvas from 'html2canvas';
import { getWatermarkSVG } from '../components/watermarks/getWatermarkSVG';
import { Frame } from '../types';
import { LogoType } from './LogoCustomization';
import { AdvancedQRCode } from './AdvancedQRCode';
import { QRPreviewWrapper } from './QRPreviewWrapper';

type PreviewType = 'qr' | 'phone';

// Type guard function
function isPreviewType(value: string): value is PreviewType {
    return value === 'qr' || value === 'phone';
}

interface PreviewProps {
    qrCodeInstance: (props: any) => JSX.Element;
    handleDownload: () => Promise<void>;
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
    frameThickness: number;
    markerShape: string;
    markerStyle: string;
    markerColor: string;
    size: number;
    error?: string | null;
    setError?: (error: string | null) => void;
    handleFileUpload?: (formData: FormData) => Promise<void>;
    isInitialized?: boolean;
    setIsInitialized?: (value: boolean) => void;
    generateQRCode?: boolean;
    data: string;
    hideBackground: boolean;
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
    frameThickness,
    markerShape,
    markerStyle,
    markerColor,
    size,
    data,
    hideBackground,
}) => {
    const qrCodeRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const renderQRCode = async () => {
            if (qrCodeRef.current) {
                try {
                    // Safely cleanup previous render
                    const existingContent = qrCodeRef.current.firstChild;
                    if (existingContent) {
                        ReactDOM.unmountComponentAtNode(qrCodeRef.current);
                    }
                    
                    // Add small delay to ensure DOM is ready
                    await new Promise(resolve => setTimeout(resolve, 0));
                    
                    // Only render if we have data and element exists
                    if (data && qrCodeRef.current) {
                        ReactDOM.render(
                            <QRPreviewWrapper
                                cutter={cutter}
                                cutterColor={cutterColor}
                                opacity={opacity}
                                frame={frame}
                                frameColor={frameColor}
                                frameThickness={frameThickness}
                                watermark={watermark}
                                watermarkColor={watermarkColor}
                                watermarkOpacity={watermarkOpacity}
                                markerShape={markerShape}
                                markerColor={markerColor}
                                logo={logo}
                            >
                                <AdvancedQRCode
                                    data={data}
                                    size={size}
                                    markerShape={markerShape}
                                    markerColor={markerColor}
                                    shape={shape}
                                    qrColor="#000000"
                                    logo={logo}
                                    hideBackground={hideBackground}
                                />
                            </QRPreviewWrapper>,
                            qrCodeRef.current
                        );
                    }
                } catch (error) {
                    console.error('Error rendering QR code:', error);
                }
            }
        };

        renderQRCode();
    }, [
        qrCodeInstance, 
        data, 
        markerShape,
        markerStyle,
        markerColor,
        size, 
        frame, 
        frameColor, 
        frameThickness,
        logo,
        previewType,
        hideBackground,
    ]);

    const handleDownloadClick = async () => {
        console.log("Download started");
        if (!qrCodeRef.current) {
            console.log("QR code ref is null");
            return;
        }
        
        try {
            const qrContainer = qrCodeRef.current.closest('.qr-preview') as HTMLElement;
            if (!qrContainer) {
                throw new Error('QR preview container not found');
            }

            // Store original styles
            const originalStyle = qrContainer.style.cssText;
            const originalQrStyle = qrCodeRef.current.style.cssText;

            // Force container and QR code to full size
            qrContainer.style.cssText = `
                width: 1024px !important;
                height: 1024px !important;
                transform: none !important;
                position: fixed !important;
                top: -9999px !important;
                left: -9999px !important;
            `;
            
            qrCodeRef.current.style.cssText = `
                width: 100% !important;
                height: 100% !important;
                transform: none !important;
            `;

            const containerCanvas = await html2canvas(qrContainer, {
                scale: 1,
                backgroundColor: null,
                width: 1024,
                height: 1024,
                logging: true,
                useCORS: true,
                allowTaint: true,
            });

            // Restore original styles
            qrContainer.style.cssText = originalStyle;
            qrCodeRef.current.style.cssText = originalQrStyle;

            const link = document.createElement('a');
            link.download = `qr-code-${Date.now()}.png`;
            link.href = containerCanvas.toDataURL('image/png');
            link.click();

        } catch (error) {
            console.error("Error generating/downloading QR code:", error);
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
            alert(`Error generating QR code: ${errorMessage}`);
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
                frameThickness={frameThickness}
                qrData={qrData}
                backgroundType="none"
                isQRPreview={previewType === 'qr'}
                qrCodeRef={qrCodeRef}
                frame={frame}
                frameColor={frameColor}
                cutter={cutter}
                cutterColor={cutterColor}
                opacity={opacity}
                watermark={watermark}
                watermarkColor={watermarkColor}
                watermarkOpacity={watermarkOpacity}
                logo={logo}
                markerShape={markerShape}
                markerColor={markerColor}
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

    #qr-code {
        width: 100%;
        height: 100%;
        
        & > div {
            width: 100% !important;
            height: 100% !important;
            transform: scale(1.4);
            transform-origin: center;
        }
    }
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
