export interface QRData {
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
    file: {
        fileData: File | null;
        title: string;
        description: string;
        buttonText: string;
        buttonColor: string;
    };
    multiplink: { title: string; links: Array<{ label: string; url: string }> };
    contentType: string;
    contentData: any;
    youtube: {
        url: string;  // Changed from title and videoId to just url
    };
} 