import React, { useEffect } from 'react';
import QRCodeGenerator from './QRCodeGenerator';

export default function QRCodeGeneratorEmbed() {
    useEffect(() => {
        // Function to send messages to parent
        const sendToParent = (message: any) => {
            if (window.parent !== window) {
                window.parent.postMessage(message, '*');
            }
        };

        // Example: Send ready message when component mounts
        sendToParent({ type: 'READY' });

        // Listen for messages from parent
        const handleMessage = (event: MessageEvent) => {
            // Handle any configuration or commands from parent
            console.log('Message from parent:', event.data);
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <QRCodeGenerator />
        </div>
    );
} 