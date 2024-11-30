export interface QRData {
    data?: string;
    url: string;
    email: { address: string; subject: string; message: string };
    vcard: { name: string; phone: string; company: string; address: string };
    video: { url: string };
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
    file: {
        fileData: File | null;
        title: string;
        description: string;
        buttonText: string;
        buttonColor: string;
    };
    multiplink: { title: string; links: Array<{ label: string; url: string }> };
    contentType: string;
    contentData: {
        title: string;
        links: Array<{
            label: string;
            url: string;
        }>;
    };
    youtube: {
        url: string;
    };
    ar: {
        arUrl: string;
    };
    crypto: {
        currency: string;
        address: string;
        amount?: string;
    };
    dynamicVcard?: {
        name: string;
        phone: string;
        email: string;
        // Add other fields as needed
    };
    iotConfig?: {
        deviceId: string;
        configData: string;
    };
} 

export type QRType = 'url' | 'email' | 'vcard' | 'wifi' | 'text' | 'whatsapp' | 'sms' | 
    'twitter' | 'facebook' | 'pdf' | 'mp3' | 'app' | 'image' | 'multiplink' | 
    'youtube' | 'file' | 'ar' | 'crypto' | 'dynamicVcard' | 'iotConfig' | 'video';