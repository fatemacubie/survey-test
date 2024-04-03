const express = require('express');
const Product = require('../../controllers/product');
// const ContactUs = require('../../models/contactUs');

const router = new express.Router();

router.post('/product/create', Product.createProduct);
router.get('/product/view/all', Product.viewProducts);
router.get('/product/view/:id', Product.viewProductByID);
router.put('/product/update', Product.updateProductByID);
router.delete('/product/delete', Product.deleteProductByID);

module.exports = router;
