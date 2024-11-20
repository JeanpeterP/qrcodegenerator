import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
    Wifi,
    Mail,
    Link,
    CreditCard,
    MessageSquare,
    AlignLeft,
    Send,
    Twitter,
    Facebook,
    FileText,
    Music,
    Download,
    Image,
    ChevronDown,
    Code,
    Plus,
} from "lucide-react";
import QRCodeStyling, {
    DotType as QRDotType,
    CornerSquareType,
    CornerDotType,
} from "qr-code-styling";
import { CaretLeft, CaretRight, DownloadSimple } from "@phosphor-icons/react";
import html2canvas from 'html2canvas';

// Import the new components
import { QRCodeForm } from './QRCodeForm';
import { CustomizationTabs } from './CustomizationTabs';
import { Preview } from './Preview';

interface CustomizationTabsProps {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    frame: string;
    setFrame: React.Dispatch<React.SetStateAction<string>>;
    frameColor: string;
    setFrameColor: React.Dispatch<React.SetStateAction<string>>;
    shape: QRDotType;
    setShape: React.Dispatch<React.SetStateAction<QRDotType>>;
    qrColor: string;
    setQRColor: React.Dispatch<React.SetStateAction<string>>;
    qrBackground: string;
    setQRBackground: React.Dispatch<React.SetStateAction<string>>;
    currentFramePage: number;
    setCurrentFramePage: React.Dispatch<React.SetStateAction<number>>;
    logo: LogoType;
    setLogo: React.Dispatch<React.SetStateAction<LogoType>>;
    markerStyle: CornerSquareType;
    setMarkerStyle: React.Dispatch<React.SetStateAction<CornerSquareType>>;
    markerColor: string;
    setMarkerColor: React.Dispatch<React.SetStateAction<string>>;
    currentShapePage: number;
    setCurrentShapePage: React.Dispatch<React.SetStateAction<number>>;
    customLogo: string | null;
    setCustomLogo: React.Dispatch<React.SetStateAction<string | null>>;
}

interface QRCodeGeneratorProps {}

interface QRData {
    url: string;
    email: { address: string; subject: string; message: string };
    vcard: { name: string; phone: string; company: string; address: string };
    wifi: { ssid: string; password: string; security: string };
    text: string;
    whatsapp: { number: string; message: string };
    sms: { number: string; message: string };
    twitter: { username: string; tweet: string };
    facebook: { url: string };
    pdf: { url: string };
    mp3: { url: string };
    app: { url: string };
    image: { url: string };
}

// Add new interface for logo types
type LogoType = 'custom' | 'stacked' | 'open-box' | 'closed-box';

const Container = styled.div`
    padding: 20px 40px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    font-family: "Aspekta 550", Arial, sans-serif;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    gap: 80px;
    position: relative;

    @media (max-width: 900px) {
        flex-direction: column;
        gap: 40px;
        height: auto;
        overflow: visible;
    }
`;

const GeneratorColumn = styled.div`
    flex: 0 1 35%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: relative;

    @media (max-width: 900px) {
        flex: none;
        width: 100%;
        height: auto;
    }
`;

const PreviewColumn = styled.div`
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: relative;

    @media (max-width: 900px) {
        width: 100%;
        height: auto;
    }
`;

// Update the HandleInputChangeFunction type
type HandleInputChangeFunction = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    nestedKey?: string | null
) => void;

// Update the QRCodeFormProps interface
interface QRCodeFormProps {
    qrType: keyof QRData;
    qrData: QRData;
    handleInputChange: HandleInputChangeFunction;
}

// Update the PreviewProps interface to match the Preview component's actual needs
interface PreviewProps {
    qrCodeInstance: QRCodeStyling | null;
    handleDownload: (format: "png" | "svg") => Promise<void>;
    frame: string;
    shape: string;
    frameColor: string;
}

export default function QRCodeGenerator(props: QRCodeGeneratorProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [qrType, setQRType] = useState<keyof QRData>("url");
    const [qrData, setQRData] = useState<QRData>({
        url: "https://example.com",
        email: { address: "", subject: "", message: "" },
        vcard: { name: "", phone: "", company: "", address: "" },
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
    });
    const [qrColor, setQRColor] = useState("#000000");
    const [qrBackground, setQRBackground] = useState("#ffffff");
    const [qrSize, setQRSize] = useState(125);
    const [frame, setFrame] = useState("none");
    const [shape, setShape] = useState<QRDotType>("square");
    const [logo, setLogo] = useState<LogoType>("custom");
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

    const generateQRCodeData = () => {
        switch (qrType) {
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
            default:
                return "";
        }
    };

    // Update the handleInputChange function signature
    const handleInputChange: HandleInputChangeFunction = (e, nestedKey = null) => {
        const { name, value } = e.target;

        if (nestedKey) {
            setQRData((prevData) => ({
                ...prevData,
                [nestedKey as keyof QRData]: {
                    ...(prevData[nestedKey as keyof QRData] as Record<string, string>),
                    [name]: value,
                },
            }));
        } else {
            setQRData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
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
        // Get the entire preview container instead of just the QR code
        const previewContainer = document.querySelector('.preview-container');
        if (!previewContainer) return;

        try {
            const canvas = await html2canvas(previewContainer as HTMLElement, {
                backgroundColor: '#f8f9fa',
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: true,
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
            console.error('Error generating QR code:', error);
        }
    };

    // Add these helper functions
    const getLogoContent = (logoType: LogoType) => {
        switch (logoType) {
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
        if (!isMounted) return;

        const qrCodeData = generateQRCodeData();
        const logoImage = getLogoContent(logo);

        const qrCode = new QRCodeStyling({
            width: qrSize,
            height: qrSize,
            data: qrCodeData,
            image: logoImage,
            dotsOptions: {
                color: qrColor,
                type: shape,
            },
            cornersSquareOptions: {
                color: markerColor,
                type: markerStyle,
            },
            backgroundOptions: {
                color: qrBackground,
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 5,
                imageSize: 0.4,
            },
        });

        setQrCodeInstance(qrCode);

        if (qrCodeRef.current) {
            qrCodeRef.current.innerHTML = '';
            qrCode.append(qrCodeRef.current);
        }

        return () => {
            if (qrCodeRef.current) {
                qrCodeRef.current.innerHTML = "";
            }
        };
    }, [
        isMounted,
        qrType,
        qrData,
        qrColor,
        qrBackground,
        qrSize,
        shape,
        markerStyle,
        markerColor,
        logo,
        customLogo,
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

    return isMounted ? (
        <Container ref={qrContainerRef}>
            <GeneratorColumn>
                <GeneratorCard>
                    <Title>QR Code Generator</Title>
                    <TabContainer>
                        <Tab
                            active={qrType === "url"}
                            onClick={() => setQRType("url")}
                        >
                            <Link size={16} />
                            URL
                        </Tab>
                        <Tab
                            active={qrType === "email"}
                            onClick={() => setQRType("email")}
                        >
                            <Mail size={16} />
                            Email
                        </Tab>
                        <Tab
                            active={qrType === "vcard"}
                            onClick={() => setQRType("vcard")}
                        >
                            <CreditCard size={16} />
                            VCard
                        </Tab>
                        <Tab
                            active={qrType === "wifi"}
                            onClick={() => setQRType("wifi")}
                        >
                            <Wifi size={16} />
                            WiFi
                        </Tab>
                        <Tab
                            active={qrType === "text"}
                            onClick={() => setQRType("text")}
                        >
                            <AlignLeft size={16} />
                            Text
                        </Tab>
                        <Tab
                            active={qrType === "whatsapp"}
                            onClick={() => setQRType("whatsapp")}
                        >
                            <MessageSquare size={16} />
                            WhatsApp
                        </Tab>
                        <Tab
                            active={qrType === "sms"}
                            onClick={() => setQRType("sms")}
                        >
                            <Send size={16} />
                            SMS
                        </Tab>
                        <Tab
                            active={qrType === "twitter"}
                            onClick={() => setQRType("twitter")}
                        >
                            <Twitter size={16} />
                            Twitter
                        </Tab>
                        <Tab
                            active={qrType === "facebook"}
                            onClick={() => setQRType("facebook")}
                        >
                            <Facebook size={16} />
                            Facebook
                        </Tab>
                        <Tab
                            active={qrType === "pdf"}
                            onClick={() => setQRType("pdf")}
                        >
                            <FileText size={16} />
                            PDF
                        </Tab>
                        <Tab
                            active={qrType === "mp3"}
                            onClick={() => setQRType("mp3")}
                        >
                            <Music size={16} />
                            MP3
                        </Tab>
                        <Tab
                            active={qrType === "app"}
                            onClick={() => setQRType("app")}
                        >
                            <Download size={16} />
                            App Store
                        </Tab>
                        <Tab
                            active={qrType === "image"}
                            onClick={() => setQRType("image")}
                        >
                            <Image size={16} />
                            Image
                        </Tab>
                    </TabContainer>
                    {/* Replace form rendering with QRCodeForm component */}
                    <QRCodeForm
                        qrType={qrType}
                        qrData={qrData}
                        handleInputChange={handleInputChange}
                    />
                </GeneratorCard>
            </GeneratorColumn>
            <PreviewColumn>
                <PreviewCard>
                    <Title>QR Code Preview</Title>
                    {/* Use the new Preview component */}
                    <Preview
                        qrCodeInstance={qrCodeInstance}
                        handleDownload={handleDownload}
                        frame={frame}
                        shape={shape}
                        frameColor={frameColor}
                    />
                    {/* Use the new CustomizationTabs component */}
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
                        currentFramePage={currentFramePage}
                        setCurrentFramePage={setCurrentFramePage}
                        logo={logo}
                        setLogo={setLogo}
                        markerStyle={markerStyle}
                        setMarkerStyle={setMarkerStyle}
                        markerColor={markerColor}
                        setMarkerColor={setMarkerColor}
                        currentShapePage={currentShapePage}
                        setCurrentShapePage={setCurrentShapePage}
                        customLogo={customLogo}
                        setCustomLogo={setCustomLogo}
                    />
                    {/* Include DigitalProductSection if needed */}
                </PreviewCard>
            </PreviewColumn>
        </Container>
    ) : null;
}

// Styled Components

const GeneratorCard = styled.div`
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 14px 16px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    width: 100%;
    min-height: 625px;
    display: flex;
    flex-direction: column;

    /* Custom scrollbar for generator side */
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

const PreviewCard = styled.div`
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 14px 16px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    width: 100%;
    min-height: 625px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    /* Custom scrollbar for preview side */
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
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

const TabContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.25rem;
    margin-bottom: 0.5rem;

    @media (max-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 350px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;
const Tab = styled.button<{ active: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    background-color: ${(props) => (props.active ? "#ff6320" : "#f8f9fa")};
    color: ${(props) => (props.active ? "white" : "#616568")};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.6rem;

    svg {
        width: 14px;
        height: 14px;
        margin-bottom: 0.15rem;
    }

    &:hover {
        background-color: ${(props) =>
            props.active ? "#e0551c" : "#e9ecef"};
    }

    @media (max-width: 768px) {
        padding: 0.35rem;
        font-size: 0.65rem;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    margin-top: 5px;
    margin-bottom: 10px;
    font-size: 16px;
    font-family: "Aspekta 550", Arial, sans-serif;
    border-radius: 10px;
    border: 2px solid #ccc;
    background-color: #f9f9f9;
    transition: border-color 0.3s, box-shadow 0.3s;
    box-sizing: border-box;
    flex: 1;

    &:focus {
        border-color: #ff6320;
        box-shadow: 0 0 10px rgba(255, 99, 32, 0.5);
        outline: none;
    }

    &:disabled {
        background-color: #e9e9e9;
        cursor: not-allowed;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    flex: 1;
    min-height: 120px;
    padding: 12px;
    margin-top: 5px;
    font-size: 16px;
    font-family: "Aspekta 550", Arial, sans-serif;
    border-radius: 10px;
    border: 2px solid #ccc;
    background-color: #f9f9f9;
    transition: border-color 0.3s, box-shadow 0.3s;
    box-sizing: border-box;
    resize: none;

    &:focus {
        border-color: #ff6320;
        box-shadow: 0 0 10px rgba(255, 99, 32, 0.5);
        outline: none;
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 12px;
    margin-top: 5px;
    font-size: 16px;
    font-family: "Aspekta 550", Arial, sans-serif;
    border-radius: 10px;
    border: 2px solid #ccc;
    background-color: #f9f9f9;
    transition: border-color 0.3s, box-shadow 0.3s;
    box-sizing: border-box;

    &:focus {
        border-color: #ff6320;
        box-shadow: 0 0 10px rgba(255, 99, 32, 0.5);
        outline: none;
    }
`;

const QRCodePreview = styled.div<{ frame: string; shape: string; frameColor: string }>`
    border: 1px solid #ced4da;
    border-radius: 8px;
    padding: 15px;
    background-color: #f8f9fa;
    width: fit-content;
    margin: 8px auto;
    transform: scale(0.9);
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

const CustomizationTabsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
    gap: 0.25rem;
`;

const TabButton = styled.button<{ active: boolean }>`
    background: none;
    border: none;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    font-weight: ${(props) => (props.active ? "bold" : "normal")};
    color: ${(props) => (props.active ? "#ff6320" : "#616568")};
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;

    svg {
        margin-left: 0.25rem;
        transform: ${(props) =>
            props.active ? "rotate(180deg)" : "rotate(0)"};
        transition: transform 0.3s ease;
    }

    &:hover {
        color: #ff6320;
    }

    @media (max-width: 350px) {
        font-size: 0.8rem;
        padding: 0.4rem 0.8rem;
    }
`;

const CustomizerSection = styled.div`
    margin-top: 1rem;
`;

const CustomizerTitle = styled.h3`
    font-size: 0.9rem;
    font-weight: 600;
    color: #616568;
    margin-bottom: 0.5rem;

    @media (min-width: 768px) {
        font-size: 1rem;
    }
`;

const ColorPickerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
    }
`;

const ColorPickerLabel = styled.label`
    display: flex;
    align-items: center;
    font-size: 0.8rem;

    @media (min-width: 768px) {
        font-size: 0.9rem;
    }
`;

const ColorPicker = styled.input`
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    margin-left: 0.5rem;

    &::-webkit-color-swatch-wrapper {
        padding: 0;
    }

    &::-webkit-color-swatch {
        border: none;
        border-radius: 50%;
    }

    @media (min-width: 768px) {
        width: 32px;
        height: 32px;
    }
`;

const CustomSelect = styled.select`
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 0.9rem;
    appearance: none;

    @media (min-width: 768px) {
        font-size: 1rem;
    }
`;

const FrameOption = styled.div<{ active: boolean }>`
    border: 2px solid ${(props) => (props.active ? "#ff6320" : "#ced4da")};
    border-radius: 8px;
    padding: 0.5rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease;

    &:hover {
        border-color: #ff6320;
    }
`;

const FrameLabel = styled.div`
    font-size: 0.8rem;
    text-align: center;
    margin-top: 0.5rem;
`;

const LogoUploadContainer = styled.div`
    margin-top: 1rem;
`;

const LogoUploadLabel = styled.label`
    display: inline-block;
    background-color: #ff6320;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e0551c;
    }
`;

const LogoUploadInput = styled.input`
    display: none;
`;

const MiniPreviewContainer = styled.div<{ frame: string; shape: string; frameColor: string }>`
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
    border-radius: 4px;
    margin-top: ${(props) => (props.frame === "chat" ? "20px" : "0")};
    position: relative;

    & > div {
        transform: scale(1);
    }

    ${(props) =>
        props.frame === "simple" &&
        `
        border: 2px solid ${props.frameColor};
    `}

    ${(props) =>
        props.frame === "rounded" &&
        `
        border: 2px solid ${props.frameColor};
        border-radius: 8px;
    `}

    ${(props) =>
        props.frame === "fancy" &&
        `
        border: 2px solid ${props.frameColor};
        border-radius: 8px;
        box-shadow: 0 0 5px rgba(0,0,0,0.3);
    `}

    ${(props) =>
        props.frame === "chat" &&
        `
        border: 2px solid ${props.frameColor};
        border-radius: 8px;
        
        &::before {
            content: "Scan Me";
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            background: ${props.frameColor};
            color: white;
            padding: 3px 8px;
            border-radius: 8px;
            font-size: 8px;
            white-space: nowrap;
            font-weight: bold;
            box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }

        &::after {
            content: "";
            position: absolute;
            top: -8px;
            left: 50%;
            transform: translateX(-50%);
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 8px solid ${props.frameColor};
        }
    `}

    & > div {
        width: 80% !important;
        height: 80% !important;
    }
`;

const DownloadButton = styled.button`
    width: 160px;
    padding: 8px 0;
    background: #ff6320;
    color: white;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border: none;
    outline: none;
    margin: 0;
    font-family: "Aspekta 400", Arial, sans-serif;
    font-size: 16px;
    transition: background-color 0.3s;

    &:focus {
        outline: none;
    }

    &:hover {
        background: #e0551c;
    }

    svg {
        fill: white;
        margin-right: 8px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;

    @media (max-width: 390px) {
        flex-direction: column;
        gap: 0;
    }

    & > button {
        margin: 0;
    }

    @media (max-width: 390px) {
        & > button:first-child {
            margin-top: 0;
        }
        & > button + button {
            margin-top: 20px;
        }
    }
`;

const IconWrapper = styled.span`
    display: inline-flex;
    align-items: center;
    margin-right: 8px;
`;


const ShapeOption = styled.div<{ active: boolean }>`
    border: 2px solid ${(props) => (props.active ? "#ff6320" : "#ced4da")};
    border-radius: 8px;
    padding: 0.5rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease;

    &:hover {
        border-color: #ff6320;
    }
`;

const ShapePreviewContainer = styled.div`
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
    border-radius: 4px;
    overflow: hidden;
`;

const ShapeExampleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const DotRow = styled.div`
    display: flex;
    gap: 2px;
    justify-content: center;
`;

const Dot = styled.div<{ shape: QRDotType }>`
    width: 12px;
    height: 12px;
    background-color: #000;
    
    ${props => {
        switch (props.shape) {
            case 'dots':
                return 'border-radius: 50%;';
            case 'rounded':
                return 'border-radius: 2px;';
            case 'classy':
                return `
                    transform: rotate(45deg);
                    border-radius: 1px;
                `;
            case 'classy-rounded':
                return `
                    transform: rotate(45deg);
                    border-radius: 2px;
                `;
            case 'extra-rounded':
                return 'border-radius: 4px;';
            default: // square
                return 'border-radius: 0;';
        }
    }}
`;

const ShapeLabel = styled.div`
    font-size: 0.8rem;
    text-align: center;
    margin-top: 0.5rem;
`;

const GridContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
`;

const PaginationArrow = styled.button<{ disabled?: boolean }>`
    background: ${props => props.disabled ? '#f0f0f0' : '#fff'};
    border: 2px solid ${props => props.disabled ? '#e0e0e0' : '#ff6320'};
    border-radius: 50%;
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    color: ${props => props.disabled ? '#ccc' : '#ff6320'};
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    width: 40px;
    height: 40px

    &:hover:not(:disabled) {
        background: #ff6320;
        color: white;
        transform: scale(1.1);
    }

    &:active:not(:disabled) {
        transform: scale(0.95);
    }
`;

const BaseGrid = styled.div<{ itemCount: number }>`
    display: grid;
    grid-template-columns: ${props => 
        props.itemCount <= 4 
            ? `repeat(${props.itemCount}, 1fr)` 
            : 'repeat(4, 1fr)'
    };
    gap: 1rem;
    width: ${props => props.itemCount < 4 ? 'auto' : '100%'};
    max-width: 600px;
    justify-content: center;
`;

const FrameGrid = styled(BaseGrid)``;
const ShapeGrid = styled(BaseGrid)``;
const MarkerGrid = styled(BaseGrid)``;

const MarkerOption = styled.div<{ active: boolean }>`
    border: 2px solid ${(props) => (props.active ? "#ff6320" : "#ced4da")};
    border-radius: 8px;
    padding: 0.5rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease;

    &:hover {
        border-color: #ff6320;
    }
`;

const MarkerPreviewContainer = styled.div`
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
    border-radius: 4px;
    overflow: hidden;
`;

const MarkerLabel = styled.div`
    font-size: 0.8rem;
    text-align: center;
    margin-top: 0.5rem;
`;

const MarkerExampleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const MarkerOuter = styled.div<{ styleType: CornerSquareType }>`
    width: 42px;
    height: 42px;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    
    ${props => {
        switch (props.styleType) {
            case 'dot':
                return 'border-radius: 50%;';
            case 'extra-rounded':
                return 'border-radius: 15px;';
            default: // square
                return 'border-radius: 0;';
        }
    }}
`;

const MarkerInner = styled.div<{ styleType: CornerSquareType }>`
    width: 26px;
    height: 26px;
    background-color: #f8f9fa;
    
    ${props => {
        switch (props.styleType) {
            case 'dot':
                return 'border-radius: 50%;';
            case 'extra-rounded':
                return 'border-radius: 8px;';
            default: // square
                return 'border-radius: 0;';
        }
    }}
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

const DigitalProductSection = styled.div`
    margin-top: 20px;
    padding: 20px;
    background-color: #ff6320;
    border-radius: 8px;
    color: white;
    text-align: center;
`;

const DigitalProductTitle = styled.h3`
    font-size: 1.2rem;
    margin-bottom: 10px;
`;

const DigitalProductDescription = styled.p`
    font-size: 1rem;
    margin-bottom: 15px;
`;

const ExploreButton = styled.a`
    display: inline-block;
    padding: 10px 20px;
    background-color: white;
    color: #ff6320;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const LogoGrid = styled(BaseGrid)``;

const LogoOption = styled.div<{ active: boolean }>`
    border: 2px solid ${(props) => (props.active ? "#ff6320" : "#ced4da")};
    border-radius: 8px;
    padding: 0.5rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease;

    &:hover {
        border-color: #ff6320;
    }
`;

const LogoPreviewContainer = styled.div`
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
    border-radius: 4px;
`;

const CustomUploadBox = styled.div`
    width: 40px;
    height: 40px;
    border: 2px dashed #ccc;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666;
`;

const StackedText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
    font-size: 12px;
    line-height: 1.2;
    color: #333;
`;

const OpenBoxContainer = styled.div`
    position: relative;
    width: 50px;
    height: 30px;
    border: 2px solid #333;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 8px;

    &::before, &::after {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        background: #f8f9fa;
        top: 50%;
        transform: translateY(-50%);
    }

    &::before {
        left: -2px;
    }

    &::after {
        right: -2px;
    }

    span::before, span::after {
        content: '';
        position: absolute;
        height: 8px;
        width: 8px;
        background: #f8f9fa;
        left: 50%;
        transform: translateX(-50%);
    }

    span::before {
        top: -2px;
    }

    span::after {
        bottom: -2px;
    }
`;

const OpenBoxText = styled.span`
    font-size: 8px;
    font-weight: bold;
    color: #333;
`;

const ClosedBoxContainer = styled.div`
    width: 50px;
    height: 30px;
    border: 2px solid #333;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 8px;
`;

const ClosedBoxText = styled.span`
    font-size: 8px;
    font-weight: bold;
    color: #333;
`;

const LogoLabel = styled.div`
    font-size: 0.8rem;
    text-align: center;
    margin-top: 0.5rem;
`;

const FormContainer = styled.div`
    flex: 1;
    min-height: 200px;
    display: flex;
    flex-direction: column;
`;

