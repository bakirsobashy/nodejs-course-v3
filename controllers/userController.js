const User = require('./../models/userModel');
const Product = require('./../models/productModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

exports.addToCart = catchAsync(async (req, res, next) => {
  const user = req.user;
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  const amount = parseInt(req.params.amount, 10);
  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }
  if (amount <= 0) {
    return next(new AppError('Amount must be greater than zero', 400));
  }

  if (product.stock < amount) {
    return next(new AppError(`Only ${product.stock} items left in stock`, 400));
  }
  if (user.cart.some(item => item.product.toString() === productId)) {
    // Update quantity if product already in cart
    const item = user.cart.find(item => item.product.toString() === productId);
    item.quantity += amount;
    await user.updateOne({ cart: user.cart });
    return res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } else {
    user.cart.push({ product: productId, quantity: amount });

    await user.updateOne({ cart: user.cart });

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  }
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
