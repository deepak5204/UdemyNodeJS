const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
//   );

  // exports.checkID = (req, res, next, val) => {
  //   console.log(`Tour id is:${val}`);
  //   if(req.params.id * 1 > tours.length){
  //     return res.status(404).json({
  //       status: "Fail",
  //       message: "Invalid ID"
  //     });
  //   }
  //   next();
  // };

  // exports.checkBody = (req, res, next) => {
  //   if(!req.body.name || !req.body.price){
  //     return res.status(400).json({
  //       status: 'fail0',
  //       message: 'Missing name and price'
  //     })
  //   }  
  //   next();
  // };
  
exports.getAllTours = (req, res) => {
    res.status(200).json({
      status: 'success',
      // results: tours.length,
      // data: {
      //   tours,
      // },
    });
  };
  
exports.getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;

    // const tour = tours.find((el) => el.id === id);
  
    // res.status(200).json({
    //   status: 'success',
    //   data: {
    //     tour,
    //   },
    // });
  };
  
exports.createTour = async (req, res) => {
  try{
      // const newTour = new Tour({})
  // newTour.save()

  //Here Tour models directly call create method
  const newTour = await Tour.create(req.body);

  res.status(201).json({
         status: 'success',
         data: {
           tour: newTour,
         },
       });
  } catch (err){
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!'
    })
  }
  };
  
exports.updateTour = (req, res) => {
    console.log(req.params.id);
   
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here.... >',
      },
    });
  };
  
exports.deleteTour = (req, res) => {
    console.log(req.params.id);
   
    res.status(200).json({
      message: 'deleted Successfully',
    });
  };