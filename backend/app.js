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

// Logging middleware
app.use((req, res, next) => {
  console.log('Incoming request:', {
    method: req.method,
    path: req.path,
    headers: req.headers
  });
  next();
});

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

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

// Routes - Important: Order matters!
// API routes should come BEFORE the static file serving
app.use('/api/qr', qrRouter);  // This should handle all /api/qr/* routes
app.use('/api', uploadRouter);

// Static file serving
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

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
