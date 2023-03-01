const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// MIDDLEWARE

app.use(morgan('dev'));
app.use(express.json()); // here "express.json()" is middlware and middleware is just a function that modify the incoming request

//create own middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Hello from the server side!',
//     app: 'Natours',
//   });
// });

// app.post('/', (req, res) => {
//   res.json({
//     message: 'Hello from the post routes!',
//   });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // if(id > tours.length){
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id!',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  console.log(req.params.id);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id!',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here.... >',
    },
  });
};

const deleteTour = (req, res) => {
  console.log(req.params.id);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id!',
    });
  }
  res.status(200).json({
    message: 'deleted Successfully',
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// // app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// app.get('/api/v1/tours', (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// });

// app.post('/api/v1/tours', (req, res) => {
//   // console.log(req.body);

//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newId }, req.body);

//   tours.push(newTour);

//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newTour,
//         },
//       });
//     }
//   );
// });

// app.get('/api/v1/tours/:id', (req, res) => {
//   console.log(req.params);
//   const id = req.params.id * 1;
//   const tour = tours.find((el) => el.id === id);

//   // if(id > tours.length){
//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid Id!',
//     });
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// });

//update data
// app.patch('/api/v1/tours/:id', (req, res) => {
//   console.log(req.params.id);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid Id!',
//     });
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour: '<Updated tour here.... >',
//     },
//   });
// });

// delete method
// app.delete('/api/v1/tours/:id', (req, res) => {
//   console.log(req.params.id);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid Id!',
//     });
//   }
//   res.status(204).json({
//     status: 'success',
//     data: null
//   });
// });

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
