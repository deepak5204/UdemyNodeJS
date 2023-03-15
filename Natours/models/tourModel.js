const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have anname'],
      unique: true,
      trim: true
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
      required: [true, "A tour must have a difficulty"]
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
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
    console.log(docs);
    
    next();
    
  })

  const Tour = mongoose.model('Tour', tourSchema);
  module.exports = Tour;
  