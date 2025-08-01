// productsRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Products } = require('./../models');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for product images
const productImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `product-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const uploadProductImage = multer({ 
  storage: productImageStorage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images only! (JPEG, JPG, PNG, GIF)');
    }
  }
});

// ➤ GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const products = await Products.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch products',
      details: error.message 
    });
  }
});

// ➤ CREATE NEW PRODUCT (WITH IMAGE)
router.post('/', uploadProductImage.single('image'), async (req, res) => {
  try {
    const { item, qty, description } = req.body;
    
    if (!item || !qty) {
      return res.status(400).json({ error: "Item name and quantity are required!" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Product image is required" });
    }

    const newProduct = new Products({
      item,
      qty,
      description: description || '',
      image: `/uploads/${req.file.filename}`
    });

    await newProduct.save();
    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to create product',
      details: error.message 
    });
  }
});

// ➤ GET SINGLE PRODUCT
router.get('/:id', async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch product',
      details: error.message 
    });
  }
});

// ➤ UPDATE PRODUCT (WITH OPTIONAL IMAGE UPDATE)
router.put('/:id', uploadProductImage.single('image'), async (req, res) => {
  try {
    const { item, qty, description } = req.body;
    const updateData = { item, qty, description };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      message: 'Product updated successfully',
      product: updatedProduct
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to update product',
      details: error.message 
    });
  }
});

// ➤ DELETE PRODUCT
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Products.findByIdAndDelete(req.params.id);
    
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Optional: Delete the associated image file
    if (deletedProduct.image) {
      const imagePath = path.join(__dirname, '..', deletedProduct.image);
      fs.unlink(imagePath, err => {
        if (err) console.error('Error deleting product image:', err);
      });
    }
    
    res.json({ 
      message: 'Product deleted successfully',
      deletedProduct 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to delete product',
      details: error.message 
    });
  }
});

module.exports = router;