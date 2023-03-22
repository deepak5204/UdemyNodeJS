const jwt =require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signinToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRES_IN
    });
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });
 
    //create JWT tocken
    const token = signinToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    });
});


//LOGGING IN
exports.login = catchAsync (async (req, res,next) => {
    const { email, password } = req.body;

    // 1) Check if the email and password exist
    if(!email || !password){
        next(new AppError(`Please provide email and password!`, 400))
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({email}).select('+password'); //explicetely select password
    
    if(!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email orpassword', 401)); //401- unauthorized
    }
    console.log(user);
    

    // 3) If everything ok, send token to client
    const token = signinToken(user._id);
    
    res.status(200).json({
        status: 'success',
        token
    });
});