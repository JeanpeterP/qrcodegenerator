import React, { useRef, useEffect, useState } from 'react';
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
import { getBackendUrl } from '../utils/constants';


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
    pageUrl: string;
}

// Utility function to convert an image URL to a base64 data URL
const toDataURL = (url: string): Promise<string> =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

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
    pageUrl,
}) => {
    const qrCodeRef = useRef<HTMLDivElement>(null);
    const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
    const [watermarkDataUrl, setWatermarkDataUrl] = useState<string | null>(null);
    
    useEffect(() => {
        const prepareImages = async () => {
            // Convert logo image to data URL
            if (logo?.src && !logo.src.startsWith('data:')) {
                const dataUrl = await toDataURL(logo.src);
                setLogoDataUrl(dataUrl);
            }

            // Convert watermark image to data URL
            if (watermark && !watermark.startsWith('data:')) {
                const dataUrl = await toDataURL(watermark);
                setWatermarkDataUrl(dataUrl);
            }
        };
        prepareImages();
    }, [logo?.src, watermark]);

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
                                    data={pageUrl}
                                    size={size}
                                    markerShape={markerShape}
                                    markerColor={markerColor}
                                    shape={shape}
                                    qrColor={markerColor}
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
        try {
            console.log("Download started");
            
            // Create form data to handle file upload
            const formData = new FormData();
            formData.append('title', qrData.url?.title || '');
            formData.append('description', qrData.url?.description || '');
            formData.append('buttonText', qrData.url?.buttonText || '');
            formData.append('buttonColor', qrData.url?.buttonColor || '');
            formData.append('actionUrl', qrData.url?.actionUrl || '');
            
            // Add banner image if it exists
            if (qrData.url?.bannerImageData) {
                formData.append('file', qrData.url.bannerImageData);
            }

            const response = await fetch(`${getBackendUrl()}/api/upload/url`, {
                method: 'POST',
                body: formData, // Send as FormData instead of JSON
            });

            const result = await response.json();
            if (result.success && result.qrId) {
                const finalUrl = `${getBackendUrl()}/qr/${result.qrId}`;

                // Create QR code with the landing page URL
                const qrContainer = qrCodeRef.current;
                if (!qrContainer) {
                    throw new Error("QR container not found");
                }

                // Update QR code with the correct URL before downloading
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
                            data={finalUrl}  // Use the landing page URL
                            size={size}
                            markerShape={markerShape}
                            markerColor={markerColor}
                            shape={shape}
                            qrColor={markerColor}
                            logo={logo}
                            hideBackground={hideBackground}
                        />
                    </QRPreviewWrapper>,
                    qrContainer
                );

                // Create a new canvas
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    throw new Error("Could not get canvas context");
                }

                console.log("Drawing frame:", { frame, frameColor, frameThickness });

                // Set canvas size to 4x original size
                canvas.width = 1100;
                canvas.height = 1100;

                // Draw frame if it exists
                if (frame !== 'none') {
                    try {
                        let frameSvg = '';
                        if (typeof frame === 'string') {
                            frameSvg = `
                                <svg xmlns="http://www.w3.org/2000/svg" width="1100" height="1100">
                                    <rect x="0" y="0" width="1100" height="1100" 
                                        fill="none" 
                                        stroke="${frameColor}" 
                                        stroke-width="${frameThickness * 4}"
                                        rx="${frame === 'rounded' ? '80' : '0'}"
                                    />
                                </svg>
                            `;
                        } else if (frame.type === 'colorful' && frame.svg) {
                            frameSvg = frame.svg;
                        }

                        if (frameSvg) {
                            const frameBlob = new Blob([frameSvg], { type: 'image/svg+xml;charset=utf-8' });
                            const frameUrl = URL.createObjectURL(frameBlob);
                            
                            await new Promise((resolve, reject) => {
                                const frameImg = new Image();
                                frameImg.onload = () => {
                                    ctx.drawImage(frameImg, 0, 0, 1100, 1100);
                                    URL.revokeObjectURL(frameUrl);
                                    resolve(null);
                                };
                                frameImg.onerror = reject;
                                frameImg.src = frameUrl;
                            });
                        }
                    } catch (frameError) {
                        console.error("Frame drawing error:", frameError);
                    }
                }

                // Get QR code SVG
                const qrElement = qrContainer.querySelector('svg');
                if (!qrElement) {
                    throw new Error("QR SVG element not found");
                }

                console.log("Drawing QR code");
                const svgData = new XMLSerializer().serializeToString(qrElement);
                const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                const svgUrl = URL.createObjectURL(svgBlob);

                await new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => {
                        ctx.drawImage(img, 60, 60, 980, 980);
                        URL.revokeObjectURL(svgUrl);
                        resolve(null);
                    };
                    img.onerror = reject;
                    img.src = svgUrl;
                });

                // Draw watermark
                if (watermark !== 'none') {
                    console.log("Drawing watermark");
                    const watermarkSvg = getWatermarkSVG(watermark, watermarkColor);
                    const watermarkBlob = new Blob([watermarkSvg], { type: 'image/svg+xml;charset=utf-8' });
                    const watermarkUrl = URL.createObjectURL(watermarkBlob);

                    await new Promise((resolve, reject) => {
                        const watermarkImg = new Image();
                        watermarkImg.onload = () => {
                            ctx.globalAlpha = Number(watermarkOpacity);
                            ctx.drawImage(watermarkImg, 60, 60, 980, 980);
                            ctx.globalAlpha = 1.0;
                            URL.revokeObjectURL(watermarkUrl);
                            resolve(null);
                        };
                        watermarkImg.onerror = reject;
                        watermarkImg.src = watermarkUrl;
                    });
                }

                console.log("Creating download");
                const dataUrl = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = 'qr-code.png';
                link.href = dataUrl;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error("Error generating/downloading QR code:", error);
            console.log("Error details:", {
                message: (error as Error).message,
                stack: (error as Error).stack,
                elements: qrCodeRef.current?.innerHTML
            });
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

