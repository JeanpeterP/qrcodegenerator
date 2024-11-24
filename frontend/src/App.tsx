import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QRCodeGenerator from './components/QRCodeGenerator';
import QRCodeGeneratorEmbed from './components/QRCodeGeneratorEmbed';
import QRPage from './pages/QRPage';

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
                <Route path="/qr/:id" element={<QRPage />} />
            </Routes>
        </Router>
    );
}
export default App;
