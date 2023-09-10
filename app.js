const swaggerUi = require("swagger-ui-express");
const specs = require("./swaggerOptions.js"); // Import the Swagger configuration
const express = require("express")
const Customer = require("./customer_schema")
const Restaurant = require("./restaurant_schema")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const fooditem = require('./fooditem_schema');
const Order = require('./order_schema')


app.get("/",cors(),(req,res)=>{

})


/**
 * @swagger
 * /customerLogin:
 *   post:
 *     summary: Customer Login
 *     description: Authenticate a customer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /customerSignup:
 *   post:
 *     summary: Customer Signup
 *     description: Create a new customer account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile_number:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer added successfully
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Error while creating a new customer
 */
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

/**
 * @swagger
 * /restaurantSignup:
 *   post:
 *     summary: Restaurant Signup
 *     description: Create a new restaurant account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               opening_time:
 *                 type: string
 *               closing_time:
 *                 type: string
 *     responses:
 *       200:
 *         description: Restaurant added successfully
 *       409:
 *         description: Restaurant with this name already exists
 *       500:
 *         description: Error while creating this restaurant
 */
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


/**
 * @swagger
 * /restaurantListing:
 *   get:
 *     summary: Get Restaurant Listing
 *     description: Get a list of all restaurants.
 *     responses:
 *       200:
 *         description: Successful retrieval of restaurant list
 *       500:
 *         description: Error while fetching the restaurant list
 */
app.get("/restaurantListing",async(req,res)=>{
    try{
        const restaurants=await Restaurant.find({})
        res.json(restaurants)
    }
    catch(e){
        res.json("error while fetching restaurant list")
    }
})


/**
 * @swagger
 * /customer/checkout/:
 *   post:
 *     summary: Add Food Item to Cart
 *     description: Add food items to a customer's cart.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *               restaurantId:
 *                 type: string
 *               cartItems:
 *                 type: object
 *     responses:
 *       200:
 *         description: Order placed successfully
 *       500:
 *         description: Error while creating this restaurant
 */
app.post('/customer/checkout/', async (req, res) => {
try{
  const {customerId, restaurantId, cartItems}=req.body

  const data = {
    customer:customerId,
    restaurant:restaurantId,
    cartitems:cartItems
  }
    Order.insertMany([data]) 
    res.json("success")
}
catch(e){
    res.json("error while placing order")
}

});


/**
 * @swagger
 * /restaurant/{restaurant_id}/fooditems:
 *   post:
 *     summary: Add Food Item to Restaurant
 *     description: Add a new food item to a restaurant's menu.
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         required: true
 *         description: The ID of the restaurant.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: number
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               restaurantId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Food item added successfully
 *       '409':
 *         description: Food item with this name already exists under this restaurant
 *       '500':
 *         description: Error while adding the food item
 */
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
  


/**
 * @swagger
 * /restaurant/{restaurant_id}/fooditems:
 *   get:
 *     summary: Get All Food Items in Restaurant
 *     description: Get a list of all food items in a restaurant's menu.
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         required: true
 *         description: The ID of the restaurant.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful retrieval of food items
 *       '500':
 *         description: Error while fetching food items
 */
  app.get('/restaurant/:restaurant_id/fooditems', async (req, res) => {
    try{
        const foodItems=await fooditem.find({restaurant: req.params.restaurant_id})
        res.json(foodItems)
    }
    catch(e){
        res.json("error fetching food items")
    }
  });



  /**
 * @swagger
 * /customer/{customer_id}/orders:
 *   get:
 *     summary: Get Customer Orders
 *     description: Get a list of orders placed by a customer.
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         description: The ID of the customer.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful retrieval of customer orders
 *       '500':
 *         description: Error while fetching order list
 */
  app.get('/customer/:customer_id/orders', async (req, res) => {
    try{
      const cartItems = await Order.find({ customer: req.params.customer_id })
      .populate("customer").populate("restaurant");
      res.json(cartItems)
    }
    catch(e){
        res.json("error fetching order list")
    }
  });


/**
 * @swagger
 * /restaurant/{restaurant_id}/orders:
 *   get:
 *     summary: Get Restaurant Orders
 *     description: Get a list of orders received by a restaurant.
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         required: true
 *         description: The ID of the restaurant.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful retrieval of restaurant orders
 *       '500':
 *         description: Error while fetching order list
 */
  app.get('/restaurant/:restaurant_id/orders', async (req, res) => {
    try{
      const cartItems = await Order.find({ restaurant: req.params.restaurant_id })
      .populate("customer").populate("restaurant");
      res.json(cartItems)
    }
    catch(e){
        res.json("error fetching order list")
    }
  });


/**
 * @swagger
 * /restaurant/{restaurant_id}/order/{order_id}:
 *   get:
 *     summary: Get Order Details for Restaurant
 *     description: Get details of a specific order received by a restaurant.
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         required: true
 *         description: The ID of the restaurant.
 *         schema:
 *           type: string
 *       - in: path
 *         name: order_id
 *         required: true
 *         description: The ID of the order.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful retrieval of order details
 *       '500':
 *         description: Error while fetching order details
 */
  app.get('/restaurant/:restaurant_id/order/:order_id', async (req, res) => {
    try{
      const cartItem = await Order.findOne({_id:req.params.order_id })
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


/**
 * @swagger
 * /customer/{customer_id}/order/{order_id}:
 *   get:
 *     summary: Get Order Details for Customer
 *     description: Get details of a specific order placed by a customer.
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         description: The ID of the customer.
 *         schema:
 *           type: string
 *       - in: path
 *         name: order_id
 *         required: true
 *         description: The ID of the order.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful retrieval of order details
 *       '500':
 *         description: Error while fetching order details
 */
  app.get('/customer/:customer_id/order/:order_id', async (req, res) => {
    try{
      const cartItem = await Order.findOne({_id:req.params.order_id })
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


  /**
 * @swagger
 * /restaurant/{restaurantId}/order/{orderId}:
 *   put:
 *     summary: Update Order Status
 *     description: Update the status of a restaurant order.
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         description: The ID of the restaurant.
 *         schema:
 *           type: string
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: The ID of the order.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Order status updated successfully
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Error while updating order status
 */
app.put('/restaurant/:restaurantId/order/:orderId', (req, res) => {
    const { restaurantId, orderId } = req.params;
    const { status } = req.body;
  
    // Assuming you have a 'status' field in your Order schema
    Order.findByIdAndUpdate(
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



/**
 * @swagger
 * /restaurant/{restaurant_id}/fooditem/{fooditem_id}:
 *   get:
 *     summary: Get Food Item by ID
 *     description: Get details of a specific food item by ID.
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         required: true
 *         description: The ID of the restaurant.
 *         schema:
 *           type: string
 *       - in: path
 *         name: fooditem_id
 *         required: true
 *         description: The ID of the food item.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful retrieval of food item details
 *       '404':
 *         description: Food item not found
 *       '500':
 *         description: An error occurred while fetching food item details
 */  
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
  

/**
 * @swagger
 * /restaurant/{restaurant_id}/fooditem/{fooditem_id}:
 *   put:
 *     summary: Update Food Item
 *     description: Update the details of a food item.
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         required: true
 *         description: The ID of the restaurant.
 *         schema:
 *           type: string
 *       - in: path
 *         name: fooditem_id
 *         required: true
 *         description: The ID of the food item.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: number
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               restaurantId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Food item updated successfully
 *       '404':
 *         description: Food item not found
 *       '500':
 *         description: An error occurred while updating food item details
 */
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
  


/**
 * @swagger
 * /restaurant/{restaurant_id}/fooditem/{fooditem_id}:
 *   delete:
 *     summary: Delete Food Item
 *     description: Delete a food item.
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         required: true
 *         description: The ID of the restaurant.
 *         schema:
 *           type: string
 *       - in: path
 *         name: fooditem_id
 *         required: true
 *         description: The ID of the food item.
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Food item deleted successfully
 *       '404':
 *         description: Food item not found
 *       '500':
 *         description: An error occurred while deleting food item
 */
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

// Serve the Swagger UI at a specific endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  app.listen(8001,()=>{
    console.log("port connected");
})