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
    <div>
      <Link className='btn_add_restaurant' to={`/customer/${customerId}/orders`}>Past Orders</Link>
      <h1 className="add_restaurant">Welcome </h1>
      <p className="res_listing">Please choose your favourite food from the following restaurants</p>
     <div>
         <table className='table_det'>
             <thead>
             <tr className='head_det'>
                 <th className='heddeta'>Name</th>
                 <th className='heddeta'>Address</th>
                 <th className='heddeta'>Opening Time</th>
                 <th className='heddeta'>Closing Time</th>
                 <th className='heddeta'>Action</th>
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
                 <td className='hed_deta'>
                  <Link className='hed_deta_view' to={`/customer/${customerId}/restaurant/${restaurant._id}/fooditems`}>Create an order</Link></td>
                 </tr>
             )))}
             </tbody>
         </table>
 </div>
 </div>

    

  );
}

export default Home;
