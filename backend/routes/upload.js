const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const QRCode = require('../models/QRCode');
const { check, validationResult } = require('express-validator');

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Multer setup with memory storage
const storage = multer.memoryStorage();

// File filter to validate file types
const allowedMimeTypes = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/zip',
  // Add more MIME types as needed
];

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB limit
  fileFilter: (req, file, cb) => {
    console.log('Received file:', file);
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
}).single('file');

// Validation rules
const uploadValidation = [
  check('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty if provided'),
  check('description')
    .optional()
    .trim(),
  check('buttonText')
    .optional()
    .trim(),
  check('buttonColor')
    .optional()
    .trim()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Invalid color format. Use hex format (e.g., #ff6320)'),
];

// Route to handle file uploads
router.post('/upload', (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ 
        success: false, 
        message: err.message 
      });
    }
    
    console.log('File uploaded successfully:', req.file);
    next();
  });
}, uploadValidation, async (req, res) => {
  try {
    // Log the entire request
    console.log('Processing request:', {
      body: req.body,
      file: req.file,
      headers: req.headers
    });

    const { title, description, buttonText, buttonColor } = req.body;

    // Log the received buttonColor
    console.log('Button color received:', buttonColor);

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: 'No file provided' });
    }

    // Generate a unique ID for the QR code
    const qrId = uuidv4();

    // Prepare S3 upload parameters
    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${qrId}/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype
    };

    // Upload file to S3
    const s3Result = await s3.upload(s3Params).promise();

    // Create a new QRCode document
    const qrCode = new QRCode({
      qrId,
      fileUrl: s3Result.Location,
      originalFileName: file.originalname,
      title: title || 'Download File',
      description: description || '',
      buttonText: buttonText || 'Download',
      buttonColor: buttonColor || '#ff6320',
    });

    // Save QRCode to MongoDB
    await qrCode.save();

    // Add more detailed response
    console.log('Successfully created QR code with ID:', qrId);
    return res.status(200).json({ 
      success: true, 
      qrId,
      message: 'File uploaded successfully'
    });

  } catch (error) {
    console.error('Error in upload route:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

module.exports = router; 