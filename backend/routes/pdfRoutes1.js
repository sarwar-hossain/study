// pdfRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Pdf } = require('./../models');

// Set PDFs directory to be inside the public folder
const pdfsDir = path.join(__dirname, '../../frontend/public/pdfs');
if (!fs.existsSync(pdfsDir)) {
  fs.mkdirSync(pdfsDir, { recursive: true });
}

// Multer configuration for PDF uploads
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pdfsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const uploadPdf = multer({
  storage: pdfStorage,
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb('Error: PDF files only!');
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// ➤ GET ALL PDFs
router.get('/', async (req, res) => {
  try {
    const pdfs = await Pdf.find().sort({ uploadedAt: -1 });
    res.json(pdfs);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch PDFs',
      details: error.message
    });
  }
});

router.post('/', uploadPdf.single('pdfFile'), async (req, res) => {
  try {
      const { title, description } = req.body;

      if (!req.file) {
          return res.status(400).json({ error: 'No PDF file uploaded' });
      }

      // Path will now be relative to the public folder
      const pdfPath = `${req.file.filename}`;

      const newPdf = new Pdf({ title, description, pdfPath });
      await newPdf.save();

      res.json({ message: 'PDF file uploaded successfully', pdfPath });
  } catch (error) {
      console.error('Error uploading PDF:', error);
      res.status(500).json({ error: 'Failed to upload PDF' });
  }
});

module.exports = router;