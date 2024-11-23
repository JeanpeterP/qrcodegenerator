const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  qrId: { type: String, required: true, unique: true },
  fileUrl: { type: String, required: true },
  originalFileName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  buttonText: { type: String },
  buttonColor: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('QRCode', qrCodeSchema);
