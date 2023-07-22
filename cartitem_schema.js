const base = require("./mongo")
const mongoose = require('mongoose');
const Customer = require("./customer_schema")
const Restaurant = require("./restaurant_schema")

// Define the schema for the Food Item
const cartItemSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Customer,
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Restaurant,
        required: true
    },
    cartitems:{
        type: Map,
    },
    PlacedOn: {
        type: Date,
        default: Date.now // This will automatically set the current date and time on record creation
    },
    OrderReferenceNumber: {
        type: String,
        unique: true,
        required: true,
        default: Math.floor(100000 + Math.random() * 900000).toString()
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'], // Possible values for the "status" field
      default: 'pending', // Default value will be "pending" if not provided
    },
});


// Define the model for the Food Item
const Cart = mongoose.model('cartitem', cartItemSchema);

module.exports = Cart;
