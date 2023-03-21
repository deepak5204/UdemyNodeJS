const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email:{
        type: String,
        required: [true,' Please provider your email!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide avalid email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8
    },
    passwordConfirm:{
        type: String,
        required: [true, 'Please confirm your password '],
        //write custom validator
        validate: {
            //This only works on CREATE and SAVE!!!!
            validator: function(el) {
                return el == this.password; // abc === abc => return true
            },
            message: 'Password are not same!'
        }
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;