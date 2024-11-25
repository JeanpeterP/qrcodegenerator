import React, { useState } from 'react';
import styled from 'styled-components';
import { QRData } from '../types/qr';
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
    Upload,
} from "lucide-react";

// SVG Icon Components (UpArrowIcon and DownArrowIcon)
const UpArrowIcon = () => (
    <ArrowIcon>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#333333"
            viewBox="0 0 256 256"
        >
            <path d="M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z"></path>
        </svg>
    </ArrowIcon>
);

const DownArrowIcon = () => (
    <ArrowIcon>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#333333"
            viewBox="0 0 256 256"
        >
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
    </ArrowIcon>
);

// Add this function before the QRCodeForm component
const shouldShowPhonePreview = (qrType: string): boolean => {
    return ['file', 'multiplink'].includes(qrType);
};

interface QRCodeFormProps {
    qrType: keyof QRData;
    qrData: QRData;
    handleInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        nestedKey?: keyof QRData | null,
        index?: number,
        field?: string
    ) => void;
    placeholder: string;
    handleAddLink?: () => void;
}

export const QRCodeForm: React.FC<QRCodeFormProps> = ({
    qrType,
    qrData,
    handleInputChange,
    placeholder,
    handleAddLink,
}) => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>('qrData');

    // Function to toggle dropdowns, ensuring only one is open at a time
    const toggleDropdown = (dropdownName: string) => {
        setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    };

    // Function to extract YouTube video ID
    const extractYouTubeVideoId = (url: string) => {
        const regex = /[?&]v=([^&#]*)/;
        const match = regex.exec(url);
        return match && match[1] ? match[1] : '';
    };

    // Function to format and handle URL
    const formatAndHandleUrl = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const url = e.target.value;
        const formattedUrl =
            url.startsWith('http://') || url.startsWith('https://')
                ? url
                : `https://${url}`;
        handleInputChange(
            {
                target: { name: e.target.name, value: formattedUrl },
            } as React.ChangeEvent<HTMLInputElement>,
            'contentData',
            index,
            'url'
        );
    };

    return (
        <FormContainer>
            {/* QR Code Data Inputs */}
            <DropdownContainer>
                <DropdownHeader onClick={() => toggleDropdown('qrData')}>
                    Enter QR Code Data
                    {activeDropdown === 'qrData' ? <UpArrowIcon /> : <DownArrowIcon />}
                </DropdownHeader>
                {activeDropdown === 'qrData' && (
                    <DropdownContent>
                        {(() => {
                            switch (qrType) {
                                case 'url':
                                    return (
                                        <Input
                                            type="text"
                                            name="url"
                                            value={qrData.url}
                                            onChange={handleInputChange}
                                            placeholder={placeholder}
                                        />
                                    );
                                case 'email':
                                    return (
                                        <>
                                            <Input
                                                type="email"
                                                name="address"
                                                value={qrData.email.address}
                                                onChange={(e) => handleInputChange(e, 'email')}
                                                placeholder="Email Address"
                                            />
                                            <Input
                                                type="text"
                                                name="subject"
                                                value={qrData.email.subject}
                                                onChange={(e) => handleInputChange(e, 'email')}
                                                placeholder="Subject"
                                            />
                                            <TextArea
                                                name="message"
                                                value={qrData.email.message}
                                                onChange={(e) => handleInputChange(e, 'email')}
                                                placeholder="Message"
                                                rows={4}
                                            />
                                        </>
                                    );
                                case 'vcard':
                                    return (
                                        <>
                                            <Input
                                                type="text"
                                                name="name"
                                                value={qrData.vcard.name}
                                                onChange={(e) => handleInputChange(e, 'vcard')}
                                                placeholder="Full Name"
                                            />
                                            <Input
                                                type="text"
                                                name="phone"
                                                value={qrData.vcard.phone}
                                                onChange={(e) => handleInputChange(e, 'vcard')}
                                                placeholder="Phone Number"
                                            />
                                            <Input
                                                type="text"
                                                name="company"
                                                value={qrData.vcard.company}
                                                onChange={(e) => handleInputChange(e, 'vcard')}
                                                placeholder="Company"
                                            />
                                            <TextArea
                                                name="address"
                                                value={qrData.vcard.address}
                                                onChange={(e) => handleInputChange(e, 'vcard')}
                                                placeholder="Address"
                                                rows={3}
                                            />
                                        </>
                                    );
                                case 'wifi':
                                    return (
                                        <>
                                            <Input
                                                type="text"
                                                name="ssid"
                                                value={qrData.wifi.ssid}
                                                onChange={(e) => handleInputChange(e, 'wifi')}
                                                placeholder="WiFi SSID"
                                            />
                                            <Input
                                                type="password"
                                                name="password"
                                                value={qrData.wifi.password}
                                                onChange={(e) => handleInputChange(e, 'wifi')}
                                                placeholder="WiFi Password"
                                            />
                                            <Select
                                                name="security"
                                                value={qrData.wifi.security}
                                                onChange={(e) => handleInputChange(e, 'wifi')}
                                            >
                                                <option value="WEP">WEP</option>
                                                <option value="WPA">WPA/WPA2</option>
                                                <option value="nopass">No Pass</option>
                                            </Select>
                                        </>
                                    );
                                case 'text':
                                    return (
                                        <TextArea
                                            name="text"
                                            value={qrData.text}
                                            onChange={handleInputChange}
                                            placeholder="Enter Text"
                                            rows={6}
                                        />
                                    );
                                case 'whatsapp':
                                    return (
                                        <>
                                            <Input
                                                type="text"
                                                name="number"
                                                value={qrData.whatsapp.number}
                                                onChange={(e) => handleInputChange(e, 'whatsapp')}
                                                placeholder="WhatsApp Number (with country code)"
                                            />
                                            <TextArea
                                                name="message"
                                                value={qrData.whatsapp.message}
                                                onChange={(e) => handleInputChange(e, 'whatsapp')}
                                                placeholder="Message"
                                                rows={4}
                                            />
                                        </>
                                    );
                                case 'sms':
                                    return (
                                        <>
                                            <Input
                                                type="text"
                                                name="number"
                                                value={qrData.sms.number}
                                                onChange={(e) => handleInputChange(e, 'sms')}
                                                placeholder="Phone Number"
                                            />
                                            <TextArea
                                                name="message"
                                                value={qrData.sms.message}
                                                onChange={(e) => handleInputChange(e, 'sms')}
                                                placeholder="Message"
                                                rows={4}
                                            />
                                        </>
                                    );
                                case 'twitter':
                                    return (
                                        <>
                                            <Input
                                                type="text"
                                                name="username"
                                                value={qrData.twitter.username}
                                                onChange={(e) => handleInputChange(e, 'twitter')}
                                                placeholder="Twitter Username"
                                            />
                                            <TextArea
                                                name="tweet"
                                                value={qrData.twitter.tweet}
                                                onChange={(e) => handleInputChange(e, 'twitter')}
                                                placeholder="Tweet Text"
                                                rows={4}
                                            />
                                        </>
                                    );
                                case 'facebook':
                                    return (
                                        <Input
                                            type="text"
                                            name="url"
                                            value={qrData.facebook.url}
                                            onChange={(e) => handleInputChange(e, 'facebook')}
                                            placeholder="Facebook URL"
                                        />
                                    );
                                case 'pdf':
                                    return (
                                        <Input
                                            type="text"
                                            name="url"
                                            value={qrData.pdf.url}
                                            onChange={(e) => handleInputChange(e, 'pdf')}
                                            placeholder="PDF URL"
                                        />
                                    );
                                case 'mp3':
                                    return (
                                        <Input
                                            type="text"
                                            name="url"
                                            value={qrData.mp3.url}
                                            onChange={(e) => handleInputChange(e, 'mp3')}
                                            placeholder="MP3 URL"
                                        />
                                    );
                                case 'app':
                                    return (
                                        <Input
                                            type="text"
                                            name="url"
                                            value={qrData.app.url}
                                            onChange={(e) => handleInputChange(e, 'app')}
                                            placeholder="App Store URL"
                                        />
                                    );
                                case 'image':
                                    return (
                                        <Input
                                            type="text"
                                            name="url"
                                            value={qrData.image.url}
                                            onChange={(e) => handleInputChange(e, 'image')}
                                            placeholder="Image URL"
                                        />
                                    );
                                case 'file':
                                    return (
                                        <FormGroup>
                                            <FileUploadLabel>Upload File</FileUploadLabel>
                                            <FileInput
                                                type="file"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        handleInputChange({
                                                            target: {
                                                                value: file,
                                                                name: 'fileData'
                                                            }
                                                        } as any, 'file');
                                                    }
                                                }}
                                            />
                                            <Input
                                                type="text"
                                                placeholder="Title"
                                                value={qrData.file.title}
                                                onChange={(e) => handleInputChange(e, 'file')}
                                                name="title"
                                                required
                                            />
                                            <TextArea
                                                placeholder="Description"
                                                value={qrData.file.description}
                                                onChange={(e) => handleInputChange(e, 'file')}
                                                name="description"
                                            />
                                            <Input
                                                type="text"
                                                placeholder="Button Text"
                                                value={qrData.file.buttonText}
                                                onChange={(e) => handleInputChange(e, 'file')}
                                                name="buttonText"
                                            />
                                            <ColorPickerLabel>
                                                Button Color:
                                                <ColorPicker
                                                    type="color"
                                                    value={qrData.file.buttonColor}
                                                    onChange={(e) => handleInputChange(e, 'file')}
                                                    name="buttonColor"
                                                />
                                            </ColorPickerLabel>
                                        </FormGroup>
                                    );
                                case 'multiplink':
                                    return (
                                        <>
                                            <Input
                                                type="text"
                                                name="title"
                                                value={qrData.contentData.title || ''}
                                                onChange={(e) => handleInputChange(e, 'contentData')}
                                                placeholder="Multiplink Title"
                                            />
                                            {/* First Link - Required */}
                                            <LinkContainer>
                                                <RequiredLabel>Required</RequiredLabel>
                                                <Input
                                                    type="text"
                                                    name="linkLabel0"
                                                    value={qrData.contentData.links[0]?.label || ''}
                                                    onChange={(e) => handleInputChange(e, 'contentData', 0, 'label')}
                                                    placeholder="Link 1 Label"
                                                    required
                                                />
                                                <Input
                                                    type="url"
                                                    name="linkUrl0"
                                                    value={qrData.contentData.links[0]?.url || ''}
                                                    onChange={(e) => formatAndHandleUrl(e, 0)}
                                                    placeholder="Link 1 URL"
                                                    required
                                                />
                                            </LinkContainer>
                                            {/* Second Link - Optional */}
                                            <LinkContainer>
                                                <Input
                                                    type="text"
                                                    name="linkLabel1"
                                                    value={qrData.contentData.links[1]?.label || ''}
                                                    onChange={(e) => handleInputChange(e, 'contentData', 1, 'label')}
                                                    placeholder="Link 2 Label (Optional)"
                                                />
                                                <Input
                                                    type="url"
                                                    name="linkUrl1"
                                                    value={qrData.contentData.links[1]?.url || ''}
                                                    onChange={(e) => formatAndHandleUrl(e, 1)}
                                                    placeholder="Link 2 URL (Optional)"
                                                />
                                            </LinkContainer>
                                            {/* Third Link - Optional */}
                                            <LinkContainer>
                                                <Input
                                                    type="text"
                                                    name="linkLabel2"
                                                    value={qrData.contentData.links[2]?.label || ''}
                                                    onChange={(e) => handleInputChange(e, 'contentData', 2, 'label')}
                                                    placeholder="Link 3 Label (Optional)"
                                                />
                                                <Input
                                                    type="url"
                                                    name="linkUrl2"
                                                    value={qrData.contentData.links[2]?.url || ''}
                                                    onChange={(e) => formatAndHandleUrl(e, 2)}
                                                    placeholder="Link 3 URL (Optional)"
                                                />
                                            </LinkContainer>
                                            {/* Additional Links */}
                                            {qrData.contentData.links.slice(3).map((link, index) => (
                                                <LinkContainer key={index + 3}>
                                                    <Input
                                                        type="text"
                                                        name={`linkLabel${index + 3}`}
                                                        value={link.label}
                                                        onChange={(e) => handleInputChange(e, 'contentData', index + 3, 'label')}
                                                        placeholder={`Link ${index + 4} Label`}
                                                    />
                                                    <Input
                                                        type="url"
                                                        name={`linkUrl${index + 3}`}
                                                        value={link.url}
                                                        onChange={(e) => formatAndHandleUrl(e, index + 3)}
                                                        placeholder={`Link ${index + 4} URL`}
                                                    />
                                                </LinkContainer>
                                            ))}
                                            {qrData.contentData.links.length < 10 && (
                                                <AddLinkButton onClick={handleAddLink}>
                                                    Add Another Link
                                                </AddLinkButton>
                                            )}
                                        </>
                                    );
                                case 'youtube':
                                    return (
                                        <FormContainer>
                                            <Input
                                                type="text"
                                                name="url"
                                                value={qrData.youtube.url}
                                                onChange={(e) => {
                                                    const videoId = extractYouTubeVideoId(e.target.value);
                                                    handleInputChange({
                                                        target: { name: 'url', value: videoId }
                                                    } as React.ChangeEvent<HTMLInputElement>, "youtube");
                                                }}
                                                placeholder="Enter full YouTube URL (e.g., https://www.youtube.com/watch?v=...)"
                                            />
                                        </FormContainer>
                                    );
                                default:
                                    return null;
                            }
                        })()}
                    </DropdownContent>
                )}
            </DropdownContainer>

            {/* Design Options */}
            <DropdownContainer>
                <DropdownHeader 
                    onClick={() => shouldShowPhonePreview(qrType) ? toggleDropdown('designOptions') : null}
                    disabled={!shouldShowPhonePreview(qrType)}
                >
                    Design Options
                    {activeDropdown === 'designOptions' ? <UpArrowIcon /> : <DownArrowIcon />}
                </DropdownHeader>
                {activeDropdown === 'designOptions' && shouldShowPhonePreview(qrType) && (
                    <DropdownContent>
                        {/* Design options content */}
                    </DropdownContent>
                )}
            </DropdownContainer>
        </FormContainer>
    );
};

// Styled Components
const FormContainer = styled.div`
    flex: 1;
    min-height: 200px;
    display: flex;
    flex-direction: column;
`;

// Dropdown Styled Components
const DropdownContainer = styled.div`
    margin-bottom: 10px;
`;

const DropdownHeader = styled.div<{ disabled?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    font-size: 16px;
    font-family: 'Aspekta 550', Arial, sans-serif;
    background-color: ${props => props.disabled ? '#f0f0f0' : '#f9f9f9'};
    border: 2px solid #ccc;
    border-radius: 10px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.disabled ? 0.5 : 1};

    &:hover {
        border-color: #ff6320;
    }
`;

const DropdownContent = styled.div`
    padding: 10px;
    border: 2px solid #ccc;
    border-top: none;
    border-radius: 0 0 10px 10px;
    background-color: #fff;
`;

// Existing Styled Components (Input, TextArea, Select, etc.)
const Input = styled.input`
    width: 100%;
    padding: 12px;
    margin-top: 5px;
    margin-bottom: 10px;
    font-size: 16px;
    font-family: 'Aspekta 550', Arial, sans-serif;
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
    font-family: 'Aspekta 550', Arial, sans-serif;
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
    font-family: 'Aspekta 550', Arial, sans-serif;
    border-radius: 10px;
    border: 2px solid #ccc;
    background-color: #f9f9f9;
    transition: border-color 0.3s, box-shadow 0.3s;
    box-sizing: border-box;
    appearance: none;
    background-image: url('data:image/svg+xml;charset=US-ASCII,<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="%23333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    background-repeat: no-repeat;
    background-position: right 12px top 50%;

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

const ArrowIcon = styled.span`
    margin-left: 5px;
    display: inline-flex;
    align-items: center;

    svg {
        width: 16px;
        height: 16px;
        fill: #333333;
    }
`;

// Styled Components for File Upload
const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

const FileUploadLabel = styled.label`
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
`;

const FileInput = styled.input`
    margin-top: 5px;
`;

const ColorPickerLabel = styled.label`
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    margin-top: 10px;
`;

const ColorPicker = styled.input`
    margin-left: 0.5rem;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const AddLinkButton = styled.button`
    background: #ff6320;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 20px;
    font-size: 16px;
    font-family: "Aspekta 550", Arial, sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
    width: 100%;

    &:hover {
        background: #e55a1d;
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`;

const LinkContainer = styled.div`
    position: relative;
    margin-bottom: 20px;
    padding: 15px;
    border: 2px solid #eee;
    border-radius: 10px;
    background: #f9f9f9;

    &:first-of-type {
        border-color: #ff6320;
        background: #fff;
    }
`;

const RequiredLabel = styled.span`
    color: #ff6320;
    font-size: 12px;
    position: absolute;
    top: -10px;
    right: 10px;
    background: white;
    padding: 0 5px;
`;

// Add these styled components at the bottom with the other styled components
const TabContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    max-height: 300px;
    overflow-y: auto;

    @media (max-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 350px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const Tab = styled.button<{ active: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    background-color: ${(props) => (props.active ? "#ff6320" : "#f8f9fa")};
    color: ${(props) => (props.active ? "white" : "#616568")};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.75rem;
    width: 100%;

    svg {
        width: 16px;
        height: 16px;
        margin-bottom: 0.25rem;
    }

    &:hover {
        background-color: ${(props) =>
            props.active ? "#e0551c" : "#e9ecef"};
    }
`;
  