require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

const uploadRouter = require('./routes/upload');
const qrRouter = require('./routes/qr');

const app = express();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'https://localhost:3001'],  // Allow both origins
    credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set View Engine (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/api', uploadRouter);
app.use('/qr', qrRouter);

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit of 100 requests per window per IP
});

app.use(limiter);

// Use helmet to secure headers
app.use(helmet());

// Add this before your routes
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File size is too large' });
    } else if (err.message === 'Invalid file type') {
        return res.status(400).json({ success: false, message: 'Invalid file type' });
    } else {
        console.error(err.stack);
        res.status(500).json({ 
            success: false, 
            message: 'Server Error',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
