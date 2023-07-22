const base = require("./mongo")
const mongoose = require('mongoose');
const Restaurant = require("./restaurant_schema")

// Define the schema for the Food Item
const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Restaurant,
    required: true
  }
});

// Define the model for the Food Item
const FoodItem = mongoose.model('fooditem', foodItemSchema);

module.exports = FoodItem;
