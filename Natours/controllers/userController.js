const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');


exports.getAllUsers = catchAsync (async (req, res, next) => {
  const users = await User.find();

  //SEND RESPONSE
      res.status(200).json({
        status: 'success',
        results: users.length, //number of results in users 
        data: {
          users,
        },
      });
  });
  
  exports.createUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: "This route is not yet defined!"
    });
  };
  exports.getUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: "This route is not yet defined!"
    });
  };
  exports.updateUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: "This route is not yet defined!"
    });
  };
  exports.deleteUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: "This route is not yet defined!"
    });
  };
  
