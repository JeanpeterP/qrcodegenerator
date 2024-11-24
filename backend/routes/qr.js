const express = require('express');
const router = express.Router();
const QRCode = require('../models/QRCode');

router.get('/:id', async (req, res) => {
  try {
    console.log('Fetching QR code with ID:', req.params.id);
    
    const qrCode = await QRCode.findOne({ _id: req.params.id });
    
    if (!qrCode) {
      console.log('QR code not found');
      return res.status(404).json({ error: 'QR code not found' });
    }
    
    console.log('Found QR code:', qrCode);
    res.json(qrCode);
  } catch (error) {
    console.error('Error in QR fetch:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 