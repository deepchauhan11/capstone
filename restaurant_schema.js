const base = require("./mongo")
const mongoose=require("mongoose")

const restaurantSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    opening_time:{
        type:String,
        required:true
    },
    closing_time:{
        type:String,
        required:true
    }
})

const restaurant = mongoose.model("restaurant",restaurantSchema)

module.exports=restaurant