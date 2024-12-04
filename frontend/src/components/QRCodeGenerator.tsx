import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import QRCodeStyling, {
    DotType as QRDotType,
    CornerSquareType,
} from "qr-code-styling";
import html2canvas from 'html2canvas';
import { CaretDown, QrCode, TextT, PaintBrush, DeviceMobile } from 'phosphor-react';

// Import the new components
import { QRCodeForm } from './QRCodeForm';
import { QRCodeTypeSelector } from './QRCodeTypeSelector';
import { PhonePreview } from './PhonePreview/PhonePreview';
import { CustomizationTabs } from './CustomizationTabs';
import { BottomNavigation } from './common/BottomNavigation';
import { TopNavigation } from './common/TopNavigation';
import { DynamicBioCustomizationTabs } from './DynamicBioCustomizationTabs';

import { getBackendUrl } from '../utils/constants';
import { QRType, QRData } from '../types/qr';
import { Preview } from "./Preview";
import { QRBuilderLayout } from './layouts/QRBuilderLayout';
import { PreviewModal } from './PreviewModal';
import { File } from './pageContent/File';

interface QRCodeGeneratorProps {
    userChoice?: 'qr' | 'dynamicBio' | null;
}

interface PreviewToggleProps {
    previewType: 'qr' | 'phone';
    setPreviewType: (type: 'qr' | 'phone') => void;
}

interface PreviewProps {
    qrCodeInstance: QRCodeStyling | null;
    handleDownload: (format: "png" | "svg") => Promise<void>;
    frame: string;
    shape: string;
    frameColor: string;
    qrType: string;
    generatedUrl: string | null;
    setGeneratedUrl: (url: string | null) => void;
    setGenerateQRCode: (value: boolean) => void;
    qrData: QRData;
}

interface PhonePreviewProps {
    show: boolean;
    qrType: keyof QRData;
    qrData: QRData;
    backgroundType: string;
}

// Update the LogoType definition to match
type LogoType = {
    type: 'stacked' | 'open-box' | 'closed-box' | 'custom';
    src: string | null;
    width?: number;
    height?: number;
} | null;

// Update the HandleInputChangeFunction type
export type HandleInputChangeFunction = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    section?: keyof QRData | null,
    index?: number | null,
    subKey?: string | null
) => void;


const getPlaceholder = (type: keyof QRData): string => {
    switch (type) {
        case 'url': return 'Enter URL';
        case 'email': return 'Enter email details';
        case 'vcard': return 'Enter contact details';
        case 'wifi': return 'Enter WiFi details';
        case 'text': return 'Enter text';
        case 'whatsapp': return 'Enter WhatsApp details';
        case 'sms': return 'Enter SMS details';
        case 'twitter': return 'Enter Twitter details';
        case 'facebook': return 'Enter Facebook URL';
        case 'pdf': return 'Enter PDF URL';
        case 'mp3': return 'Enter MP3 URL';
        case 'app': return 'Enter App URL';
        case 'file': return 'Upload file';
        case 'multiplink': return 'Enter multiple links';
        case 'youtube': return 'Enter YouTube URL';
        case 'image': return 'Enter image URL';
        default: return 'Enter details';
    }
};

// Add this styled component for the preview toggle section
const PreviewToggleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    width: 100%;
`;

const PreviewToggleButtons = styled.div`
    display: flex;
    gap: 8px;
    justify-content: center;
    width: fit-content;
`;

const ToggleButton = styled.button<{ active: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    background: ${props => props.active ? '#ff6320' : 'transparent'};
    color: ${props => props.active ? '#fff' : '#333'};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Aspekta 550', Arial, sans-serif;
    font-size: 14px;
    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover {
        background: ${props => props.active ? '#ff6320' : '#e9ecef'};
    }

    svg {
        width: 20px;
        height: 20px;
    }

    @media (max-width: 470px) {
        width: 100%;
    }
`;

const PreviewContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export default function QRCodeGenerator(props: QRCodeGeneratorProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [qrType, setQRType] = useState<QRType>('url');
    const [qrData, setQRData] = useState<QRData>({
        url: "https://example.com",
        email: { address: "", subject: "", message: "" },
        vcard: { name: "", phone: "", company: "", address: "" },
        video: { url: "" },
        wifi: { ssid: "", password: "", security: "WPA" },
        text: "",
        whatsapp: { number: "", message: "" },
        sms: { number: "", message: "" },
        twitter: { username: "", tweet: "" },
        facebook: { url: "" },
        pdf: { url: "" },
        mp3: { url: "" },
        app: { url: "" },
        image: { url: "" },
        file: {
            fileData: null,
            title: "",
            description: "",
            buttonText: "Download",
            buttonColor: "#ff6320",
        },
        multiplink: { title: "", links: [] },
        contentType: '',
        contentData: {
            title: '',
            links: [
                { label: '', url: '' },
                { label: '', url: '' },
                { label: '', url: '' },
            ]
        },
        youtube: { url: "" },
        ar: { arUrl: "" },
        crypto: { 
            currency: "BTC",
            address: "",
            amount: ""
        }
    });
    const [qrColor, setQRColor] = useState("#000000");
    const [qrBackground, setQRBackground] = useState("#ffffff");
    const [qrSize, setQRSize] = useState(200);
    const [frame, setFrame] = useState("none");
    const [shape, setShape] = useState<QRDotType>("square");
    const [logo, setLogo] = useState<LogoType>(null);
    const [activeTab, setActiveTab] = useState("frame");
    const qrContainerRef = useRef<HTMLDivElement>(null);

    const frameOptions = [
        { id: "none", label: "No Frame" },
        { id: "simple", label: "Simple Frame" },
        { id: "rounded", label: "Rounded Frame" },
        { id: "fancy", label: "Fancy Frame" },
        { id: "chat", label: "Chat Bubble" },
    ];
    const [qrCodeInstance, setQrCodeInstance] = useState<QRCodeStyling | null>(
        null
    );
    const qrCodeRef = useRef<HTMLDivElement | null>(null);

    const [markerStyle, setMarkerStyle] = useState<CornerSquareType>("square");
    const [markerColor, setMarkerColor] = useState("#000000");

    const [currentShapePage, setCurrentShapePage] = useState(0);
    const shapesPerPage = 4;

    const [frameColor, setFrameColor] = useState("#000000");
    const [currentFramePage, setCurrentFramePage] = useState(0);
    const framesPerPage = 4;

    // Add new state for custom logo image
    const [customLogo, setCustomLogo] = useState<string | null>("");

    // Add a state variable to track when the QR code should be generated
    const [generateQRCode, setGenerateQRCode] = useState(false);

    // Update the state type
    const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

    const [previewMode, setPreviewMode] = useState<'qr' | 'phone'>('qr');

    const [previewType, setPreviewType] = useState<'qr' | 'phone'>('qr');

    const [userChoice, setUserChoice] = useState<'qr' | 'dynamicBio' | null>(null);

    const [backgroundType, setBackgroundType] = useState<string>('colorful');

    const [logoSize, setLogoSize] = useState(50);
    const [gradient, setGradient] = useState(false);
    const [gradientColor1, setGradientColor1] = useState("#000000");
    const [gradientColor2, setGradientColor2] = useState("#000000");
    const [gradientType, setGradientType] = useState("linear");
    const [gradientRotation, setGradientRotation] = useState(0);
    const [cornerDots, setCornerDots] = useState("dot");
    const [cornerSquares, setCornerSquares] = useState("dot");

    // Add new state for type selector visibility
    const [isTypeSelectorVisible, setIsTypeSelectorVisible] = useState(false);

    // Add new state for content and design options dropdown visibility
    const [isContentVisible, setIsContentVisible] = useState(true);
    const [isDesignOptionsVisible, setIsDesignOptionsVisible] = useState(false);

    // Add new state variables for Dynamic Bio customization
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [buttonText, setButtonText] = useState<string>('Download');
    const [buttonColor, setButtonColor] = useState<string>('#ff6320');
    const [dynamicBioType, setDynamicBioType] = useState<string>('file'); // or whatever default you want

    // State to determine screen width
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 460);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Add error state
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    // Update the useEffect hook for resizing
    useEffect(() => {
        const handleResize = () => {
            if (qrContainerRef.current) {
                const containerWidth = qrContainerRef.current.offsetWidth;
                const maxSize = Math.max(Math.min(containerWidth - 40, 300), 200); // Ensure minimum of 200
                setQRSize(maxSize);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial size set

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const generateQRCodeData = async () => {
        switch (qrType) {
            case "file":
                try {
                    console.log('Handling file upload...', qrData.file);
                    
                    if (!qrData.file?.fileData) {
                        console.error('No file data available');
                        throw new Error('No file selected');
                    }

                    // Create FormData
                    const formData = new FormData();
                    
                    // Add the file
                    const file = qrData.file.fileData;
                    console.log('Uploading file:', file);
                    formData.append('file', file);

                    // Add metadata
                    formData.append('title', qrData.file.title || 'Download File');
                    formData.append('description', qrData.file.description || '');
                    formData.append('buttonText', qrData.file.buttonText || 'Download');
                    formData.append('buttonColor', qrData.file.buttonColor || '#ff6320');

                    // Log what's being sent
                    console.log('Sending form data:', {
                        title: qrData.file.title,
                        description: qrData.file.description,
                        buttonText: qrData.file.buttonText,
                        buttonColor: qrData.file.buttonColor,
                        file: {
                            name: file.name,
                            type: file.type,
                            size: file.size
                        }
                    });

                    const response = await fetch(`${getBackendUrl()}/api/upload`, {
                        method: 'POST',
                        body: formData,
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error('Upload failed:', errorData);
                        throw new Error(errorData.message || 'Failed to upload file');
                    }

                    const result = await response.json();
                    console.log('Upload result:', result);

                    if (!result.success || !result.qrId) {
                        throw new Error(result.message || 'Failed to create file QR code');
                    }

                    return `${getBackendUrl()}/qr/${result.qrId}`;
                } catch (error) {
                    console.error('Error creating file QR code:', error);
                    throw error;
                }
            case "url":
                return qrData.url;
            case "email":
                return `mailto:${qrData.email.address}?subject=${encodeURIComponent(
                    qrData.email.subject
                )}&body=${encodeURIComponent(qrData.email.message)}`;
            case "vcard":
                return `BEGIN:VCARD\nVERSION:3.0\nN:${qrData.vcard.name}\nTEL:${qrData.vcard.phone}\nORG:${qrData.vcard.company}\nADR:${qrData.vcard.address}\nEND:VCARD`;
            case "wifi":
                return `WIFI:T:${qrData.wifi.security};S:${qrData.wifi.ssid};P:${qrData.wifi.password};;`;
            case "text":
                return qrData.text;
            case "whatsapp":
                return `https://wa.me/${qrData.whatsapp.number}?text=${encodeURIComponent(
                    qrData.whatsapp.message
                )}`;
            case "sms":
                return `sms:${qrData.sms.number}?body=${encodeURIComponent(
                    qrData.sms.message
                )}`;
            case "twitter":
                return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    qrData.twitter.tweet
                )}&via=${qrData.twitter.username}`;
            case "facebook":
                return qrData.facebook.url;
            case "pdf":
                return qrData.pdf.url;
            case "mp3":
                return qrData.mp3.url;
            case "app":
                return qrData.app.url;
            case "image":
                return qrData.image.url;
            case "multiplink":
                try {
                    const response = await fetch(`${getBackendUrl()}/api/multiplink`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            title: qrData.contentData.title || 'MultiLink',
                            links: qrData.contentData.links || []
                        }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to create multiplink QR code');
                    }

                    const result = await response.json();
                    if (!result.success || !result.qrId) {
                        throw new Error(result.message || 'Failed to create multiplink QR code');
                    }

                    return `${getBackendUrl()}/qr/${result.qrId}`;
                } catch (error) {
                    console.error('Error creating multiplink QR code:', error);
                    throw error;
                }
            case "youtube":
                try {
                    const response = await fetch(`${getBackendUrl()}/api/upload/youtube`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            url: qrData.youtube.url  // Send the full URL
                        }),
                    });

                    const result = await response.json();

                    if (!response.ok || !result.success) {
                        throw new Error(result.message || 'Failed to create YouTube QR code');
                    }

                    return `${getBackendUrl()}/qr/${result.qrId}`;
                } catch (error) {
                    console.error('Error creating YouTube QR code:', error);
                    return '';
                }
            default:
                return "";
        }
    };

    // Update the handleInputChange function to properly handle file uploads
    const handleInputChange: HandleInputChangeFunction = (e, section = null) => {
        const { name, value } = e.target;
        
        // Handle file upload
        if (name === 'fileData' && e.target instanceof HTMLInputElement && e.target.files) {
            const file = e.target.files[0];
            setQRData(prev => ({
                ...prev,
                file: {
                    ...prev.file,
                    fileData: file
                }
            }));
            return;
        }

        // Handle other file-related inputs
        if (section === 'file') {
            setQRData(prev => ({
                ...prev,
                file: {
                    ...prev.file,
                    [name]: value
                }
            }));
            return;
        }

        // Handle other inputs as before
        if (section) {
            setQRData(prev => ({
                ...prev,
                [section]: {
                    ...(prev[section as keyof QRData] as object),
                    [name]: value,
                },
            }));
        } else {
            setQRData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // Function to add a new link field in multiplink
    const handleAddLink = () => {
        setQRData((prevData) => ({
            ...prevData,
            contentData: {
                ...prevData.contentData,
                links: [...(prevData.contentData.links || []), { label: '', url: '' }],
            },
        }));
    };

    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setCustomLogo(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleDownload = async (format: "png" | "svg") => {
        setGenerateQRCode(true);
        try {
            // Generate the QR code data, including any API calls
            const url = await generateQRCodeData();
            if (url) {
                setGeneratedUrl(url);

                // Update QR code with the actual URL
                if (qrCodeInstance) {
                    qrCodeInstance.update({
                        data: url,
                        width: qrSize,
                        height: qrSize,
                        dotsOptions: {
                            type: shape,
                            color: qrColor,
                        },
                        backgroundOptions: {
                            color: qrBackground,
                        },
                        cornersSquareOptions: {
                            type: markerStyle,
                            color: markerColor,
                        },
                        imageOptions: {
                            imageSize: 0.4,
                            margin: 0,
                        },
                    });
                }
            }

            // Proceed to download the QR code
            const previewContainer = document.querySelector('.preview-container');
            if (!previewContainer) return;

            const canvas = await html2canvas(previewContainer as HTMLElement, {
                backgroundColor: '#f8f9fa',
                scale: 4,
                logging: false,
                useCORS: true,
                allowTaint: true,
                onclone: (clonedDoc) => {
                    const clonedPreview = clonedDoc.querySelector('.preview-container');
                    if (clonedPreview) {
                        (clonedPreview as HTMLElement).style.padding = '4px';
                    }
                },
            });

            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `qr-code.${format}`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }
            }, `image/${format}`);
        } catch (error) {
            console.error('Error generating or downloading QR code:', error);
            alert('Error generating or downloading QR code. Please try again.');
        } finally {
            setGenerateQRCode(false);
        }
    };

    // Add these helper functions
    const getLogoContent = (logoType: LogoType) => {
        if (!logoType) return undefined;
        
        switch (logoType.type) {
            case 'stacked':
                return 'data:image/svg+xml,' + encodeURIComponent(`
                    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                        <text x="50%" y="45%" font-size="24" text-anchor="middle" font-weight="bold">SCAN</text>
                        <text x="50%" y="70%" font-size="24" text-anchor="middle" font-weight="bold">ME</text>
                    </svg>
                `);
            case 'open-box':
                return 'data:image/svg+xml,' + encodeURIComponent(`
                    <svg width="120" height="100" xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(10,20)">
                            <path d="
                                M 0 0 H 40 M 60 0 H 100
                                M 0 0 V 20 M 0 30 V 50
                                M 100 0 V 20 M 100 30 V 50
                                M 0 50 H 40 M 60 50 H 100
                            " 
                            fill="none" 
                            stroke="black" 
                            stroke-width="4"/>
                            <text x="50" y="32" font-size="18" text-anchor="middle" font-weight="bold" letter-spacing="2">SCAN ME</text>
                        </g>
                    </svg>
                `);
            case 'closed-box':
                return 'data:image/svg+xml,' + encodeURIComponent(`
                    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(5,20)">
                            <rect x="0" y="0" width="90" height="50" fill="none" stroke="black" stroke-width="4"/>
                            <text x="45" y="32" font-size="18" text-anchor="middle" font-weight="bold">SCAN ME</text>
                        </g>
                    </svg>
                `);
            default:
                return customLogo || undefined;
        }
    };

    // Update the useEffect that generates the QR code
    useEffect(() => {
        let isCancelled = false;

        const updateQRCode = async () => {
            try {
                const qrData = await generateQRCodeData();
                
                if (!isCancelled && qrCodeInstance) {
                    qrCodeInstance.update({
                        width: qrSize,
                        height: qrSize,
                        data: qrData || 'Preview',
                        dotsOptions: {
                            type: shape,
                            color: qrColor
                        },
                        backgroundOptions: {
                            color: qrBackground
                        },
                        cornersSquareOptions: {
                            type: markerStyle,
                            color: markerColor
                        },
                        imageOptions: {
                            imageSize: 0.4,
                            margin: 0
                        }
                    });
                }
            } catch (error) {
                console.error('Error updating QR code:', error);
            }
        };

        updateQRCode();

        return () => {
            isCancelled = true;
        };
    }, [
        qrSize,
        shape,
        qrColor,
        qrBackground,
        markerStyle,
        markerColor,
        qrData, // Add qrData to dependencies
        qrType  // Add qrType to dependencies
    ]);

    const handleMarkerStyleChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setMarkerStyle(e.target.value as CornerSquareType);
    };

    const handleMarkerColorChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMarkerColor(e.target.value);
    };

    // Function to handle the "Generate QR Code" button click
    const handleGenerateClick = async () => {
        try {
            setGenerateQRCode(true);
            
            // Create FormData
            const formData = new FormData();
            
            if (qrData.file.fileData) {
                formData.append('file', qrData.file.fileData);
                formData.append('title', qrData.file.title || 'Download File');
                formData.append('description', qrData.file.description || '');
                formData.append('buttonText', qrData.file.buttonText || 'Download');
                formData.append('buttonColor', qrData.file.buttonColor || '#ff6320');

                const response = await fetch(`${getBackendUrl()}/api/upload`, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`Upload failed: ${response.statusText}`);
                }

                const result = await response.json();
                if (result.success && result.qrId) {
                    const url = `${window.location.origin}/qr/${result.qrId}`;
                    setGeneratedUrl(url);
                    
                    // Update QR code with the new URL
                    if (qrCodeInstance) {
                        qrCodeInstance.update({
                            data: url
                        });
                    }
                } else {
                    throw new Error(result.message || 'Upload failed');
                }
            }
        } catch (error) {
            console.error('Error during file upload:', error);
            alert('Error uploading file. Please try again.');
            setGenerateQRCode(false);
        }
    };

    // Update the handleTypeChange function
    const handleTypeChange = (newType: QRType) => {
        setQRType(newType);
        setIsTypeDropdownOpen(false);
        
        // Reset QR data based on type
        const defaultData: Partial<QRData> = {
            url: newType === 'url' ? 'https://example.com' : '',
            email: { address: '', subject: '', message: '' },
            vcard: { name: '', phone: '', company: '', address: '' },
            wifi: { ssid: '', password: '', security: 'WPA' },
            text: '',
            whatsapp: { number: '', message: '' },
            sms: { number: '', message: '' },
            twitter: { username: '', tweet: '' },
            facebook: { url: '' },
            pdf: { url: '' },
            mp3: { url: '' },
            app: { url: '' },
            image: { url: '' },
            file: {
                fileData: null,
                title: '',
                description: '',
                buttonText: 'Download',
                buttonColor: '#ff6320',
            },
            multiplink: { title: '', links: [] },
            youtube: { url: '' },
            ar: { arUrl: '' },
            crypto: { 
                currency: "BTC",
                address: "",
                amount: ""
            }
        };

        setQRData(prevData => ({
            ...prevData,
            ...defaultData
        }));

        // Reset preview mode if needed
        if (!shouldShowPhonePreview(newType)) {
            setPreviewMode('qr');
        }
    };

    // Add this inside your QRCodeGenerator component
    const shouldShowPhonePreview = (type: string) => {
        return ['file', 'multiplink', 'youtube'].includes(type);
    };

    // Update the handleQRTypeSelect to not change steps
    const handleQRTypeSelect = (type: QRType) => {
        setQRType(type);
        setIsTypeSelectorVisible(false); // Close the selector after selection
    };

    // Add this function to handle hover
    const handleQRTypeHover = (type: QRType) => {
        setPreviewType('qr');
    };

    // Add this function to get placeholder data for preview
    const getPlaceholderData = (type: QRType): Partial<QRData> => {
        switch (type) {
            case 'url':
                return { url: 'https://example.com' };
            case 'file':
                return {
                    file: {
                        fileData: null,
                        title: 'Sample File',
                        description: 'This is a sample file description',
                        buttonText: 'Download',
                        buttonColor: '#ff6320',
                    }
                };
            case 'multiplink':
                return {
                    contentData: {
                        title: 'My Links',
                        links: [
                            { label: 'Website', url: 'https://example.com' },
                            { label: 'Blog', url: 'https://blog.example.com' },
                            { label: 'Contact', url: 'https://example.com/contact' },
                        ]
                    }
                };
            // Add more cases for other QR types...
            default:
                return {};
        }
    };

    useEffect(() => {
        const qrCode = new QRCodeStyling({
            width: 200,
            height: 200,
            data: "https://example.com",
            dotsOptions: {
                type: shape,
                color: qrColor,
            },
            backgroundOptions: {
                color: qrBackground,
            },
            cornersSquareOptions: {
                type: markerStyle,
                color: markerColor,
            },
        });
        setQrCodeInstance(qrCode);
    }, []); // Initialize once when component mounts

    // const handleNext = () => {
    //     setCurrentStep(prevStep => prevStep + 1);
    // };

    // const handleBack = () => {
    //     setCurrentStep(prevStep => prevStep - 1);
    // };

    // const isContentValid = () => {
    //     // Validate your content here based on qrType and qrData
    //     // Return true if valid, false otherwise
    //     return true; // Placeholder
    // };

    // Add this near your other useEffect hooks
    useEffect(() => {
        const sendHeightToParent = () => {
            const height = document.documentElement.scrollHeight;
            // Post message to parent with the height
            window.parent.postMessage({ type: 'frameHeight', height }, '*');
        };

        // Send initial height
        sendHeightToParent();

        // Send height on window resize
        window.addEventListener('resize', sendHeightToParent);

        // Create a MutationObserver to watch for DOM changes
        const observer = new MutationObserver(sendHeightToParent);
        
        // Start observing the document body for DOM changes
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true
        });

        // Cleanup
        return () => {
            window.removeEventListener('resize', sendHeightToParent);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 460);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const body = document.body;
        if (isModalOpen) {
            body.classList.add('modal-open');
        } else {
            body.classList.remove('modal-open');
        }
    }, [isModalOpen]);

    const handleFileUpload = async (formData: FormData) => {
        try {
            setError(null);
            console.log('Starting file upload...');
            
            // Make sure the file is being added with the correct field name
            const fileData = qrData.file?.fileData;
            if (!fileData) {
                throw new Error('No file selected');
            }

            // Create new FormData and append all necessary fields
            const uploadFormData = new FormData();
            
            // Important: Make sure the file field name matches the backend
            uploadFormData.append('file', fileData);
            
            // Log file details for debugging
            console.log('File being uploaded:', {
                name: fileData.name,
                type: fileData.type,
                size: fileData.size
            });

            // Add other form fields
            uploadFormData.append('title', qrData.file?.title || 'Download File');
            uploadFormData.append('description', qrData.file?.description || '');
            uploadFormData.append('buttonText', qrData.file?.buttonText || 'Download');
            uploadFormData.append('buttonColor', qrData.file?.buttonColor || '#ff6320');

            // Log all form data entries
            Array.from(uploadFormData.entries()).forEach(([key, value]) => {
                console.log('Form data entry:', key, value instanceof File ? 'File' : value);
            });

            const response = await fetch(`${getBackendUrl()}/api/upload`, {
                method: 'POST',
                body: uploadFormData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Upload failed');
            }

            const data = await response.json();
            console.log('Upload successful:', data);

            if (data.success && data.qrId) {
                setGeneratedUrl(data.qrId);
                setGenerateQRCode(true);
            } else {
                throw new Error('Invalid response from server');
            }

        } catch (error) {
            console.error('Upload error:', error);
            setError(error instanceof Error ? error.message : 'Upload failed');
        }
    };

    return (
        <Container>
            <LeftColumn>
                {/* QR Type Grid */}
                <TypeGrid>
                    <QRCodeTypeSelector
                        onSelect={handleQRTypeSelect}
                        onHover={handleQRTypeHover}
                        selectedType={qrType}
                        userChoice={userChoice ?? 'qr'}
                    />
                </TypeGrid>

                {/* Content Form */}
                <QRCodeForm
                    qrType={qrType}
                    qrData={qrData}
                    handleInputChange={handleInputChange}
                    handleAddLink={handleAddLink}
                    placeholder={getPlaceholder(qrType)}
                    userChoice={userChoice}
                />

                {/* Customization Tabs */}
                <CustomizationTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    frame={frame}
                    setFrame={setFrame}
                    frameColor={frameColor}
                    setFrameColor={setFrameColor}
                    shape={shape}
                    setShape={setShape}
                    qrColor={qrColor}
                    setQRColor={setQRColor}
                    qrBackground={qrBackground}
                    setQRBackground={setQRBackground}
                    markerStyle={markerStyle}
                    setMarkerStyle={setMarkerStyle}
                    markerColor={markerColor}
                    setMarkerColor={setMarkerColor}
                    logo={logo}
                    setLogo={setLogo}
                    logoSize={logoSize}
                    setLogoSize={setLogoSize}
                    gradient={gradient}
                    setGradient={setGradient}
                    gradientColor1={gradientColor1}
                    setGradientColor1={setGradientColor1}
                    gradientColor2={gradientColor2}
                    setGradientColor2={setGradientColor2}
                    gradientType={gradientType}
                    setGradientType={setGradientType}
                    gradientRotation={gradientRotation}
                    setGradientRotation={setGradientRotation}
                    cornerDots={cornerDots}
                    setCornerDots={setCornerDots}
                    cornerSquares={cornerSquares}
                    setCornerSquares={setCornerSquares}
                    currentFramePage={currentFramePage}
                    setCurrentFramePage={setCurrentFramePage}
                    currentShapePage={currentShapePage}
                    setCurrentShapePage={setCurrentShapePage}
                    customLogo={customLogo}
                    setCustomLogo={setCustomLogo}
                />

                {['file', 'multiplink', 'pdf'].includes(qrType) && (
                    <DynamicBioCustomizationTabs
                        qrType={qrType}
                        qrData={qrData}
                        handleInputChange={handleInputChange}
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                        buttonText={buttonText}
                        setButtonText={setButtonText}
                        buttonColor={buttonColor}
                        setButtonColor={setButtonColor}
                        dynamicBioType={dynamicBioType}
                        backgroundType={backgroundType}
                        setBackgroundType={setBackgroundType}
                    />
                )}
            </LeftColumn>

            {/* Conditionally render RightColumn or PreviewButton */}
            {!isMobile ? (
                <RightColumn>
                    <PreviewToggleContainer>
                        <PreviewToggleButtons>
                            <ToggleButton
                                active={previewType === 'qr'}
                                onClick={() => setPreviewType('qr')}
                            >
                                <QrCode /> QR Preview
                            </ToggleButton>
                            {['file', 'multiplink', 'pdf'].includes(qrType) && (
                                <ToggleButton
                                    active={previewType === 'phone'}
                                    onClick={() => setPreviewType('phone')}
                                    disabled={!['file', 'multiplink', 'pdf'].includes(qrType)}
                                >
                                    <DeviceMobile /> Phone Preview
                                </ToggleButton>
                            )}
                        </PreviewToggleButtons>
                    </PreviewToggleContainer>

                    {previewType === 'qr' && (
                        <Preview
                            qrCodeInstance={qrCodeInstance}
                            handleDownload={handleDownload}
                            generateQRCodeData={generateQRCodeData}
                            frame={frame}
                            shape={shape}
                            frameColor={frameColor}
                            qrType={qrType}
                            generatedUrl={generatedUrl}
                            setGeneratedUrl={setGeneratedUrl}
                            setGenerateQRCode={setGenerateQRCode}
                            qrData={qrData}
                        />
                    )}
                    {previewType === 'phone' && (
                        <PhonePreview
                            show={true}
                            qrType={qrType}
                            qrData={qrData}
                            backgroundType={backgroundType}
                        />
                    )}
                </RightColumn>
            ) : (
                <>
                    <PreviewButton onClick={() => setIsModalOpen(true)}>
                        Preview
                    </PreviewButton>
                    {isModalOpen && (
                        <PreviewModal
                            previewType={previewType}
                            setPreviewType={setPreviewType}
                            onClose={() => setIsModalOpen(false)}
                            qrCodeInstance={qrCodeInstance}
                            handleDownload={handleDownload}
                            generateQRCodeData={generateQRCodeData}
                            frame={frame}
                            shape={shape}
                            frameColor={frameColor}
                            qrType={qrType}
                            generatedUrl={generatedUrl}
                            setGeneratedUrl={setGeneratedUrl}
                            setGenerateQRCode={setGenerateQRCode}
                            qrData={qrData}
                            backgroundType={backgroundType}
                            gradient={gradient}
                            setGradient={setGradient}
                            gradientColor1={gradientColor1}
                            setGradientColor1={setGradientColor1}
                            gradientColor2={gradientColor2}
                            setGradientColor2={setGradientColor2}
                            gradientType={gradientType}
                            setGradientType={setGradientType}
                            gradientRotation={gradientRotation}
                            setGradientRotation={setGradientRotation}
                            cornerDots={cornerDots}
                            setCornerDots={setCornerDots}
                            cornerSquares={cornerSquares}
                            setCornerSquares={setCornerSquares}
                            currentFramePage={currentFramePage}
                            setCurrentFramePage={setCurrentFramePage}
                            currentShapePage={currentShapePage}
                            setCurrentShapePage={setCurrentShapePage}
                            customLogo={customLogo}
                            setCustomLogo={setCustomLogo}
                            title={title}
                            setTitle={setTitle}
                            description={description}
                            setDescription={setDescription}
                            buttonText={buttonText}
                            setButtonText={setButtonText}
                            buttonColor={buttonColor}
                            setButtonColor={setButtonColor}
                            dynamicBioType={dynamicBioType}
                            setBackgroundType={setBackgroundType}
                        />
                    )}
                </>
            )}
            {error && (
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            )}
        </Container>
    );
}

// Update styled components
const Container = styled.div`
    padding: 20px;
    display: flex;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 900px) {
        flex-direction: column;
    }
`;

const LeftColumn = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: 900px) {
        width: 100%;
    }
`;

const RightColumn = styled.div`
    width: 375px;
    position: sticky;
    top: 20px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 900px) {
        width: 100%;
        position: static;
        top: unset;
    }
`;

const TypeGrid = styled.div`
    display: grid;
    grid-template-columns: column;
    gap: 8px;
    padding: 16px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

// New styled component for the PreviewButton
const PreviewButton = styled.button`
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ff6320;
    color: white;
    border: none;
    border-radius: 50px;
    padding: 12px 24px;
    font-size: 16px;
    font-family: 'Aspekta 550', Arial, sans-serif;
    cursor: pointer;
    z-index: 1000;

    &:hover {
        background-color: #e0551c;
    }
`;

// New styled component for the ErrorMessage
const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    margin-top: 10px;
`;
