
class APIFeatures {
    //constructor
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString ;
    }

    filter() {
      const queryObj = {...this.queryString};
      const excludedFields = ['page', 'sort', 'limit','fields'];
      excludedFields.forEach(el => delete queryObj[el]);
  
      //1.B) ADVANCE FILTERING
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`); 
      this.query.find(JSON.parse(queryStr));
      return this;
    }

    sort() {
    if(this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt'); // '-createdAt':- descending order, 'createdAt':- Ascending order 
    }
    return this;
  }

  limitFields() {
     if(this.queryString.fields){
      const fields = this.queryString.fields.split(',').join(' '); //produce projected fields
      this.query = this.query.select(fields); // select only reqired fields (called projection), ex:- (name, price,difficulty, etc.)
    } else {
      this.query = this.query.select('-__v'); //here -__v is excluding, here '-'(minus) representing excluding only these field
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1; //here convert string to integer and set default 1
    const limit = this.queryString.limit * 1 || 100; ////here convert string to integer and set default 100
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;