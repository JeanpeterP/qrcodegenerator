import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import QRCodeStyling, { DotType } from "qr-code-styling";
import { DownloadSimple } from "@phosphor-icons/react";
import  generateQRCodeData  from "./QRCodeGenerator";
import { QRData } from "../types/qr";

interface PreviewProps {
    qrCodeInstance: QRCodeStyling | null;
    handleDownload: (format: "png" | "svg") => void;
    generateQRCodeData: () => Promise<string>;
    frame: string;
    shape: DotType;
    frameColor: string;
    qrType: string;
    generatedUrl: string | null;
    setGeneratedUrl: (url: string | null) => void;
    setGenerateQRCode: (value: boolean) => void;
    qrData: QRData;
}

export const Preview: React.FC<PreviewProps> = ({ qrCodeInstance, handleDownload, generateQRCodeData, frame, shape, frameColor, qrType, generatedUrl, setGeneratedUrl, setGenerateQRCode, qrData }) => {
    const qrCodeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (qrCodeInstance && qrCodeRef.current) {
            qrCodeRef.current.innerHTML = '';
            qrCodeInstance.append(qrCodeRef.current);
        }
    }, [qrCodeInstance]);

    const handleDownloadClick = async () => {
        if (!qrCodeInstance) return;
        
        try {
            // If it's a file or multilink type and hasn't been generated yet, generate first
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
            
            // Get SVG data
            const qrCodeSvg = await qrCodeInstance.getRawData('svg');
            if (!qrCodeSvg) throw new Error('Failed to generate QR code SVG');

            const svgString = qrCodeSvg instanceof Blob 
                ? await qrCodeSvg.text()
                : qrCodeSvg.toString('utf-8');

            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
            const svgElement = svgDoc.querySelector('svg');

            if (svgElement) {
                const scale = 4;
                const baseSize = 300;
                const scaledSize = baseSize * scale;
                const frameWidth = 4 * scale;
                const padding = 20 * scale;
                const chatBubbleHeight = frame === 'chat' ? 100 * scale : 0;
                const totalHeight = scaledSize + chatBubbleHeight;
                
                const newSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                newSvg.setAttribute('width', `${scaledSize}`);
                newSvg.setAttribute('height', `${totalHeight}`);
                newSvg.setAttribute('viewBox', `0 0 ${scaledSize} ${totalHeight}`);
                
                // Create clipping paths for frame and bubble
                const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                
                // Frame clip path
                const frameClipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
                frameClipPath.setAttribute('id', 'frameClip');
                const frameClipRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                const frameY = frame === 'chat' ? chatBubbleHeight : 0;
                frameClipRect.setAttribute('x', `${frameWidth / 2}`);
                frameClipRect.setAttribute('y', `${frameY + frameWidth / 2}`);
                frameClipRect.setAttribute('width', `${scaledSize - frameWidth}`);
                frameClipRect.setAttribute('height', `${scaledSize - frameWidth}`);
                
                if (frame === 'rounded' || frame === 'fancy' || frame === 'chat') {
                    frameClipRect.setAttribute('rx', `${16 * scale}`);
                    frameClipRect.setAttribute('ry', `${16 * scale}`);
                }
                frameClipPath.appendChild(frameClipRect);
                defs.appendChild(frameClipPath);

                // Chat bubble clip path (if needed)
                if (frame === 'chat') {
                    const bubbleClipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
                    bubbleClipPath.setAttribute('id', 'bubbleClip');
                    
                    // Create a single path for the entire bubble shape including the triangle
                    const bubblePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    const bubbleWidth = 200 * scale;
                    const bubbleHeight = 50 * scale;
                    const bubbleX = (scaledSize - bubbleWidth) / 2;
                    const bubbleY = chatBubbleHeight / 4;

                    // Create a single path that includes both the rounded rectangle and triangle
                    const path = `
                        M ${bubbleX + 16 * scale},${bubbleY} 
                        h ${bubbleWidth - 32 * scale} 
                        a ${16 * scale},${16 * scale} 0 0 1 ${16 * scale},${16 * scale} 
                        v ${bubbleHeight - 32 * scale} 
                        a ${16 * scale},${16 * scale} 0 0 1 -${16 * scale},${16 * scale}
                        h -${(bubbleWidth - 60 * scale) / 2}
                        l -${30 * scale},${20 * scale}
                        l -${30 * scale},-${20 * scale}
                        h -${(bubbleWidth - 60 * scale) / 2}
                        a ${16 * scale},${16 * scale} 0 0 1 -${16 * scale},-${16 * scale} 
                        v -${bubbleHeight - 32 * scale}
                        a ${16 * scale},${16 * scale} 0 0 1 ${16 * scale},-${16 * scale}
                        z
                    `;
                    
                    bubblePath.setAttribute('d', path);
                    bubbleClipPath.appendChild(bubblePath);
                    defs.appendChild(bubbleClipPath);
                }
                
                newSvg.appendChild(defs);

                // Create background elements with clips
                // Frame background
                const frameBackground = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                frameBackground.setAttribute('width', '100%');
                frameBackground.setAttribute('height', '100%');
                frameBackground.setAttribute('fill', '#ffffff');
                frameBackground.setAttribute('clip-path', 'url(#frameClip)');
                newSvg.appendChild(frameBackground);

                // Chat bubble background (if needed)
                if (frame === 'chat') {
                    const bubbleBackground = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    const bubbleWidth = 200 * scale;
                    const bubbleHeight = 50 * scale;
                    const bubbleX = (scaledSize - bubbleWidth) / 2 + 65;
                    const bubbleY = chatBubbleHeight / 4;

                    const path = `
                        M ${bubbleX + 16 * scale},${bubbleY} 
                        h ${bubbleWidth - 32 * scale} 
                        a ${16 * scale},${16 * scale} 0 0 1 ${16 * scale},${16 * scale} 
                        v ${bubbleHeight - 32 * scale} 
                        a ${16 * scale},${16 * scale} 0 0 1 -${16 * scale},${16 * scale}
                        h -${(bubbleWidth - 60 * scale) / 2}
                        l -${30 * scale},${20 * scale}
                        l -${30 * scale},-${20 * scale}
                        h -${(bubbleWidth - 60 * scale) / 2}
                        a ${16 * scale},${16 * scale} 0 0 1 -${16 * scale},-${16 * scale} 
                        v -${bubbleHeight - 32 * scale}
                        a ${16 * scale},${16 * scale} 0 0 1 ${16 * scale},-${16 * scale}
                        z
                    `;
                    
                    bubbleBackground.setAttribute('d', path);
                    bubbleBackground.setAttribute('fill', frameColor);
                    newSvg.appendChild(bubbleBackground);
                }

                // Add frame and chat bubble elements
                if (frame !== 'none') {
                    if (frame === 'chat') {
                        // Add "Scan Me" text
                        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                        text.setAttribute('x', `${scaledSize / 2}`);
                        text.setAttribute('y', `${chatBubbleHeight / 3 + 25 * scale - 25}`);
                        text.setAttribute('text-anchor', 'middle');
                        text.setAttribute('dominant-baseline', 'middle');
                        text.setAttribute('fill', 'white');
                        text.setAttribute('font-family', 'Arial, sans-serif');
                        text.setAttribute('font-size', `${18 * scale + 20}`);
                        text.setAttribute('font-weight', 'bold');
                        text.textContent = 'Scan Me';
                        newSvg.appendChild(text);
                    }

                    // Add the frame
                    const frameElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    frameElement.setAttribute('x', `${frameWidth / 2}`);
                    frameElement.setAttribute('y', `${frameY + frameWidth / 2}`);
                    frameElement.setAttribute('width', `${scaledSize - frameWidth}`);
                    frameElement.setAttribute('height', `${scaledSize - frameWidth}`);
                    frameElement.setAttribute('fill', 'none');
                    frameElement.setAttribute('stroke', frameColor);
                    frameElement.setAttribute('stroke-width', `${frameWidth}`);

                    if (frame === 'rounded' || frame === 'fancy' || frame === 'chat') {
                        frameElement.setAttribute('rx', `${16 * scale}`);
                        frameElement.setAttribute('ry', `${16 * scale}`);
                    }

                    if (frame === 'fancy') {
                        // Add shadow filter
                        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
                        filter.setAttribute('id', 'shadow');
                        filter.innerHTML = `
                            <feDropShadow dx="0" dy="0" stdDeviation="${3 * scale}" flood-opacity="0.5"/>
                        `;
                        defs.appendChild(filter);
                        frameElement.setAttribute('filter', 'url(#shadow)');
                    }

                    newSvg.appendChild(frameElement);
                }

                // Add QR code
                const originalSize = parseInt(svgElement.getAttribute('width') || '100');
                const qrSize = scaledSize - (padding * 2);
                const scaleFactor = qrSize / originalSize;
                
                const qrGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                qrGroup.innerHTML = svgElement.innerHTML;
                
                const xOffset = (scaledSize - qrSize) / 2;
                const yOffset = ((frame === 'chat' ? chatBubbleHeight : 0) + (scaledSize - qrSize) / 2);
                qrGroup.setAttribute('transform', 
                    `translate(${xOffset}, ${yOffset}) scale(${scaleFactor})`
                );
                
                newSvg.appendChild(qrGroup);

                // Convert to PNG with high quality
                const serializer = new XMLSerializer();
                const svgData = serializer.serializeToString(newSvg);
                const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(svgBlob);

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) throw new Error('Failed to get canvas context');

                const img = new Image();
                img.src = url;
                
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                });

                // Set canvas size to match SVG
                canvas.width = scaledSize;
                canvas.height = totalHeight;

                // Enable high-quality rendering
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';

                // Draw image
                ctx.drawImage(img, 0, 0);

                // Convert to PNG and download
                const pngUrl = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = 'qr-code.png';
                link.href = pngUrl;
                link.click();

                // Cleanup
                URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error("Error generating/downloading QR code:", error);
            alert("Error generating QR code. Please try again.");
        } finally {
            setGenerateQRCode(false);
        }
    };

    return (
        <QRCodePreview frame={frame} shape={shape} frameColor={frameColor}>
            <div ref={qrCodeRef} />
            <PreviewDownloadButton onClick={handleDownloadClick}>
                <DownloadSimple size={20} weight="bold" />
            </PreviewDownloadButton>
        </QRCodePreview>
    );
};

// Styled Components (added missing ones)
const QRCodePreview = styled.div<{ frame: string; shape: string; frameColor: string }>`
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