module.exports = (err, req, res, next) => {
    // console.log(err.stack); //err.stack basically show where the error happen

      err.statusCode =  err.statusCode || 500;
      err.status = err.status || 'error'
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      }) 
    }