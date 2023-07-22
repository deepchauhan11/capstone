const base = require("./mongo")
const mongoose=require("mongoose")

const customerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile_number:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    is_admin:{
        type:Boolean,
        required:true,
        default: false
    }
})


const customer = mongoose.model("customer",customerSchema)

module.exports=customer
