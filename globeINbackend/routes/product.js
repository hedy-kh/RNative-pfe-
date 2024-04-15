const express = require('express');
const router = express.Router();
const { createProduct, getProduct, updateProduct, deleteProduct, getProductsByUser } = require('../controller/posts');
const { validateProduct } = require('../middlewares/validator');
const bodyParser = require('body-parser'); 

router.post('/createProduct', bodyParser.json(), validateProduct, createProduct);

router.get('/getProduct/:id', getProduct);

router.get('/getProductsByUser', getProductsByUser);

router.put('/updateProduct/:id', bodyParser.json(), validateProduct, updateProduct);

router.delete('/deleteProduct/:id', deleteProduct);

module.exports = router;
