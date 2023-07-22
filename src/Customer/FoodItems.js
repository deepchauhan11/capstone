import React, { useState, useEffect } from 'react';
import {Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import  styled  from 'styled-components';



const FoodItems = () => {
  const [fooditems, setFoodItems] = useState([]);
  const { customerId, restaurantId } = useParams();
  const [cartItems, setCartItems] = useState({});

  const history=useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8001/restaurant/${restaurantId}/fooditems`)
      .then(response => {
        setFoodItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching food items data:', error);
      });
  }, [restaurantId]);

  // Function to check if a food item is in the cart
  const isItemInCart = fooditem_id => {
    return cartItems[fooditem_id] > 0;
  };

  // State to keep track of quantity for each food item
  const [quantity, setQuantity] = useState({});

  const handleAddToCart = (fooditem_id) => {
    const quantityValue = quantity[fooditem_id] || 0;
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [fooditem_id]: (prevCartItems[fooditem_id] || 0) + quantityValue,
    }));
  };

  const handleRemoveFromCart = (fooditem_id) => {
    quantity[fooditem_id] = ''
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      delete newCartItems[fooditem_id];
      return newCartItems;
    });    
  };

  const handleQuantityChange = (fooditem_id, value) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [fooditem_id]: value,
    }));
  };

  const checkout = async () => {
    await axios.post(`http://localhost:8001/customer/checkout/`,{
      "customerId": customerId,
      "restaurantId": restaurantId,
      cartItems
  })
            .then(res=>{
                if(res.data==="success"){
                  history(`/customer/${customerId}/order/success`)
                }
                else if(res.data==="invalid"){
                  alert("Order Not Success")
              }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })
  }

  return (
    <Container>
        <div>
            <div className='add_food'>
            <Link className='btn_back' to={`/customer/${customerId}/restaurants`}>Back</Link>
            <h1 className='res_listing'>Food Items Listing</h1>
            
              <button className='btn_checkout'
               onClick={() => checkout()}
               disabled={Object.keys(cartItems).length === 0}
               >Checkout</button>
            
            
            </div>
                <table className='table_det'>
                    <thead>
                    <tr className='head_det'>
                        <th className='hed_deta'>Name</th>
                        <th className='hed_deta'>Description</th>
                        <th className='hed_deta'>Price</th>
                        <th className='hed_deta'>Quantity</th>
                        <th className="hed_deta">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {fooditems.length === 0 ? (
                      <tr>
                        <td colSpan="5">No record found</td>
                      </tr>
                    ) : (
                    fooditems.map(fooditem => (
                        <tr key={fooditem._id}>
                          <td className='hed_deta'>{fooditem.name}</td>
                          <td className='hed_deta'>{fooditem.description}</td>
                          <td className='hed_deta'>{fooditem.price}</td>
                          <td className='hed_deta'>
              <input
                className='input_quantity'
                type='number'
                value={quantity[fooditem._id] }
                onChange={(e) => handleQuantityChange(fooditem._id, parseInt(e.target.value, 10))}
              />
            </td>
            <td className='hed_deta'>
              <button className='btn_addcart' onClick={() => handleAddToCart(fooditem._id)}>Add To Cart</button>
              {isItemInCart(fooditem._id) && (
                <button className='btn_removecart' onClick={() => handleRemoveFromCart(fooditem._id)}>Remove from Cart</button>
              )}
            </td>
                        </tr>
                    )))}
                    </tbody>
                </table>
                
        </div>
    </Container>
  );
};

export default FoodItems;


const Container = styled.div`
body {
  background: url("./images/food.jpg");
  background-size:contain;
    background-position:top;
    background: cover;
    // background-color: #fafafa;
  }
  .add_food{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn_checkout{
    display: flex;
  margin-left: 250px;
  width: 100px;
  height: 33px;
  cursor: pointer;
  float: right;
  font-weight: bold;
  border: 1px solid black;
  align-items: center;
  border-radius: 5px;
  justify-content: center;
  background-color: red;
  color: black;
  }
.res_listing{
    display: flex;
    margin-left: 330px;
    font-size: 3rem;
    font-weight: bold;
    color: #990000;
    align-items: center;
    justify-content: center;
}
.table_det{
    width: 1000px;
    font-size: 1.5rem;
    margin-top: 25px;
    margin-left: 180px;
    border: 1px solid grey;
    text-align: center;
    justify-content: center;
}
.input_quantity{
  display: flex;
  width: 120px;
  height: 25px;
  margin: 2px 2px 2px 20px;
}
.head_det{
    background-color: lightgrey;;
}
.hed_deta{
    border: 1px solid black;
}
.btn_back{
  display: flex;
  width: 70px;
  height: 35px;
  cursor: pointer;
  font-size: 1.2rem;
  margin: 10px;  
  font-weight: bold;
  text-decoration: none;
  border: 1px solid black;
  align-items: center;
  border-radius: 5px;
  justify-content: center;
  background-color: #33adff;
  color: black;
}

.btn_update{
  display: flex;
  width: 100px;
  height: 30px;
  margin: 5px 5px 5px 25px;
  padding: 3px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  align-items: center;
  font-size: 1rem;
  border: 1px solid black;
  background-color: #0385f6;
  color: black;
  cursor: pointer;
}
.btn_addcart{
  display: flex;
  width: 100px;
  height: 30px;
  margin: 5px 5px 5px 25px;
  padding: 3px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  align-items: center;
  font-size: 1rem;
  border: 1px solid black;
  background-color: #0385f6;
  color: black;
  cursor: pointer;
}
.btn_removecart{
  display: flex;
  width: 100px;
  height: 35px;
  margin: 5px 5px 5px 25px;
  padding: 3px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  align-items: center;
  font-size: 1rem;
  border: 1px solid black;
  background-color: red;
  color: black;
  cursor: pointer;
}

`;