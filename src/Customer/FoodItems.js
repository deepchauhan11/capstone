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
    <div className='hero'>
          <img 
              src='https://images.pexels.com/photos/1310777/pexels-photo-1310777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              className='background-image'
              alt="bgImage" />
        <div className='home'>
        <div>
            <div className='add_food'>
            <Link className='btn_back' to={`/customer/${customerId}/restaurants`}>Back</Link>
            
            <button className='btn_checkout'
            onClick={() => checkout()}
            disabled={Object.keys(cartItems).length === 0}
            >Checkout</button>
            <div>
            <h1 className='res_listing'>Food Items Listing</h1>
            </div>
            </div>
            </div>
                <section id="services-container">
                  <div id="services">
                  {fooditems.map(fooditem => (
                      <div class="box">
                          <img src="https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                          <h2 class="h-secondary center">{fooditem.name}</h2>
                          <p>Description : {fooditem.description}</p>
                          <p>Price : {fooditem.price}</p>
                          <p className='quantity'>Quantity:<span> <input
                          className='input_quantity'
                          type='number'
                          value={quantity[fooditem._id] }
                          onChange={(e) => handleQuantityChange(fooditem._id, parseInt(e.target.value, 10))}
                        /></span></p>
                        
                        <button className='btn_addcart' onClick={() => handleAddToCart(fooditem._id)}>Add To Cart</button>
                        {isItemInCart(fooditem._id) && (
                          <button className='btn_removecart' onClick={() => handleRemoveFromCart(fooditem._id)}>Remove from Cart</button>
                        )}
                        
                      </div>
                      ))}
                    
                  </div>
                </section>
                
        </div>
        </div>
    </Container>
  );
};

export default FoodItems;


const Container = styled.div`
.hero{
  position: relative;
}
.background-image{
  object-fit: cover;
}
img{
  width: 100vw;
  height: 100%;
}
.home{
  position: absolute;
  top: 3rem;
    margin-left: 7rem
}

  .add_food{
    // align-items: center;
    justify-content: center;
  }
  .btn_checkout{
    position: absolute;
    display: flex;
    margin-left: 70rem; 
    top: 0;
  width: 100px;
  height: 33px;
  cursor: pointer;
  font-weight: bold;
  border: 1px solid black;
  align-items: center;
  border-radius: 5px;
  justify-content: center;
  background-color: red;
  color: black;
  }
.res_listing{
    font-size: 3rem;
    font-weight: bold;
    color: white;
    
}
.table_det{
    width: 1000px;
    font-size: 1.5rem;
    margin-top: 25px;
    margin-left: 180px;
    border: 1px solid grey;
    // text-align: center;
    // justify-content: center;
}
.input_quantity{
  display: flex;
  width: 120px;
  height: 25px;
  margin: 2px 2px 2px 20px;
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
  width: 100px;
  height: 30px;
  padding: 3px;
  margin: 10px 80px;
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
  width: 148px;
  height: 38px;
  margin: auto;
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

#services{
  margin: auto;
  display: grid;
  grid-template-columns: 400px 400px 400px;
}
#services .box{ 
  width: 20rem;
  border: 2px solid brown;
  padding: 34px;
  margin: auto;
  border-radius: 28px;
  background: #f2f2f2;
  margin-bottom: 20px;
}

#services .box img{ 
 height: 160px;
 width: 250px;
}

#services .box h2{
margin: 7px ;
  font-family: 'Bree Serif', serif;

} 

.quantity{
display: flex;
} 
.timing{
margin-bottom: 12px;
} 

`;