import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import './Home.css'

function Home() {
  const {customerId} = useParams();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8001/restaurantListing')
      .then(response => {
        setRestaurants(response.data);
      })
      .catch(error => {
        console.error('Error fetching restaurant data:', error);
      });
  }, []);

  return (
    <div className='hero'>
          <img 
              src='https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png'
              className='background-image'
              alt="bgImage" />
      <div className="home">
        <Link className='btn_add_restaurant' to={`/customer/${customerId}/orders`}>Past Orders</Link>
        <h1 className="add_restaurant">Welcome </h1>
        <p className="res_listing">Please choose your favourite food from the following restaurants</p>
      <div>
         
         

 </div>
 <section id="services-container">
        <div id="services">
        {restaurants.map(restaurant => (
            <div class="box">
                <img src="https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                <h2 class="h-secondary center">{restaurant.name}</h2>
                <p class="center">{restaurant.address}</p>
                <p class="timing">{restaurant.opening_time} - {restaurant.closing_time}</p>
                <Link className='btn-order' to={`/customer/${customerId}/restaurant/${restaurant._id}/fooditems`}>Create an order</Link>

            </div>
            ))}
          
        </div>
    </section>
      </div>
 </div>

    

  );
}

export default Home;
