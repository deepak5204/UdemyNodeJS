// /* eslint-disable prettier/prettier */
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARE
// console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json()); // here "express.json()" is middlware and middleware is just a function that modify the incoming request
app.use(express.static(`${__dirname}/public/`)); //static file

//create own middleware
// app.use((req, res, next) => {
//   console.log('Hello from the middleware!');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTE

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) =>{
  res.status(404).json({
    status:'fail',
    message: `cant find ${req.originalUrl} on this server!`
  });
});

module.exports = app;
