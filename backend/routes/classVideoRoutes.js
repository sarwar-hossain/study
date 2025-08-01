// mydataRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { ClassVideo } = require('../models');

// Create the uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../frontend/public/uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for image uploads
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const uploadImage = multer({ storage: imageStorage });

// 👉 Fetch All ClassVideo Items
router.get('/', async (req, res) => {
    try {
        const classVideoList = await ClassVideo.find();
        res.json(classVideoList);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching mydata collection' });
    }
});

// 👉 Insert New ClassVideo Item with Image Upload
router.post('/', uploadImage.single('img'), async (req, res) => {
    try {
        const { type, subject, topic, name, link } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const img = `${req.file.filename}`;

        const newItem = new ClassVideo({ type, subject, topic, name, link, img });
        await newItem.save();
        res.json({ message: 'ClassVideo item added successfully', newItem });
    } catch (error) {
        console.error('Error inserting mydata:', error);
        res.status(500).json({ error: 'Failed to insert mydata' });
    }
});

// 👉 Delete ClassVideo Item by ID
router.delete('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const deletedItem = await ClassVideo.findByIdAndDelete(itemId);

        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ message: 'ClassVideo item deleted successfully', deletedItem });
    } catch (error) {
        console.error('Error deleting ClassVideo item:', error);
        res.status(500).json({ error: 'Failed to delete ClassVideo item' });
    }
});

// 👉 Fetch Single ClassVideo Item by ID
router.get('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await ClassVideo.findById(itemId);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json(item);
    } catch (error) {
        console.error('Error fetching ClassVideo item:', error);
        res.status(500).json({ error: 'Failed to fetch ClassVideo item' });
    }
});

// 👉 Update ClassVideo Item
router.put('/:id', uploadImage.single('img'), async (req, res) => {
    try {
        const itemId = req.params.id;
        const { type, subject, topic, name, link} = req.body;
        
        let updateData = { type, subject, topic, name, link };
        
        // If a new image was uploaded
        if (req.file) {
            updateData.img = `${req.file.filename}`;
        }

        const updatedItem = await ClassVideo.findByIdAndUpdate(
            itemId,
            updateData,
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ message: 'ClassVideo item updated successfully', updatedItem });
    } catch (error) {
        console.error('Error updating ClassVideo item:', error);
        res.status(500).json({ error: 'Failed to update ClassVideo item' });
    }
});

module.exports = router;