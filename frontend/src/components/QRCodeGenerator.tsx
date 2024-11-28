import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import QRCodeStyling, {
    DotType as QRDotType,
    CornerSquareType,
} from "qr-code-styling";
import html2canvas from 'html2canvas';

// Import the new components
import { QRCodeForm } from './QRCodeForm';
import { QRCodeTypeSelector } from './QRCodeTypeSelector';
import { PhonePreview } from './PhonePreview/PhonePreview';

import { getBackendUrl } from '../utils/constants';
import { QRData } from '../types/qr';
import { Preview } from "./Preview";

interface QRCodeGeneratorProps {}

// Update the LogoType definition
type LogoType = {
    type: 'stacked' | 'open-box' | 'closed-box' | 'custom';
    src: string | null;
    width?: number;
    height?: number;
} | null;

// Add this type definition near the top of the file, with other type definitions
export type QRType = keyof QRData;


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

export default function QRCodeGenerator(props: QRCodeGeneratorProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [qrType, setQRType] = useState<keyof QRData>("url");
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
                { label: '', url: '' }, // Required first link
                { label: '', url: '' }, // Default second link
                { label: '', url: '' }, // Default third link
            ]
        },
        youtube: {
            url: ""  // Changed from title and videoId to just url
        },
    });
    const [qrColor, setQRColor] = useState("#000000");
    const [qrBackground, setQRBackground] = useState("#ffffff");
    const [qrSize, setQRSize] = useState(125);
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

    const [currentStep, setCurrentStep] = useState(1);

    const [previewType, setPreviewType] = useState<keyof QRData>("url");

    const [userChoice, setUserChoice] = useState<'qr' | 'dynamicBio' | null>(null);

    const [backgroundType, setBackgroundType] = useState<string>('colorful');

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    // Update the useEffect hook for resizing
    useEffect(() => {
        const handleResize = () => {
            if (qrContainerRef.current) {
                const containerWidth = qrContainerRef.current.offsetWidth;
                const maxSize = Math.min(containerWidth - 40, 200); // 40px for padding, max 300px
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
                if (qrData.file.fileData) {
                    try {
                        // Create FormData
                        const formData = new FormData();
                        formData.append("file", qrData.file.fileData);
                        formData.append("title", qrData.file.title || 'Download File');
                        formData.append("description", qrData.file.description || '');
                        formData.append("buttonText", qrData.file.buttonText || 'Download');
                        formData.append("buttonColor", qrData.file.buttonColor || '#ff6320');

                        // Log the buttonColor before sending
                        console.log('Button color sent:', qrData.file.buttonColor);

                        // Add loading state if needed
                        // setIsLoading(true);

                        const response = await fetch(`${getBackendUrl()}/api/upload`, {
                            method: "POST",
                            body: formData,
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        const result = await response.json();

                        if (!result.success || !result.qrId) {
                            throw new Error(result.message || 'Upload failed');
                        }

                        // Construct and return the QR code URL
                        return `${getBackendUrl()}/qr/${result.qrId}`;

                    } catch (error) {
                        console.error("Error during upload:", error);
                        throw error; // Re-throw to be handled by caller
                    } finally {
                        // Clear loading state if needed
                        // setIsLoading(false);
                    }
                }
                return "";
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

    // Update the handleInputChange function
    const handleInputChange: HandleInputChangeFunction = (
        e,
        section = null,
        index = null,
        subKey = null
    ) => {
        const { name, value } = e.target;

        setQRData((prevData: QRData) => {
            if (section && Object.prototype.hasOwnProperty.call(prevData, section)) {
                return {
                    ...prevData,
                    [section]: {
                        ...(prevData[section as keyof QRData] as Record<string, any>),
                        [name]: value
                    }
                };
            }

            // Handle file upload separately
            if (name === 'fileData' && section === 'file') {
                const file = (e.target as HTMLInputElement).files?.[0];
                return {
                    ...prevData,
                    file: {
                        ...prevData.file,
                        fileData: file || null
                    }
                };
            }

            // Handle nested objects (like email, vcard, wifi, etc.)
            if (section) {
                // Handle multiplink links array
                if (section === 'contentData' && index !== null && subKey) {
                    const newLinks = [...(prevData.contentData?.links || [])];
                    newLinks[index] = {
                        ...newLinks[index],
                        [subKey]: value
                    };
                    return {
                        ...prevData,
                        contentData: {
                            ...prevData.contentData,
                            links: newLinks
                        }
                    };
                }

                // Handle regular nested objects
                return {
                    ...prevData,
                    [section]: {
                        ...(prevData[section as keyof QRData] as Record<string, any>),
                        [name]: value
                    }
                };
            }

            // Handle non-nested values (like text)
            return {
                ...prevData,
                [name]: value
            };
        });
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
            const url = await generateQRCodeData(); // This makes the API call
            if (url) {
                setGeneratedUrl(url);
                // Update QR code with the actual URL
                if (qrCodeInstance) {
                    qrCodeInstance.update({
                        data: url,
                        // ... other options remain the same
                    });
                }
            }
        } catch (error) {
            console.error("Error generating QR code:", error);
            alert("Error uploading file. Please try again.");
        } finally {
            setGenerateQRCode(false);
        }
    };

    // Update the handleTypeChange function
    const handleTypeChange = (newType: QRType) => {
        setQRType(newType as keyof QRData); // Explicitly cast to keyof QRData
        setIsTypeDropdownOpen(false); // Close dropdown after selection
        
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

    const handleQRTypeSelect = (type: QRType) => {
        setQRType(type);
        setCurrentStep(3); // Proceed to the next step
    };

    // Add this function to handle hover
    const handleQRTypeHover = (type: QRType) => {
        setPreviewType(type);
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
            width: 300,
            height: 300,
            data: "https://example.com", // Default data
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

    return (
        <Container>
            {currentStep === 1 && (
                <FullPageSelection>
                    <SelectionButton onClick={() => { setUserChoice('qr'); setCurrentStep(2); }}>
                        QR Code
                    </SelectionButton>
                    <SelectionButton onClick={() => { setUserChoice('dynamicBio'); setCurrentStep(2); }}>
                        Dynamic Bio
                    </SelectionButton>
                </FullPageSelection>
            )}

            {currentStep === 2 && (
                <LeftColumn>
                    <Title>Select a type of QR code</Title>
                    <QRCodeTypeSelector 
                        onSelect={handleQRTypeSelect} 
                        onHover={handleQRTypeHover} 
                        userChoice={userChoice || 'qr'}
                    />
                </LeftColumn>
            )}

            {currentStep === 3 && (
                <LeftColumn>
                    <BackButton onClick={() => setCurrentStep(2)}>Back</BackButton>
                    <Title>Configure your QR code</Title>
                    <QRCodeForm
                        qrType={qrType}
                        qrData={qrData}
                        handleInputChange={handleInputChange}
                        placeholder={getPlaceholder(qrType)}
                        handleAddLink={handleAddLink}
                        userChoice={userChoice}
                    />
                </LeftColumn>
            )}

            {currentStep !== 1 && (
                <RightColumn>
                    {userChoice === 'qr' ? (
                        <div className="preview-container">
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
                            />
                        </div>
                    ) : (
                        <PhonePreview
                            show={true}
                            qrType={qrType}
                            qrData={qrData}
                            backgroundType={backgroundType}
                        />
                    )}
                </RightColumn>
            )}
        </Container>
    );
}

// Styled Components

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const LeftColumn = styled.div`
    flex: 2;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    background-color: #f8f9fa;

    /* Hide scrollbar but keep functionality */
    scrollbar-width: thin;
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
    }
`;

const RightColumn = styled.div`
    flex: 1;
    padding: 2rem;
    position: relative;
    height: 100%;
    overflow-y: auto;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    .preview-container {
        position: sticky;
        top: 50%;
        transform: translateY(-50%);
    }
`;
const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #1b294b;

    @media (min-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
    }
`;


const BackButton = styled.button`
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    margin-bottom: 10px;

    &:hover {
        text-decoration: underline;
    }
`;

const FullPageSelection = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;

const SelectionButton = styled.button`
    flex: 1;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 2rem;
    background-color: #f8f9fa;
    position: relative;
    overflow: hidden;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: #ff6320;
        color: white;
    }

    &::before {
        content: "";
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background-size: 40px 40px;
        background-image: linear-gradient(135deg, transparent 75%, rgba(0, 0, 0, 0.05) 75%),
                          linear-gradient(225deg, transparent 75%, rgba(0, 0, 0, 0.05) 75%),
                          linear-gradient(45deg, transparent 75%, rgba(0, 0, 0, 0.05) 75%),
                          linear-gradient(315deg, transparent 75%, rgba(0, 0, 0, 0.05) 75%);
        background-position: 0 0, 0 0, 20px 20px, 20px 20px;
        background-repeat: repeat;
        opacity: 0;
        transition: opacity 0.3s;
    }

    &:hover::before {
        opacity: 1;
    }

    &:first-child {
        border-right: 1px solid #dee2e6;
    }
`;
