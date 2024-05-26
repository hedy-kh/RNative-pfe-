const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); 
const { upload } = require('../middlewares/upload');
const { createProduct, getProduct, updateProduct, deleteProduct, getProductsByUser, getAllProducts } = require('../controller/posts');
const { validateProduct } = require('../middlewares/validator');

router.post('/createProduct', upload, validateProduct, createProduct);

router.get('/getProduct/:id', getProduct);
router.get('/getAllProducts',getAllProducts);

router.get('/getProductsByUser', getProductsByUser);

router.put('/updateProduct/:id', bodyParser.json(),upload, validateProduct, updateProduct);

router.delete('/deleteProduct/:id', deleteProduct);

module.exports = router;
