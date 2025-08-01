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

// ➤ GET SINGLE PDF
router.get('/:id', async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    if (!pdf) {
      return res.status(404).json({ error: 'PDF not found' });
    }
    res.json(pdf);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch PDF',
      details: error.message
    });
  }
});

// ➤ CREATE NEW PDF (with file upload)
router.post('/', uploadPdf.single('pdfFile'), async (req, res) => {
  try {
    const { book, name, type, subject } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const pdfPath = `${req.file.filename}`;

    const newPdf = new Pdf({ book, name, type, subject, pdfPath });
    await newPdf.save();

    res.json({ message: 'PDF file uploaded successfully', pdfPath });
  } catch (error) {
    console.error('Error uploading PDF:', error);
    res.status(500).json({ error: 'Failed to upload PDF' });
  }
});

// ➤ UPDATE PDF METADATA (without file change)
router.put('/:id', async (req, res) => {
  try {
    const { book, name, type, subject } = req.body;

    const updatedPdf = await Pdf.findByIdAndUpdate(
      req.params.id,
      { book, name, type, subject },
      { new: true } // Return the updated document
    );

    if (!updatedPdf) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    res.json({
      message: 'PDF metadata updated successfully',
      pdf: updatedPdf
    });
  } catch (error) {
    console.error('Error updating PDF:', error);
    res.status(500).json({ error: 'Failed to update PDF metadata' });
  }
});

// ➤ DELETE PDF (both record and file)
router.delete('/:id', async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    
    if (!pdf) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    // Delete the file from the filesystem
    const filePath = path.join(pdfsDir, pdf.pdfPath);
    fs.unlink(filePath, (err) => {
      if (err && err.code !== 'ENOENT') { // Ignore file not found error
        console.error('Error deleting PDF file:', err);
      }
    });

    // Delete the record from the database
    await Pdf.findByIdAndDelete(req.params.id);

    res.json({ message: 'PDF deleted successfully' });
  } catch (error) {
    console.error('Error deleting PDF:', error);
    res.status(500).json({ error: 'Failed to delete PDF' });
  }
});

module.exports = router;