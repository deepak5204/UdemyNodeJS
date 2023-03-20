const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
}


module.exports = (err, req, res, next) => {
    // console.log(err.stack); //err.stack basically show where the error happen

      err.statusCode =  err.statusCode || 500;
      err.status = err.status || 'error'

      if(process.env.NODE_ENV === 'development'){
        sendErrorDev();
      }
      else if(process.env.NODE_ENV === 'production'){
        sendErrorProd();
      } 
    }