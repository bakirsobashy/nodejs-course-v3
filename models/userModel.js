const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'name is required'] },
  email: { type: String, required: [true, 'email is required'] },
  photo: String,
  password: String,
  passwoedConfirm: String
});

export const userModel = new mongoose.model('userModel', userSchema);
