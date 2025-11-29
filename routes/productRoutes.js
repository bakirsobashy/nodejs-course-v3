const express = require('express');
const productController = require('./../controllers/productController');
const authController = require('./../controllers/authController.js');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, productController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    productController.createProduct
  );

router
  .route('/:id')
  .get(authController.protect, productController.getProduct)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    productController.deleteProduct
  );

module.exports = router;
