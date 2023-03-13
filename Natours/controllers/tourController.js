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

  //here use middleware
  exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
  }
  
  exports.getAllTours = async (req, res) => {
    try{
      //-------------ADD FILTERS-------------//

  //BUILD QUERY
  //1.A) FILTERING
      
    const queryObj = {...req.query};
    
    const excludedFields = ['page', 'sort', 'limit','fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    //1.B) ADVANCE FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
    let query = Tour.find(JSON.parse(queryStr));
    
    //2) SORTING
    if(req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
      //sort('price ratingsAverage)
    } else {
      query = query.sort('-createdAt'); // '-createdAt':- descending order, 'createdAt':- Ascending order 
    }

    //3) FIELD LIMITING
    if(req.query.fields){
      const fields = req.query.fields.split(',').join(' '); //produce projected fields
      query = query.select(fields); // select only reqired fields (called projection), ex:- (name, price,difficulty, etc.)
    } else {
      query = query.select('-__v'); //here -__v is excluding, here '-'(minus) representing excluding only these field
    }


    // 4) PAGINATIO
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if(req.query.page){
      const numTours = await Tour.countDocuments();
      if(skip >= numTours){
        throw new Error('This page does not exit!');
      }
    }

    
    //QUERY LOOK LIKE IN MONGODB
    //difficulty
    // console.log(JSON.parse(queryStr));
      //{ difficulty: 'easy', duration: { $gte: 5 }}
      // { difficulty: 'easy', duration: { gte: '5' } }
      // gte, gt, lte, lt

    // const query = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy'
    // });



//EXECUTE QUERY
    const tours = await query;
    //query.sort().select().skip().limit()

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