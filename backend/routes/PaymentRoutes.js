// inventoryRoutes.js
const express = require('express');
const router = express.Router();
const { Payment } = require('./../models');

// 👉 Fetch Payment Data
router.get('/', async (req, res) => {
    try {
        const inventoryData = await Payment.find();
        res.json(inventoryData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching inventory data' });
    }
});

// Add to your server.js
router.get('/check', async (req, res) => {
  try {
    const { phone, buyed } = req.query;
    
    const payment = await Payment.findOne({ 
      phone: phone,
      buyed: buyed // You'll need to add this field to your schema
    });

    res.json({ exists: !!payment });
  } catch (error) {
    res.status(500).json({ message: 'Error checking payment', error });
  }
});

// 👉 Insert New Payment Data
router.post('/', async (req, res) => {
    try {
        const { userName, phone, amount, buyed, paymentId } = req.body;
        const newItem = new Payment({ userName, phone, amount, buyed, paymentId });

        await newItem.save();
        res.json({ message: 'Payment item added successfully', newItem });
    } catch (error) {
        res.status(500).json({ error: 'Failed to insert inventory data' });
    }
});

// 👉 Delete Payment Item by ID
router.delete('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        console.log('Deleting item with ID:', itemId); // Log the ID

        const deletedItem = await Payment.findByIdAndDelete(itemId);

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
        const item = await Payment.findById(itemId);

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
        const { userName, phone, amount, buyed, paymentId } = req.body;

        const updatedItem = await Payment.findByIdAndUpdate(
            itemId,
            { userName, phone, amount, buyed, paymentId },
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