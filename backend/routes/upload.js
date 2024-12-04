const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const QRCode = require('../models/QRCode');

// Configure AWS
const s3 = new AWS.S3();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  fileFilter: (req, file, cb) => {
    console.log('Multer processing file:', file);
    cb(null, true);
  }
}).single('file');

router.post('/upload', (req, res, next) => {
  console.log('Starting file upload processing...');
  
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err);
      return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
      console.error('Unknown error:', err);
      return res.status(500).json({ success: false, message: 'Unknown error occurred' });
    }

    console.log('Files in request:', req.files);
    console.log('File in request:', req.file);
    console.log('Body:', req.body);

    if (!req.file) {
      console.error('No file received in request');
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded',
        debug: {
          contentType: req.headers['content-type'],
          bodyKeys: Object.keys(req.body)
        }
      });
    }

    try {
      const {
        title = 'Download File',
        description = '',
        buttonText = 'Download',
        buttonColor = '#ff6320'
      } = req.body;

      // Generate unique ID for the QR code
      const qrId = uuidv4();

      // Upload to S3
      const s3Result = await s3.upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${qrId}/${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      }).promise();

      // Create QR code record
      const qrCode = new QRCode({
        _id: qrId,
        contentType: 'download',
        fileUrl: s3Result.Location,
        originalFileName: req.file.originalname,
        mimeType: req.file.mimetype,
        title,
        description,
        buttonText,
        buttonColor
      });

      await qrCode.save();

      res.status(200).json({ 
        success: true, 
        qrId,
        message: 'File uploaded successfully'
      });

    } catch (error) {
      console.error('Upload processing error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Server error during upload',
        error: error.message 
      });
    }
  });
});

module.exports = router; 