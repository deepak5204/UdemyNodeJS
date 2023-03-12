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
  
exports.getAllTours = async (req, res) => {
  try{
  //BUILDQUERY
    const queryObj = {...req.query};
    const excludedFields = ['page', 'sort', 'limit','fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    const query = await Tour.find(queryObj);

    //-------------ADD FILTERS-------------//

    // const query = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy'
    // });

    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');


//EXECUTE QUERY
    const tours = await query;

//SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length, //number of results in tours 
      data: {
        tours,
      },
    });
  } catch (err){
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
  };
  
exports.getTour = async (req, res) => {
    try{
      const tour = await Tour.findById(req.params.id);//id similar to tourRoutes
      //Tour.findOne({ _id: req.params.id});
  
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err){
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
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
  
exports.updateTour = async (req, res) => {
   try{
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      // runValidators: true
      useUnifiedTopology: true 
    });

    res.status(200).json({
      status: 'succes',
      data:{
        tour
      }
    })
   } catch (err){
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent!'
    })
   }
   
  };
  
exports.deleteTour = async (req, res) => {
  try{
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      data: null
    });

  } catch (err){
    res.status(404).json({
      err
    });
  }
  };