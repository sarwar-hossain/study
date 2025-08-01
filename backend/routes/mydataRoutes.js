// mydataRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { MyData } = require('./../models');

// Create the uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
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

// 👉 Fetch All MyData Items
router.get('/', async (req, res) => {
    try {
        const myDataList = await MyData.find();
        res.json(myDataList);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching mydata collection' });
    }
});

// 👉 Insert New MyData Item with Image Upload
router.post('/', uploadImage.single('status'), async (req, res) => {
    try {
        const { item, qty } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const status = `/uploads/${req.file.filename}`;

        const newItem = new MyData({ item, qty, status });
        await newItem.save();
        res.json({ message: 'MyData item added successfully', newItem });
    } catch (error) {
        console.error('Error inserting mydata:', error);
        res.status(500).json({ error: 'Failed to insert mydata' });
    }
});

// 👉 Delete MyData Item by ID
router.delete('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const deletedItem = await MyData.findByIdAndDelete(itemId);

        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ message: 'MyData item deleted successfully', deletedItem });
    } catch (error) {
        console.error('Error deleting MyData item:', error);
        res.status(500).json({ error: 'Failed to delete MyData item' });
    }
});

// 👉 Fetch Single MyData Item by ID
router.get('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await MyData.findById(itemId);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json(item);
    } catch (error) {
        console.error('Error fetching MyData item:', error);
        res.status(500).json({ error: 'Failed to fetch MyData item' });
    }
});

// 👉 Update MyData Item
router.put('/:id', uploadImage.single('status'), async (req, res) => {
    try {
        const itemId = req.params.id;
        const { item, qty } = req.body;
        
        let updateData = { item, qty };
        
        // If a new image was uploaded
        if (req.file) {
            updateData.status = `/uploads/${req.file.filename}`;
        }

        const updatedItem = await MyData.findByIdAndUpdate(
            itemId,
            updateData,
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ message: 'MyData item updated successfully', updatedItem });
    } catch (error) {
        console.error('Error updating MyData item:', error);
        res.status(500).json({ error: 'Failed to update MyData item' });
    }
});

module.exports = router;