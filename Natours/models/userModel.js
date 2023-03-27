const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },

  email: {
    type: String,
    required: [true, ' Please provider your email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide avalid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password '],
    //write custom validator
    validate: {
      //This only works on CREATE and SAVE!!!!
      validator: function (el) {
        return el == this.password; // abc === abc => return true
      },
      message: 'Password are not same!',
    },
  },
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  //only run this function if password was actually modified
  if (!this.isModified('password')) {
    return next();
  }

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12); //encrypt the password

  //delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  //here, this point to current document
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() /1000, 10);

    // console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  //FALSE MEANS NOT CHANGED
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
