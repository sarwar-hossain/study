// inventoryRoutes.js
const express = require('express');
const router = express.Router();
const { Questions } = require('./../models');

// 👉 Fetch Questions Data
router.get('/', async (req, res) => {
    try {
        const inventoryData = await Questions.find();
        res.json(inventoryData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching inventory data' });
    }
});

// 👉 Insert New Questions Data
router.post('/', async (req, res) => {
    try {
        const { type, subject, topic, quiz, question, option1, option2, option3, option4, answer } = req.body;

       // if (type || subject || topic || quiz, question, option1, option2, option3, option4, answer) {
         //   return res.status(400).json({ error: "All fields are required!" });
      //  }

        const newItem = new Questions({ type, subject, topic, quiz, question, option1, option2, option3, option4, answer });
        await newItem.save();
        res.json({ message: 'Questions item added successfully', newItem });
    } catch (error) {
        res.status(500).json({ error: 'Failed to insert inventory data' });
    }
});

// 👉 Delete Questions Item by ID
router.delete('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        console.log('Deleting item with ID:', itemId); // Log the ID

        // Check if the ID is valid
        if (!itemId || itemId.length !== 24) {
            return res.status(400).json({ error: 'Invalid item ID' });
        }

        const deletedItem = await Questions.findByIdAndDelete(itemId);

        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ message: 'Item deleted successfully', deletedItem });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

// 👉 Fetch a single inventory item by ID
router.get('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await Questions.findById(itemId);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json(item);
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ error: 'Failed to fetch item' });
    }
});

// 👉 Update inventory item
router.put('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const { type, subject, topic, quiz, question, option1, option2, option3, option4, answer } = req.body;

        const updatedItem = await Questions.findByIdAndUpdate(
            itemId,
            { type, subject, topic, quiz, question, option1, option2, option3, option4, answer },
            { new: true } // Return the updated document
        );

        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ message: 'Item updated successfully', updatedItem });
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ error: 'Failed to update item' });
    }
});

module.exports = router;