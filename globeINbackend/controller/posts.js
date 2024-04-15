const Product = require("../model/posts");
const multer = require('multer');
const path = require('path');
const { Types } = require('mongoose');
const { sendError, sendSuccess } = require('../utils/helper');
const bodyParser = require('body-parser'); 
const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  }),
  limits: { fileSize: 1024 * 1024 * 5 }, 
  fileFilter: function(req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error('Error: Images only! (JPEG, JPG, PNG)')); 
    }
  }
}).single('image');

exports.createProduct = async (req, res) => {
  try {
    const userId = new Types.ObjectId(req.headers['user-id']);
    if (!userId) {
      return sendError(res, 'User ID not available in headers');
    }
    const { name, description, price, location, createdAt } = req.body;
    upload(req, res, async (err) => {
      if (err) {
        return sendError(res, err.message || 'Failed to upload image');
      }
      const imgUrl = req.file ? req.file.path : '';
      const newProduct = new Product({
        user: userId, 
        name,
        description,
        price,
        location,
        createdAt, 
        imgUrl,
        active: true 
      });

      await newProduct.save();

      return sendSuccess(res, 'Product created successfully');
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return (res, 'Failed to create product');
  }
};

exports.getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = new Types.ObjectId(req.headers['user-id']);
    const product = await Product.findOne({ _id: productId, user: userId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product retrieved successfully', product });
  } catch (error) {
    console.error("Error retrieving product:", error);
    return res.status(500).json({ error: "Failed to retrieve product" });
  }
};

exports.getProductsByUser = async (req, res) => {
  try {
    const userId = req.headers['user-id'];
    const products = await Product.find({ user: userId });
    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'No products found for this user' });
    }
    return res.status(200).json({ message: 'Products retrieved successfully', products });
  } catch (error) {
    console.error("Error retrieving products:", error);
    return res.status(500).json({ error: "Failed to retrieve products" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, location, createdAt } = req.body;
    const userId = new Types.ObjectId(req.headers['user-id']);
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId, user: userId },
      { name, description, price, location, createdAt },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found or user not authorized to update' });
    }
    return res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ error: "Failed to update product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.headers['user-id'];
    const deletedProduct = await Product.findOneAndDelete({ _id: productId, user: userId });
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found or user not authorized to delete' });
    }
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ error: "Failed to delete product" });
  }
};
