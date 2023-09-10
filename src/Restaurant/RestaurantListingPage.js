import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  styled  from 'styled-components';
import { Link } from 'react-router-dom';

window.onpopstate = function () {
  // Revert the state change to prevent going back
  window.history.forward();
};
const RestaurantListing = () => {
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
    <Container>
    <div className='hero'>
    <img 
        src='https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=2000'
        className='background-image'
        alt="bgImage" />
<div className="home">
        <div className='container'>
            <div className='add_restaurant'>
            <h1 className='res_listing'>Restaurant Listing</h1>
              <Link className='btn_add_restaurant' to={`/restaurantSignup`}>Add New Restaurant</Link>
            </div>
            </div>
                <table className='table_det'>
                    <thead>
                    <tr className='head_det'>
                        <th className='heddeta'>Name</th>
                        <th className='heddeta'>Address</th>
                        <th className='heddeta'>Opening Time</th>
                        <th className='heddeta'>Closing Time</th>
                        <th className='heddeta'>View</th>
                    </tr>
                    </thead>
                    <tbody>
                    {restaurants.length === 0 ? (
                      <tr>
                        <td colSpan="5">No record found</td>
                      </tr>
                    ) : (
                    restaurants.map(restaurant => (
                        <tr key={restaurant._id}>
                        <td className='hed_deta'>{restaurant.name}</td>
                        <td className='hed_deta'>{restaurant.address}</td>
                        <td className='hed_deta'>{restaurant.opening_time}</td>
                        <td className='hed_deta'>{restaurant.closing_time}</td>
                        <td className='hed_deta_link'>
                          <Link className='hed_deta_food' to={`/restaurant/${restaurant._id}/foodItemListing`}>Food Items</Link>
                          <Link className='hed_deta_order' to={`/restaurant/${restaurant._id}/orders`}>Orders</Link>
                          </td>
                        </tr>
                    )))}
                    </tbody>
                </table>
        </div>
        </div>
    </Container>
  );
};

export default RestaurantListing;


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
    top: 1rem;
    margin-left: 7rem
}

  .add_restaurant{
    // display: flex;
    margin-top: 0px;
    align-items: center;
    justify-content: center;
  }
.res_listing{
  // display: flex;
  margin-left: 180px;
  // margin-top: 30px;
  // margin:auto;
  font-size: 3rem;
  font-weight: bold;
  color: white;
  align-items: center;
  justify-content: center;
}
.btn_add_restaurant{
  position: absolute;
  // display: flex;
  font-size: 1rem;
  margin-left: 55rem;
  width: 180px;
  height: 35px;
  text-decoration: none;
  cursor: pointer;
  float: right;
  font-weight: bold;
  border: 1px solid black;
  align-items: center;
  border-radius: 10px;
  justify-content: center;
  background-color: skyblue;
  color: black;
}
.table_det{
    width: 1000px;
    font-size: 1.5rem;
    margin-top: 55px;
    margin-left: 100px;
    border: 1px solid grey;
    text-align: center;
    justify-content: center;
}
.head_det{
    background-color: lightgrey;;
}
.heddeta{
  border: 1px solid black;
  background-color: lightgrey;;
}
.hed_deta{
    border: 1px solid black;
    background-color: #e6ffff;
}
.hed_deta_link{
  height: 55px;
    border: 1px solid black;
    background-color: #e6ffff;

    margin: 2px 2px 2px 2px;
    justify-content: center;
}
.hed_deta_food{
  width: 60px;
  height: 35px;
  font-size: 1.2rem;
  padding: 3px;
  border: 1px solid black;
  text-decoration: none;
  font-weight: bold;
  margin: 2px 2px 2px 2px;
  background-color: skyblue;
  color: black;
  text-align: center;
  border-radius: 10px;
  justify-content: center;
}
.hed_deta_order{
  width: 80px; 
  height: 35px;
  font-size: 1.2rem;
  padding: 3px 15px 3px 15px;
  border: 1px solid black;
  text-decoration: none;
  font-weight: bold;
  margin: 2px 2px 2px 2px;
  background-color: skyblue;
  color: black;
  text-align: center;
  border-radius: 10px;
  justify-content: center;
}
`;