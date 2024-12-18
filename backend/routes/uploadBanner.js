const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const QRCode = require('../models/QRCode');

// Configure S3 Client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

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

router.post('/upload/url', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(400).json({ 
                success: false, 
                message: err.message 
            });
        }

        try {
            console.log('Received file:', req.file);
            console.log('Received body:', req.body);

            let bannerImageUrl = null;

            // Upload image to S3 if file exists
            if (req.file) {
                const qrId = uuidv4();
                const key = `banners/${qrId}-${req.file.originalname}`;

                console.log('Uploading to S3...');
                const command = new PutObjectCommand({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: key,
                    Body: req.file.buffer,
                    ContentType: req.file.mimetype,
                    // Remove ACL setting as it's not supported
                });

                await s3Client.send(command);
                
                // Construct the URL manually
                bannerImageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
            }

            // Create QR code entry
            const qrCodeData = new QRCode({
                _id: uuidv4(),
                title: req.body.title,
                description: req.body.description,
                contentType: 'url',
                buttonText: req.body.buttonText || 'View More',
                buttonColor: req.body.buttonColor || '#ff6320',
                actionUrl: req.body.actionUrl,
                bannerImageUrl
            });

            const savedData = await qrCodeData.save();
            console.log('Saved QR code:', savedData);

            res.json({ 
                success: true, 
                qrId: savedData._id 
            });

        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ 
                success: false, 
                message: 'Server error',
                error: err.message 
            });
        }
    });
});

module.exports = router; 