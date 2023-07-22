const express = require("express")
const Customer = require("./customer_schema")
const Restaurant = require("./restaurant_schema")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const fooditem = require('./fooditem_schema');
const Cart = require('./cartitem_schema')


app.get("/",cors(),(req,res)=>{

})


app.post("/customerLogin",async(req,res)=>{
    const{email,password}=req.body

    try{
        const data=await Customer.findOne({email:email, password:password}).exec()
        if(data){
            res.json(data)
        }
        else{
            res.json("invalid")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/customerSignup",async(req,res)=>{
    const{name,email,mobile_number,password}=req.body

    const data={
        name:name,
        email:email,
        mobile_number:mobile_number,
        password:password
    }

    try{
        const check=await Customer.findOne({email:email})

        if(check){
            res.json("email already exists")
        }
        else{
            await Customer.insertMany([data])
            res.json("customer added successfully")
        }

    }
    catch(e){
        res.json("error while creating new customer")
    }

})
app.post("/restaurantSignup",async(req,res)=>{
    const{name,address,opening_time,closing_time}=req.body

    const data={
        name:name,
        address:address,
        opening_time:opening_time,
        closing_time:closing_time
    }

    try{
        const check=await Restaurant.findOne({name:name})

        if(check){
            res.json("restaurant with this name already exists")
        }
        else{
            await Restaurant.insertMany([data])
            res.json("restaurant added successfully")
        }

    }
    catch(e){
        res.json("error while creating this restaurant")
    }

})

app.get("/restaurantListing",async(req,res)=>{
    try{
        const restaurants=await Restaurant.find({})
        res.json(restaurants)
    }
    catch(e){
        res.json("error while fetching restaurant list")
    }
})


// Add food item to cart 
app.post('/customer/checkout/', async (req, res) => {
try{
  const {customerId, restaurantId, cartItems}=req.body

  const data = {
    customer:customerId,
    restaurant:restaurantId,
    cartitems:cartItems
  }
    Cart.insertMany([data]) 
    res.json("success")
}
catch(e){
    res.json("error while placing order")
}

});


// Create a new food item
app.post('/restaurant/:restaurant_id/fooditems', async (req, res) => {
      const { name,quantity, description, price, restaurantId } = req.body;
  
      const data={
        name:name,
        quantity:quantity,
        description:description,
        price:price,
        restaurant:restaurantId
    }

    try{
        const check=await fooditem.findOne({name:name})

        if(check){
            res.json("food item with this name already exists under this restaurant")
        }
        else{
            await fooditem.insertMany([data])
            res.json("food item added successfully")
        }
    }
    catch(e){
        res.json("error while adding the food item")
    }

  });
  
  // Get all food items
  app.get('/restaurant/:restaurant_id/fooditems', async (req, res) => {
    try{
        const foodItems=await fooditem.find({restaurant: req.params.restaurant_id})
        res.json(foodItems)
    }
    catch(e){
        res.json("error fetching food items")
    }
  });

  app.get('/customer/:customer_id/orders', async (req, res) => {
    try{
      const cartItems = await Cart.find({ customer: req.params.customer_id })
      .populate("customer").populate("restaurant");
      res.json(cartItems)
    }
    catch(e){
        res.json("error fetching order list")
    }
  });

  app.get('/restaurant/:restaurant_id/orders', async (req, res) => {
    try{
      const cartItems = await Cart.find({ restaurant: req.params.restaurant_id })
      .populate("customer").populate("restaurant");
      res.json(cartItems)
    }
    catch(e){
        res.json("error fetching order list")
    }
  });

  app.get('/restaurant/:restaurant_id/order/:order_id', async (req, res) => {
    try{
      const cartItem = await Cart.findOne({_id:req.params.order_id })
      // Extract ObjectIds from the map keys
      const foodItemIds = Array.from(cartItem.cartitems.keys());
      
      // Query the FoodItem collection using the ObjectIds
      const foodItems = await fooditem.find({ _id: { $in: foodItemIds } });
      // Build the array of objects containing food item details and quantities
      const foodItemDetails = foodItems.map(foodItem => {
        const quantity = cartItem.cartitems.get(foodItem._id);
        return { ...foodItem.toObject(), quantity };
      });
      res.json(foodItemDetails);
    }
    catch(e){
        res.json("error fetching order list")
    }
  });

  app.get('/customer/:customer_id/order/:order_id', async (req, res) => {
    try{
      const cartItem = await Cart.findOne({_id:req.params.order_id })
      // Extract ObjectIds from the map keys
      const foodItemIds = Array.from(cartItem.cartitems.keys());
      
      // Query the FoodItem collection using the ObjectIds
      const foodItems = await fooditem.find({ _id: { $in: foodItemIds } });
      // Build the array of objects containing food item details and quantities
      const foodItemDetails = foodItems.map(foodItem => {
        const quantity = cartItem.cartitems.get(foodItem._id);
        return { ...foodItem.toObject(), quantity };
      });

      res.json(foodItemDetails);
    }
    catch(e){
        res.json("error fetching order list")
    }
  });

  // Update the status of order.
  app.put('/restaurant/:restaurantId/order/:orderId', (req, res) => {
    const { restaurantId, orderId } = req.params;
    const { status } = req.body;
  
    // Assuming you have a 'status' field in your Order schema
    Cart.findByIdAndUpdate(
      orderId,
      { status: status }, // Update the 'status' field to the new value
      { new: true } // Return the updated order after the update is done
    )
      .then(updatedOrder => {
        if (updatedOrder) {
          res.json('updated'); // Send a response to indicate the order was updated
        } else {
          res.status(404).json('Order not found'); // If order not found
        }
      })
      .catch(error => {
        console.error('Error while updating order:', error);
        res.status(500).json('Error while updating order');
      });
  });

  
  // Get a single food item by ID
  app.get('/restaurant/:restaurant_id/fooditem/:fooditem_id', async (req, res) => {
    try {
      const foodItem = await fooditem.findById(req.params.fooditem_id);
  
      if (!foodItem) {
        return res.status(404).json({ error: 'Food item not found' });
      }
  
      res.json(foodItem);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // Update a food item
  app.put('/restaurant/:restaurant_id/fooditem/:fooditem_id', async (req, res) => {
    try {
      const { name, quantity, description, price, restaurantId } = req.body;
  
      const foodItem = await fooditem.findByIdAndUpdate(req.params.fooditem_id, {
        name,
        quantity,
        description,
        price,
        restaurant: restaurantId
      }, { new: true });
  
      if (!foodItem) {
        return res.status(404).json({ error: 'Food item not found' });
      }
  
      res.json(foodItem);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // Delete a food item
  app.delete('/restaurant/:restaurant_id/fooditem/:fooditem_id', async (req, res) => {
    try {
      const foodItem = await fooditem.findByIdAndRemove(req.params.fooditem_id);
  
      if (!foodItem) {
        return res.status(404).json({ error: 'Food item not found' });
      }
  
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  


  app.listen(8001,()=>{
    console.log("port connected");
})