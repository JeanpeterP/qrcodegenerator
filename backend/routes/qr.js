const express = require('express');
const router = express.Router();
const QRCode = require('../models/QRCode');

// Route to serve the download page
router.get('/:qrId', async (req, res) => {
  const { qrId } = req.params;

  try {
    // Find the QR code document by qrId
    const qrCode = await QRCode.findOne({ qrId });

    if (!qrCode) {
      return res.status(404).send('QR Code not found');
    }

    // Log the buttonColor to verify its value
    console.log('Button color from DB:', qrCode.buttonColor);

    res.render('qrPage', {
      title: qrCode.title,
      description: qrCode.description,
      buttonText: qrCode.buttonText,
      buttonColor: qrCode.buttonColor,
      fileUrl: qrCode.fileUrl,
      originalFileName: qrCode.originalFileName,
    });
  } catch (error) {
    console.error('Error fetching QR Code:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 