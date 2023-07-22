const mongoose=require("mongoose")
mongoose.connect("mongodb://0.0.0.0:27017/food-ordering-app")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})
