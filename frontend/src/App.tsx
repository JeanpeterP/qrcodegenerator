import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QRCodeGenerator from './components/QRCodeGenerator';
import QRCodeGeneratorEmbed from './components/QRCodeGeneratorEmbed';
import MultiLinkQRPage from './pages/MultiLinkQRPage';
import DownloadQRPage from './pages/DownloadQRPage';

function App() {
    // Check if we're in embed mode
    const isEmbed = window.self !== window.top;

    if (isEmbed) {
        return <QRCodeGeneratorEmbed />;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<QRCodeGenerator />} />
                <Route path="/multi-link/:id" element={<MultiLinkQRPage />} />
                <Route path="/download/:id" element={<DownloadQRPage />} />
            </Routes>
        </Router>
    );
}
export default App;
