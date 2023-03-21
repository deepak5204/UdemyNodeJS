const AppError = require('./../utils/appError');

const handleCadtErrorDB = err => {  
  const message = `Invalid ${err.path}: ${err.value}.`
  return new AppError(message, 400);
  
};

const handleDuplicateFieldsDB = err => {
  const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
  console.log(err.message);
  console.log('4564545');
  
  const message = 'Duplicate field value: x. Please use another value!'
}
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  //Operational error, trusted error: send message to client 
  if(err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } 
  
  //Programming or other unknown error: don't leak error details
  else {
    // 1). Log error
    console.error('ERROR***', err);
    
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  };
};


module.exports = (err, req, res, next) => {
    // console.log(err.stack); //err.stack basically show where the error happen

      err.statusCode =  err.statusCode || 500;
      err.status = err.status || 'error'

      if(process.env.NODE_ENV === 'development'){
        sendErrorDev(err, res);
      }
      else if(process.env.NODE_ENV === 'production'){
        let error = { ...err };
        
        if(error.name === 'CastError') {
          error = handleCadtErrorDB(error);
        }
        
        if(error.code === 11000)
          error = handleDuplicateFieldsDB(error);

        sendErrorProd(error, res);
      } 
  }