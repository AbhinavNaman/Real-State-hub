// models/Property.js
const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: String,
  location: String,
  type: String,
  price: Number,
  area: Number,
  bedrooms: Number,
  bathrooms: Number,
  description: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Property", propertySchema);
