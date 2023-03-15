const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have anname'], //required is a built in validation
      unique: true, //unique is not validator
      trim: true,
      maxlength: [40, 'A tour name must have less or equal 40 character'],
      minlength: [10, 'A tour name must have at least 10 character']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"]
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size"]
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
      enum: ['easy','medium', 'difficult'],
      message: 'Difficulty is either:  either, medium, difficultirs'
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5']
    },
    retingQantity:{
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover image"]
    },
    images: [String], //An array, have a number of string
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false // hide from response 
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default:false
    }
  }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });
  
//VIRTUAL PROPERTY
  //here we cannot use virtual property in a query, because this property not part of database
  tourSchema.virtual('durationWeek').get(function (){ //here I used regular function because I have to return this keyword
    return this.duration / 7; //this point to current document
  });

  //DOCUMENT MIDDLEWARE;- runs before .save() and .create()
  tourSchema.pre('save', function(next){
    this.slug = slugify(this.name, { lower: true}); //this points currently process document 
    next();
  });

  // tourSchema.pre('save', function(next) {
  //   console.log('will solve document.....');
  //   next();  
  // })

  // tourSchema.post('save', function(duc, next) {
  //   console.log('doc');
  //   next();
  // });

  //QUERY MIDDLEWARE
  tourSchema.pre(/^find/, function (next) {
    this.find({secretTour: {$ne: true}});

    this.start = Date.now();
    next();
  });

  tourSchema.post(/^find/, function(docs, next) {
    console.log(`Query took ${Date.now()- this.satrt} milliseconds!`);
    next();
  });

  //AGGREGATION MIDDLEWARE
  tourSchema.pre('aggregate', function(next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true} } });
    console.log(this.pipeline()); //this points to current aggregation object
    next();
  });

  const Tour = mongoose.model('Tour', tourSchema);
  module.exports = Tour;
  