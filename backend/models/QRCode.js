const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: String,
  description: String,
  contentType: { 
    type: String, 
    enum: ['download', 'multiplink', 'youtube', 'url'] 
  },
  logoUrl: String,
  buttonColor: String,
  buttonText: String,
  actionUrl: String,
  bannerImageUrl: String,
  fileUrl: String,
  originalFileName: String,
  contentData: {
    links: [{ 
      url: String, 
      label: String 
    }],
    url: String
  }
});

module.exports = mongoose.model('QRCode', qrCodeSchema);
