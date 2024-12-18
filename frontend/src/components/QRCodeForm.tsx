import React, { useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { QRData } from "../types/qr";
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
import { HandleInputChangeFunction } from "./QRCodeGenerator";
import { CustomizationTabs } from "./CustomizationTabs";
import { CornerSquareType } from "qr-code-styling";
import { DynamicBioCustomizationTabs } from "./DynamicBioCustomizationTabs";
import { FileUploadSection } from "./FileUploadSection";
import { InfoTooltip } from "./common/InfoTooltip";
import { ToggleSwitch } from "./common/ToggleSwitch";
import { Input } from "./common/FormElements";

// Update the LogoType definition
type LogoType = {
  type: "stacked" | "open-box" | "closed-box" | "custom";
  src: string | null;
  width?: number;
  height?: number;
} | null;

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
  return ["file", "multiplink"].includes(qrType);
};

export interface QRCodeFormProps {
  qrType: keyof QRData;
  qrData: QRData;
  handleInputChange: HandleInputChangeFunction;
  placeholder: string;
  handleAddLink?: () => void;
  userChoice: "qr" | "dynamicBio" | null;
}

type DotType =
  | "square"
  | "dots"
  | "rounded"
  | "classy"
  | "extra-rounded"
  | "classy-rounded";

// Add this interface before the QRCodeForm component
interface CustomizationTabsProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  frame: string;
  setFrame: Dispatch<SetStateAction<string>>;
  frameColor: string;
  setFrameColor: Dispatch<SetStateAction<string>>;
  shape: DotType;
  setShape: Dispatch<SetStateAction<DotType>>;
  qrColor: string;
  setQRColor: Dispatch<SetStateAction<string>>;
  qrBackground: string;
  setQRBackground: Dispatch<SetStateAction<string>>;
  logo: LogoType;
  setLogo: Dispatch<SetStateAction<LogoType>>;
  logoSize: number;
  setLogoSize: Dispatch<SetStateAction<number>>;
  gradient: boolean;
  setGradient: Dispatch<SetStateAction<boolean>>;
  gradientColor1: string;
  setGradientColor1: Dispatch<SetStateAction<string>>;
  gradientColor2: string;
  setGradientColor2: Dispatch<SetStateAction<string>>;
  gradientType: string;
  setGradientType: Dispatch<SetStateAction<string>>;
  gradientRotation: number;
  setGradientRotation: Dispatch<SetStateAction<number>>;
  cornerDots: string;
  setCornerDots: Dispatch<SetStateAction<string>>;
  cornerSquares: string;
  setCornerSquares: Dispatch<SetStateAction<string>>;
  markerStyle: CornerSquareType;
  setMarkerStyle: Dispatch<SetStateAction<string>>;
  markerColor: string;
  setMarkerColor: Dispatch<SetStateAction<string>>;
  currentFramePage: number;
  setCurrentFramePage: Dispatch<SetStateAction<number>>;
  currentShapePage: number;
  setCurrentShapePage: Dispatch<SetStateAction<number>>;
  customLogo: string | null;
  setCustomLogo: Dispatch<SetStateAction<string | null>>;
}

// Add this function before your component definition
const formatAndHandleUrl = (
  e: React.ChangeEvent<HTMLInputElement>,
  index: number,
  handleInputChange: HandleInputChangeFunction
) => {
  let url = e.target.value;

  // If URL doesn't start with http:// or https://, add https://
  if (url && !url.match(/^https?:\/\//i)) {
    url = `https://${url}`;
  }

  // Create a synthetic event with the formatted URL
  const syntheticEvent = {
    target: {
      name: e.target.name,
      value: url,
    },
  } as React.ChangeEvent<HTMLInputElement>;

  // Call the original handleInputChange with the formatted URL
  handleInputChange(syntheticEvent, "contentData", index, "url");
};

// Add this function before your component definition
const extractYouTubeVideoId = (url: string): string => {
  // Handle different YouTube URL formats
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/i, // Standard URL
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^/?]+)/i, // Embed URL
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^/?]+)/i, // Short URL
    /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return url; // Return original input if no valid YouTube URL pattern is found
};

// Add styled components for FieldContainer and Label
const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 18px; /* Adjust font size as needed */
  font-weight: bold;
  font-family: "Aspekta 550", Arial, sans-serif;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #1b294b;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const QRCodeForm: React.FC<QRCodeFormProps> = ({
  qrType,
  qrData,
  handleInputChange,
  placeholder,
  handleAddLink,
  userChoice,
}) => {
  const [useUpperCase, setUseUpperCase] = useState(false);


  return (
    <FormContainer>
            <SectionTitle>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><rect x="16" y="104" width="48" height="48" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><rect x="152" y="40" width="64" height="64" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><rect x="152" y="152" width="64" height="64" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><line x1="64" y1="128" x2="112" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><path d="M152,184H128a16,16,0,0,1-16-16V88a16,16,0,0,1,16-16h24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/></svg>
        Configure QR Data: {qrType}
      </SectionTitle>
      {/* <FieldContainer>
                <Label>
                    Include Uppercase Letters
                    <InfoTooltip explanation="Toggle to include uppercase letters in your code." />
                </Label>
                <ToggleSwitch
                    checked={useUpperCase}
                    onChange={setUseUpperCase}
                />
            </FieldContainer> */}
      {(() => {
        switch (qrType) {
          case "url":
            return (
              <Form>
              <Label>
                Action URL:
                <Input
                  type="text"
                  name="actionUrl"
                  value={qrData.url?.actionUrl || ''}
                  onChange={(e) => handleInputChange(e, 'url')}
                  placeholder="Enter the URL to navigate to"
                  required
                />
              </Label>
              <Label>
                Title:
                <Input
                  type="text"
                  name="title"
                  value={qrData.url?.title || ''}
                  onChange={(e) => handleInputChange(e, 'url')}
                  placeholder="Enter title"
                />
              </Label>
              <Label>
                Description:
                <TextArea
                  name="description"
                  value={qrData.url?.description || ''}
                  onChange={(e) => handleInputChange(e, 'url')}
                  placeholder="Enter description"
                />
              </Label>
              <URLBannerUploadField 
                qrData={qrData} 
                handleInputChange={handleInputChange} 
              />
              <Label>
                Button Text:
                <Input
                  type="text"
                  name="buttonText"
                  value={qrData.url?.buttonText || ''}
                  onChange={(e) => handleInputChange(e, 'url')}
                  placeholder="Enter button text"
                />
              </Label>
              <Label>
                Button Color:
                <Input
                  type="color"
                  name="buttonColor"
                  value={qrData.url?.buttonColor || '#ff6320'}
                  onChange={(e) => handleInputChange(e, 'url')}
                />
              </Label>
            </Form>
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
                {/* <FileUploadLabel>Upload File</FileUploadLabel>
                <FileInput
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleInputChange(
                        {
                          target: {
                            value: file,
                            name: "fileData",
                          },
                        } as any,
                        "file"
                      );
                    }
                  }}
                /> */}
                <FileUploadSection
                  qrData={qrData}
                  handleInputChange={handleInputChange}
                />
                <Input
                  type="text"
                  placeholder="Title"
                  value={qrData.file.title}
                  onChange={(e) => handleInputChange(e, "file")}
                  name="title"
                  required
                />
                <TextArea
                  placeholder="Description"
                  value={qrData.file.description}
                  onChange={(e) => handleInputChange(e, "file")}
                  name="description"
                />
              </FormGroup>
            );
          case "multiplink":
            return (
              <>
                <Input
                  type="text"
                  name="title"
                  value={qrData.contentData.title || ""}
                  onChange={(e) => handleInputChange(e, "contentData")}
                  placeholder="Multiplink Title"
                />
                {/* First Link - Required */}
                <LinkContainer>
                  <RequiredLabel>Required</RequiredLabel>
                  <Input
                    type="text"
                    name="linkLabel0"
                    value={qrData.contentData.links[0]?.label || ""}
                    onChange={(e) =>
                      handleInputChange(e, "contentData", 0, "label")
                    }
                    placeholder="Link 1 Label"
                    required
                  />
                  <Input
                    type="url"
                    name="linkUrl0"
                    value={qrData.contentData.links[0]?.url || ""}
                    onChange={(e) =>
                      formatAndHandleUrl(e, 0, handleInputChange)
                    }
                    placeholder="Link 1 URL"
                    required
                  />
                </LinkContainer>
                Second Link - Optional
                <LinkContainer>
                  <Input
                    type="text"
                    name="linkLabel1"
                    value={qrData.contentData.links[1]?.label || ""}
                    onChange={(e) =>
                      handleInputChange(e, "contentData", 1, "label")
                    }
                    placeholder="Link 2 Label (Optional)"
                  />
                  <Input
                    type="url"
                    name="linkUrl1"
                    value={qrData.contentData.links[1]?.url || ""}
                    onChange={(e) =>
                      formatAndHandleUrl(e, 1, handleInputChange)
                    }
                    placeholder="Link 2 URL (Optional)"
                  />
                </LinkContainer>
                {/* Third Link - Optional */}
                <LinkContainer>
                  <Input
                    type="text"
                    name="linkLabel2"
                    value={qrData.contentData.links[2]?.label || ""}
                    onChange={(e) =>
                      handleInputChange(e, "contentData", 2, "label")
                    }
                    placeholder="Link 3 Label (Optional)"
                  />
                  <Input
                    type="url"
                    name="linkUrl2"
                    value={qrData.contentData.links[2]?.url || ""}
                    onChange={(e) =>
                      formatAndHandleUrl(e, 2, handleInputChange)
                    }
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
                      onChange={(e) =>
                        handleInputChange(e, "contentData", index + 3, "label")
                      }
                      placeholder={`Link ${index + 4} Label`}
                    />
                    <Input
                      type="url"
                      name={`linkUrl${index + 3}`}
                      value={link.url}
                      onChange={(e) =>
                        formatAndHandleUrl(e, index + 3, handleInputChange)
                      }
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
          case "youtube":
            return (
              <FormContainer>
                <Input
                  type="text"
                  name="url"
                  value={qrData.youtube.url}
                  onChange={(e) => {
                    const videoId = extractYouTubeVideoId(e.target.value);
                    handleInputChange(
                      {
                        target: { name: "url", value: videoId },
                      } as React.ChangeEvent<HTMLInputElement>,
                      "youtube"
                    );
                  }}
                  placeholder="Enter full YouTube URL (e.g., https://www.youtube.com/watch?v=...)"
                />
              </FormContainer>
            );
          case "ar":
            return (
              <Input
                type="text"
                name="arUrl"
                value={qrData.ar?.arUrl || ""}
                onChange={(e) => handleInputChange(e, "ar")}
                placeholder="Enter AR content URL"
              />
            );
          case "crypto":
            return (
              <>
                <Select
                  name="currency"
                  value={qrData.crypto?.currency || "bitcoin"}
                  onChange={(e) => handleInputChange(e, "crypto")}
                >
                  <option value="bitcoin">Bitcoin</option>
                  <option value="ethereum">Ethereum</option>
                  {/* Add more currencies as needed */}
                </Select>
                <Input
                  type="text"
                  name="address"
                  value={qrData.crypto?.address || ""}
                  onChange={(e) => handleInputChange(e, "crypto")}
                  placeholder="Enter Wallet Address"
                />
                <Input
                  type="number"
                  name="amount"
                  value={qrData.crypto?.amount || ""}
                  onChange={(e) => handleInputChange(e, "crypto")}
                  placeholder="Enter Amount (optional)"
                />
              </>
            );
          case "dynamicVcard":
            return (
              <>
                <Input
                  type="text"
                  name="name"
                  value={qrData.dynamicVcard?.name || ""}
                  onChange={(e) => handleInputChange(e, "dynamicVcard")}
                  placeholder="Full Name"
                />
                <Input
                  type="text"
                  name="phone"
                  value={qrData.dynamicVcard?.phone || ""}
                  onChange={(e) => handleInputChange(e, "dynamicVcard")}
                  placeholder="Phone Number"
                />
                <Input
                  type="email"
                  name="email"
                  value={qrData.dynamicVcard?.email || ""}
                  onChange={(e) => handleInputChange(e, "dynamicVcard")}
                  placeholder="Email"
                />
                {/* Add other fields as needed */}
              </>
            );
          case "iotConfig":
            return (
              <>
                <Input
                  type="text"
                  name="deviceId"
                  value={qrData.iotConfig?.deviceId || ""}
                  onChange={(e) => handleInputChange(e, "iotConfig")}
                  placeholder="Device ID"
                />
                <TextArea
                  name="configData"
                  value={qrData.iotConfig?.configData || ""}
                  onChange={(e) => handleInputChange(e, "iotConfig")}
                  placeholder="Configuration JSON"
                />
              </>
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
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 470px) {
    width: 100%;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-family: "Aspekta 550", Arial, sans-serif;
  border-radius: 10px;
  border: 2px solid #ccc;
  background-color: #f9f9f9;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
  margin-bottom: 16px;
  min-height: 120px;
  resize: none;

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
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="%23333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  background-repeat: no-repeat;
  background-position: right 12px top 50%;
  margin-bottom: 16px;

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
  gap: 16px;
  width: 100%;
  margin-bottom: 20px;
`;

const FileUploadLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

const FileInput = styled.input`
  margin-top: 5px;
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
    background-color: ${(props) => (props.active ? "#e0551c" : "#e9ecef")};
  }
`;

const TypeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const TypeIcon = styled.div`
  svg {
    width: 20px;
    height: 20px;
    color: #333;
  }
`;

const TypeLabel = styled.span`
  font-size: 1rem;
  color: #333;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

function URLBannerUploadField({
  qrData,
  handleInputChange,
}: {
  qrData: QRData;
  handleInputChange: HandleInputChangeFunction;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Store the actual File object (not just a path)
      handleInputChange(
        {
          target: {
            name: 'bannerImageData',
            value: e.target.files[0],
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>,
        'url'
      );
    }
  };

  return (
    <div>
      <label>Banner Image:</label>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
}