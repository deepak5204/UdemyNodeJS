class AppError extends Error {
    constructor(message, statusCode) {  //call each time whenever create an object
        super(message); //call parent constructor(); by doind this set message property to our incoming message

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        //stackTrace - where error happen
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;