import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QRCodeGenerator from './components/QRCodeGenerator';
import QRCodeGeneratorEmbed from './components/QRCodeGeneratorEmbed';

function App() {
    // Check if we're in embed mode
    const isEmbed = window.self !== window.top;

    if (isEmbed) {
        return <QRCodeGeneratorEmbed />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<QRCodeGenerator />} />
                {/* other routes */}
            </Routes>
        </BrowserRouter>
    );
}
export default App;
