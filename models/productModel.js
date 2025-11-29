const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price']
  },
  stock: {
    type: Number,
    required: [true, 'A product must have a stock amount']
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
