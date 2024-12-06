import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import QRCodeStyling from "qr-code-styling";
import { DownloadSimple } from "@phosphor-icons/react";
import { QRData } from "../types/qr";
import { PhonePreview } from './PhonePreview/PhonePreview';

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
}

export const Preview: React.FC<PreviewProps> = (props) => {
    const {
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
        previewType
    } = props;

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
            
            const qrCodeCanvas = qrCodeRef.current?.querySelector('canvas');
            
            if (qrCodeCanvas) {
                const dataURL = qrCodeCanvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = 'qr-code.png';
                link.href = dataURL;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                console.error('Canvas element not found in:', qrCodeRef.current);
                throw new Error('QR code canvas not found');
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
            />
            {previewType === 'qr' && (
                <PreviewDownloadButton onClick={handleDownloadClick}>
                    <DownloadSimple size={20} weight="bold" />
                </PreviewDownloadButton>
            )}
        </>
    );
};

// Styled Components (added missing ones)
const PreviewContainer = styled.div<{ frame: string; shape: string; frameColor: string }>`
    border: 1px solid #ced4da;
    border-radius: 8px;
    padding: 8px;
    background-color: #f8f9fa;
    width: fit-content;
    margin: 8px auto;
    transform: scale(1.2);
    transform-origin: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: ${(props) => props.frame === "chat" ? "80px" : "20px"};

    ${(props) =>
        props.frame === "simple" &&
        `
        border: 4px solid ${props.frameColor};
    `}

    ${(props) =>
        props.frame === "rounded" &&
        `
        border: 4px solid ${props.frameColor};
        border-radius: 16px;
    `}

    ${(props) =>
        props.frame === "fancy" &&
        `
        border: 4px solid ${props.frameColor};
        border-radius: 16px;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
    `}

    ${(props) =>
        props.frame === "chat" &&
        `
        border: 4px solid ${props.frameColor};
        border-radius: 16px;
        
        &::before {
            content: "Scan Me";
            position: absolute;
            top: -65px;
            left: 50%;
            transform: translateX(-50%);
            background: ${props.frameColor};
            color: white;
            padding: 12px 24px;
            border-radius: 16px;
            font-size: 18px;
            white-space: nowrap;
            font-weight: bold;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        &::after {
            content: "";
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            border-top: 20px solid ${props.frameColor};
        }
    `}

    & > div {
        display: block;
    }
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

function getContentBounds(imageData: ImageData) {
    const { width, height, data } = imageData;
    let left = width;
    let right = 0;
    let top = height;
    let bottom = 0;

    // Scan through the image data to find content boundaries
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            // Check if pixel has any content (not fully transparent)
            if (data[idx + 3] > 0) {
                left = Math.min(left, x);
                right = Math.max(right, x + 1);
                top = Math.min(top, y);
                bottom = Math.max(bottom, y + 1);
            }
        }
    }

    // Add a small padding
    const padding = 10;
    return {
        left: Math.max(0, left - padding),
        right: Math.min(width, right + padding),
        top: Math.max(0, top - padding),
        bottom: Math.min(height, bottom + padding)
    };
}