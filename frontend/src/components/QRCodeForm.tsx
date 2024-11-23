import React from 'react';
import styled from 'styled-components';

// Add this interface near the top of the file
interface QRData {
    url: string;
    email: {
        address: string;
        subject: string;
        message: string;
    };
    vcard: {
        name: string;
        phone: string;
        company: string;
        address: string;
    };
    wifi: {
        ssid: string;
        password: string;
        security: string;
    };
    text: string;
    whatsapp: {
        number: string;
        message: string;
    };
    sms: {
        number: string;
        message: string;
    };
    twitter: {
        username: string;
        tweet: string;
    };
    facebook: {
        url: string;
    };
    pdf: {
        url: string;
    };
    mp3: {
        url: string;
    };
    app: {
        url: string;
    };
    image: {
        url: string;
    };
    file: {
        fileData: File | null;
        title: string;
        description: string;
        buttonText: string;
        buttonColor: string;
    };
}

interface QRCodeFormProps {
    qrType: keyof QRData;
    qrData: QRData;
    handleInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        nestedKey?: keyof QRData | null
    ) => void;
    placeholder: string;
}

export const QRCodeForm: React.FC<QRCodeFormProps> = ({ qrType, qrData, handleInputChange, placeholder }) => {
    return (
        <FormContainer>
            {(() => {
                switch (qrType) {
                    case "url":
                        return (
                            <Input
                                type="text"
                                name="url"
                                value={qrData.url}
                                onChange={handleInputChange}
                                placeholder={placeholder}
                            />
                        );
                    case "email":
                        return (
                            <>
                                <Input
                                    type="email"
                                    name="address"
                                    value={qrData.email.address}
                                    onChange={(e) => handleInputChange(e, "email")}
                                    placeholder="Email Address"
                                />
                                <Input
                                    type="text"
                                    name="subject"
                                    value={qrData.email.subject}
                                    onChange={(e) => handleInputChange(e, "email")}
                                    placeholder="Subject"
                                />
                                <TextArea
                                    name="message"
                                    value={qrData.email.message}
                                    onChange={(e) => handleInputChange(e, "email")}
                                    placeholder="Message"
                                    rows={4}
                                />
                            </>
                        );
                    case "vcard":
                        return (
                            <>
                                <Input
                                    type="text"
                                    name="name"
                                    value={qrData.vcard.name}
                                    onChange={(e) => handleInputChange(e, "vcard")}
                                    placeholder="Full Name"
                                />
                                <Input
                                    type="text"
                                    name="phone"
                                    value={qrData.vcard.phone}
                                    onChange={(e) => handleInputChange(e, "vcard")}
                                    placeholder="Phone Number"
                                />
                                <Input
                                    type="text"
                                    name="company"
                                    value={qrData.vcard.company}
                                    onChange={(e) => handleInputChange(e, "vcard")}
                                    placeholder="Company"
                                />
                                <TextArea
                                    name="address"
                                    value={qrData.vcard.address}
                                    onChange={(e) => handleInputChange(e, "vcard")}
                                    placeholder="Address"
                                    rows={3}
                                />
                            </>
                        );
                    case "wifi":
                        return (
                            <>
                                <Input
                                    type="text"
                                    name="ssid"
                                    value={qrData.wifi.ssid}
                                    onChange={(e) => handleInputChange(e, "wifi")}
                                    placeholder="WiFi SSID"
                                />
                                <Input
                                    type="password"
                                    name="password"
                                    value={qrData.wifi.password}
                                    onChange={(e) => handleInputChange(e, "wifi")}
                                    placeholder="WiFi Password"
                                />
                                <Select
                                    name="security"
                                    value={qrData.wifi.security}
                                    onChange={(e) => handleInputChange(e, "wifi")}
                                >
                                    <option value="WEP">WEP</option>
                                    <option value="WPA">WPA/WPA2</option>
                                    <option value="nopass">No Pass</option>
                                </Select>
                            </>
                        );
                    case "text":
                        return (
                            <TextArea
                                name="text"
                                value={qrData.text}
                                onChange={handleInputChange}
                                placeholder="Enter Text"
                                rows={6}
                            />
                        );
                    case "whatsapp":
                        return (
                            <>
                                <Input
                                    type="text"
                                    name="number"
                                    value={qrData.whatsapp.number}
                                    onChange={(e) => handleInputChange(e, "whatsapp")}
                                    placeholder="WhatsApp Number (with country code)"
                                />
                                <TextArea
                                    name="message"
                                    value={qrData.whatsapp.message}
                                    onChange={(e) => handleInputChange(e, "whatsapp")}
                                    placeholder="Message"
                                    rows={4}
                                />
                            </>
                        );
                    case "sms":
                        return (
                            <>
                                <Input
                                    type="text"
                                    name="number"
                                    value={qrData.sms.number}
                                    onChange={(e) => handleInputChange(e, "sms")}
                                    placeholder="Phone Number"
                                />
                                <TextArea
                                    name="message"
                                    value={qrData.sms.message}
                                    onChange={(e) => handleInputChange(e, "sms")}
                                    placeholder="Message"
                                    rows={4}
                                />
                            </>
                        );
                    case "twitter":
                        return (
                            <>
                                <Input
                                    type="text"
                                    name="username"
                                    value={qrData.twitter.username}
                                    onChange={(e) => handleInputChange(e, "twitter")}
                                    placeholder="Twitter Username"
                                />
                                <TextArea
                                    name="tweet"
                                    value={qrData.twitter.tweet}
                                    onChange={(e) => handleInputChange(e, "twitter")}
                                    placeholder="Tweet Text"
                                    rows={4}
                                />
                            </>
                        );
                    case "facebook":
                        return (
                            <Input
                                type="text"
                                name="url"
                                value={qrData.facebook.url}
                                onChange={(e) => handleInputChange(e, "facebook")}
                                placeholder="Facebook URL"
                            />
                        );
                    case "pdf":
                        return (
                            <Input
                                type="text"
                                name="url"
                                value={qrData.pdf.url}
                                onChange={(e) => handleInputChange(e, "pdf")}
                                placeholder="PDF URL"
                            />
                        );
                    case "mp3":
                        return (
                            <Input
                                type="text"
                                name="url"
                                value={qrData.mp3.url}
                                onChange={(e) => handleInputChange(e, "mp3")}
                                placeholder="MP3 URL"
                            />
                        );
                    case "app":
                        return (
                            <Input
                                type="text"
                                name="url"
                                value={qrData.app.url}
                                onChange={(e) => handleInputChange(e, "app")}
                                placeholder="App Store URL"
                            />
                        );
                    case "image":
                        return (
                            <Input
                                type="text"
                                name="url"
                                value={qrData.image.url}
                                onChange={(e) => handleInputChange(e, "image")}
                                placeholder="Image URL"
                            />
                        );
                    case "file":
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
                    default:
                        return null;
                }
            })()}
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
  