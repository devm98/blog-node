module.exports = {
  multipleMongooseToObj: (mongoose) => {
    return mongoose.map((mg) => mg.toObject());
  },

  mongooseToObj: (mg) => {
    return mg ? mg.toObject() : mg;
  },
};
