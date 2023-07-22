import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CustomerSignup from './Customer/SignupPage'
import CustomerLogin from './Customer/LoginPage'
import CustomerHome from './Customer/HomePage'
import CustomerFoodItem from './Customer/FoodItems'
import OrderPlacedHome from './Customer/OrderPlacedHome'
import OrderedList from './Customer/OrderedList'
import CustomerOrderView from './Customer/CustomerOrderView'

import RestaurantSignup from './Restaurant/SignupPage'
import RestaurantListing from './Restaurant/RestaurantListingPage'
import FoodItem from './Restaurant/FoodItemPage'
import UpdateFoodItem from './Restaurant/UpdateFoodItemPage'
import FoodItemsListing from './Restaurant/FoodItemsListingPage'
import RestaurantOrderList from './Restaurant/RestaurantOrderList'
import RestaurantOrderView from './Restaurant/RestaurantOrderView'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/customerSignup' element={< CustomerSignup />}/>
        <Route exact path='/login' element={< CustomerLogin />}/>
        <Route exact path='/customer/:customerId/restaurants' element={< CustomerHome />}/>
        <Route exact path='/customer/:customerId/restaurant/:restaurantId/fooditems' element={< CustomerFoodItem />}/>
        <Route exact path='/customer/:customerId/order/success' element={< OrderPlacedHome />}/>
        <Route exact path='/customer/:customerId/orders' element={< OrderedList />}/>
        <Route exact path='/customer/:customerId/order/:orderId' element={< CustomerOrderView />}/>


        <Route exact path='/restaurantSignup' element={< RestaurantSignup />}/>
        <Route exact path='/restaurantListing' element={< RestaurantListing />}/>
        <Route exact path='/restaurant/:restaurantId/addFoodItem' element={< FoodItem />}/>
        <Route exact path='/restaurant/:restaurantId/updateFoodItem/:foodItemId' element={< UpdateFoodItem />}/>
        <Route exact path='/restaurant/:restaurantId/foodItemListing' element={< FoodItemsListing />}/>
        <Route exact path='/restaurant/:restaurantId/orders' element={< RestaurantOrderList />}/>
        <Route exact path='/restaurant/:restaurantId/order/:orderId' element={< RestaurantOrderView />}/>
      </Routes>
    </BrowserRouter>
  )
}
