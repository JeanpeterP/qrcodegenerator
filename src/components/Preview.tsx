import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import QRCodeStyling from "qr-code-styling";
import { DownloadSimple } from "@phosphor-icons/react";

interface PreviewProps {
    qrCodeInstance: QRCodeStyling | null;
    handleDownload: (format: "png" | "svg") => Promise<void>;
    frame: string;
    shape: string;
    frameColor: string;
}

export const Preview: React.FC<PreviewProps> = ({ qrCodeInstance, handleDownload, frame, shape, frameColor }) => {
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
            const qrCodeSvg = await qrCodeInstance.getRawData('svg');
            if (!qrCodeSvg) throw new Error('Failed to generate QR code SVG');

            const svgString = qrCodeSvg instanceof Blob 
                ? await qrCodeSvg.text()
                : qrCodeSvg.toString('utf-8');

            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
            const svgElement = svgDoc.querySelector('svg');

            if (svgElement) {
                // Set base dimensions with padding
                const originalQrSize = 300;
                const scale = 3;
                const scaledQrSize = originalQrSize * scale;
                const bubbleHeight = 240;
                const shiftAmount = scaledQrSize/100;
                const extraShift = 50;  // Horizontal shift
                const upShift = 10;     // How many pixels to move up
                
                // Create SVG content
                const newSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                newSvg.setAttribute('width', `${scaledQrSize + shiftAmount}`);
                newSvg.setAttribute('height', `${scaledQrSize + bubbleHeight}`);
                newSvg.setAttribute('viewBox', `-${extraShift} 0 ${scaledQrSize + shiftAmount + extraShift} ${scaledQrSize + bubbleHeight}`);
                
                if (frame === 'chat') {
                    // Center bubble above QR code, shifted left by 50%
                    const bubble = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    const centerX = scaledQrSize / 2;
                    bubble.setAttribute('d', `
                        M ${centerX - 180 - centerX/2} 30  
                        h 360
                        a 45 45 0 0 1 45 45
                        v 60
                        a 45 45 0 0 1 -45 45
                        h -135
                        l -45 45
                        l -45 -45
                        h -135
                        a 45 45 0 0 1 -45 -45
                        v -60
                        a 45 45 0 0 1 45 -45
                        z
                    `);
                    bubble.setAttribute('fill', frameColor);
                    
                    const bubbleText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    bubbleText.textContent = 'Scan Me';
                    bubbleText.setAttribute('x', `${centerX - centerX/2}`);  // Shifted left by 50%
                    bubbleText.setAttribute('y', '125');
                    bubbleText.setAttribute('text-anchor', 'middle');
                    bubbleText.setAttribute('fill', 'white');
                    bubbleText.setAttribute('font-size', '60');
                    bubbleText.setAttribute('font-weight', 'bold');

                    newSvg.appendChild(bubble);
                    newSvg.appendChild(bubbleText);
                }

                // After creating the SVG element but before adding other elements
                if (frame !== 'none') {
                    // Create frame rectangle that matches QR code position
                    const frameRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    frameRect.setAttribute('x', `${extraShift - 49.5}`);  // Match QR position
                    frameRect.setAttribute('y', `${bubbleHeight - 172}`);    // Base position
                    frameRect.setAttribute('width', `${originalQrSize/2}`); // Reduced size
                    frameRect.setAttribute('height', `${originalQrSize/2}`); // Reduced size
                    frameRect.setAttribute('fill', 'none');
                    frameRect.setAttribute('stroke', frameColor);
                    frameRect.setAttribute('stroke-width', '4');

                    // Add specific frame styles
                    if (frame === 'rounded' || frame === 'fancy' || frame === 'chat') {
                        frameRect.setAttribute('rx', '16');
                        frameRect.setAttribute('ry', '16');
                    }

                    if (frame === 'fancy') {
                        frameRect.setAttribute('filter', 'drop-shadow(0 0 10px rgba(0,0,0,0.5))');
                        // Add drop shadow filter definition
                        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
                        filter.setAttribute('id', 'shadow');
                        filter.innerHTML = `
                            <feDropShadow dx="0" dy="0" stdDeviation="3" flood-opacity="0.5"/>
                        `;
                        defs.appendChild(filter);
                        newSvg.appendChild(defs);
                        frameRect.setAttribute('filter', 'url(#shadow)');
                    }

                    // Scale and position the frame, including upward shift
                    frameRect.setAttribute('transform', 
                        `translate(0, -${upShift}) scale(${scale})`
                    );

                    // Position QR code first (behind frame)
                    const qrGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                    qrGroup.innerHTML = svgElement.outerHTML;
                    qrGroup.setAttribute('transform', 
                        `translate(${extraShift - shiftAmount}, ${bubbleHeight - upShift}) scale(${scale})`
                    );
                    
                    // Add elements in correct order
                    newSvg.appendChild(qrGroup);
                    newSvg.appendChild(frameRect);
                }

                // Convert SVG to PNG
                const serializer = new XMLSerializer();
                const svgData = serializer.serializeToString(newSvg);
                const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(svgBlob);

                // Create an Image object
                const img = new Image();
                img.src = url;
                await new Promise((resolve) => {
                    img.onload = resolve;
                });

                // Create temporary canvas to measure content
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = img.width;
                tempCanvas.height = img.height;
                const tempCtx = tempCanvas.getContext('2d');
                if (!tempCtx) throw new Error('Failed to get canvas context');
                
                // Draw the image
                tempCtx.drawImage(img, 0, 0);
                
                // Get the actual content bounds
                const imageData = tempCtx.getImageData(0, 0, img.width, img.height);
                const bounds = getContentBounds(imageData);
                
                // Create final canvas with cropped dimensions
                const canvas = document.createElement('canvas');
                canvas.width = bounds.right - bounds.left;
                canvas.height = bounds.bottom - bounds.top;
                const ctx = canvas.getContext('2d');
                if (!ctx) throw new Error('Failed to get canvas context');
                
                // Draw cropped image
                ctx.drawImage(
                    img,
                    bounds.left, bounds.top,     // Source x, y
                    bounds.right - bounds.left,  // Source width
                    bounds.bottom - bounds.top,  // Source height
                    0, 0,                        // Destination x, y
                    canvas.width,                // Destination width
                    canvas.height                // Destination height
                );

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
            console.error("Download failed:", error);
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
            top: -20px;
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