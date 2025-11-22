const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'name is required'] },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    lowecase: true,
    validate: [validator.isEmail, 'email is not valid']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [8, 'password must be over 7 cahrs']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'confirm your password'],
    validate: {
      //THIS ONLY WORKKS ON CREATE AND SAVE FUNC
      validator: function(el) {
        return el === this.password;
      },
      message: 'passwords entered are not the same'
    }
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

const User = new mongoose.model('User', userSchema);

module.exports = User;
