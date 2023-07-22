import React, { useState, useEffect } from 'react';
import {Link,  useParams } from 'react-router-dom';
import axios from 'axios';
import  styled  from 'styled-components';



const Orders = () => {
  const [orders, setOrderList] = useState([]);
  const { customerId} = useParams();


  useEffect(() => {
    axios.get(`http://localhost:8001/customer/${customerId}/orders`)
      .then(response => {
        setOrderList(response.data);
      })
      .catch(error => {
        console.error('Error fetching food items data:', error);
      });
  }, [customerId]);

  const formatDate = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
  
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };
  

  return (
    <Container>
        <div className='container'>
            <div className='add_food'>
            <Link className='btn_back' to={`/customer/${customerId}/restaurants`}>Back</Link>
            <h1 className='res_listing'>Past Orders</h1>
            </div>
                <table className='table_det'>
                    <thead>
                    <tr className='head_det'>
                        <th className='heddeta'>Order Reference No.</th>
                        <th className='heddeta'>Restaurant Name</th>
                        <th className='heddeta'>Placed On</th>
                        <th className='heddeta'>View</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                          <td className='hed_deta'>{order.OrderReferenceNumber}</td>
                          <td className='hed_deta'>{order.restaurant.name}</td>
                          <td className='hed_deta'>{formatDate(`${order.PlacedOn}`)}</td>
                          <td className='hed_deta'>
                            <Link className='btn_view_order' to={`/customer/${customerId}/order/${order._id}`}>View</Link>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                
        </div>
    </Container>
  );
};

export default Orders;


const Container = styled.div`
.container {
  // background: url("./images/food.jpg");
  // background-size:contain;
  //   background-position:top;
  //   background: cover;
    // background: lightgreen;
  }
  .add_food{
    display: flex;
    align-items: center;
    justify-content: center;
  }
.res_listing{
    display: flex;
    font-size: 3rem;
    font-weight: bold;
    margin: auto;
    color: #990000;
    align-items: center;
    justify-content: center;
}
.btn_back{
  display: flex;
  width: 70px;
  height: 35px;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 40px;
  font-weight: bold;
  text-decoration: none;
  border: 1px solid black;
  align-items: center;
  border-radius: 5px;
  justify-content: center;
  background-color: #33adff;
  color: black;
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
  width: 100px;
  height: 25px;
  margin: 2px 2px 2px 20px;
}
.head_det{
    background-color: lightgrey;;
}
.hed_deta{
    border: 1px solid black;
    background-color: #e6ffff;
}
.heddeta{
  border: 1px solid black;
  background-color: lightgrey;;
}
.btn_view_order{
  display: flex;
  width: 80px;
  height: 30px;
  margin: 7px 7px 7px 20px;
  padding: 3px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  border: 1px solid black;
  background-color: #99e699;
  color: black;
  cursor: pointer;
}


`;