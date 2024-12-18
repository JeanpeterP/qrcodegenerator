const express = require('express');
const router = express.Router();
const QRCode = require('../models/QRCode');

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log('Attempting to find QR code with ID:', id);
        
        const qrCode = await QRCode.findById(id);
        console.log('Database response:', qrCode);

        if (!qrCode) {
            console.log('No QR code found for ID:', id);
            return res.status(404).json({ 
                success: false, 
                message: 'QR code not found' 
            });
        }

        console.log('Successfully found QR code:', qrCode);
        res.json({ 
            success: true, 
            data: qrCode 
        });

    } catch (error) {
        console.error('Error fetching QR code:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching QR code',
            error: error.message 
        });
    }
});

module.exports = router; 