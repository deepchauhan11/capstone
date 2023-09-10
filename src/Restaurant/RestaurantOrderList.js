
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  styled  from 'styled-components';
import { Link, useParams } from 'react-router-dom';

const RestaurantOrderList = () => {
  const [orders, setOrders] = useState([]);
  const { customerId, restaurantId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8001/restaurant/${restaurantId}/orders`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching restaurant data:', error);
      });
  }, [restaurantId]);

  const AcceptOrder = (order_id) => {
        // Prepare the data to send in the request body
        const requestData = {
            status: 'accepted'
        };

        // Refresh the orders after accepting
        axios.put(`http://localhost:8001/restaurant/${restaurantId}/order/${order_id}`, requestData)
            .then(response => {
            if (response.data === 'updated') {
                alert('Order has been successfully accepted');
                window.location.reload();
            }
            })
            .catch(error => {
            console.error('Error while accepting order:', error);
            });
      }
  const RejectOrder = (order_id) => {
        // Prepare the data to send in the request body
        const requestData = {
            status: 'rejected'
        };

        // Refresh the orders after accepting
        axios.put(`http://localhost:8001/restaurant/${restaurantId}/order/${order_id}`, requestData)
            .then(response => {
            if (response.data === 'updated') {
                alert('Order has been rejected');
            }
            })
            .catch(error => {
            console.error('Error while accepting order:', error);
            });
      }


  return (
    <Container>
    <div className='hero'>
          <img 
              src='https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png'
              className='background-image'
              alt="bgImage" />
              <div className="home">
        <div className='container'>
            <div className='add_restaurant'>
            <Link className='btn_back' to={`/restaurantListing`}>Back</Link>
            <h1 className='res_listing'>Orders Listing</h1>
            </div>
            </div>
                <table className='table_det'>
                    <thead>
                    <tr className='head_det'>
                        <th className='heddeta'>Customer Name</th>
                        <th className='heddeta'>Order Reference No.</th>
                        <th className='heddeta'>Placed On</th>
                        <th className='heddeta'>Status</th>
                        <th className='heddeta'>Action</th>

                    </tr>
                    </thead>
                    <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan="5">No record found</td>
                      </tr>
                    ) : (
                    orders.map(order => (
                        <tr key={order._id}>
                        <td className='hed_deta'>{order.customer.name}</td>
                        <td className='hed_deta'>{order.OrderReferenceNumber}</td>
                        <td className='hed_deta'>{order.PlacedOn}</td>
                        <td className='hed_deta' style={{textTransform: 'capitalize'}}>{order.status}</td>
                        <td className='hed_deta_action'>
                        <Link className='btn_view' to={`/restaurant/${restaurantId}/order/${order._id}`}>View</Link>
                            <button 
                            className='btn_accept' 
                            onClick={() => AcceptOrder(order._id)}
                            disabled={order.status !== "pending"}
                            >Accept</button>

                            <button 
                            className='btn_reject' 
                            onClick={() => RejectOrder(order._id)}
                            disabled={order.status !== "pending"}
                            >Reject</button>
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

export default RestaurantOrderList;


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
    // margin-left: 7rem;
}

  .add_restaurant{
    display: flex;
    align-items: center;
    margin-top: 0;
    justify-content: center;
  }
  .btn_back{
    position: absolute;
    display: flex;
    width: 70px;
    height: 35px;
    cursor: pointer;
    font-size: 1.2rem;
    margin-right: 80rem;
    font-weight: bold;
    text-decoration: none;
    border: 1px solid black;
    align-items: center;
    border-radius: 7px;
    justify-content: center;
    background-color: #33adff;
    color: black;
  }
.res_listing{
  display: flex;
  font-size: 3rem;
  margin: auto;
  font-weight: bold;
  color: white;
  align-items: center;
  justify-content: center;
}

.table_det{
    width: 1000px;
    font-size: 1.5rem;
    margin-left: 100px;
    margin-top: 40px;
    border: 1px solid grey;
    text-align: center;
    justify-content: center;
}
.head_det{
  background-color: #e6ffff;
}
.heddeta{
  border: 1px solid black;
  background-color: lightgrey;
}
.hed_deta{
  border: 1px solid black;
  background-color: #e6ffff;
    
}
.hed_deta_view{
  text-decoration: none;
  background-color: #e6ffff;

}
.hed_deta_action{
    display: flex;
    border: 1px solid black;
    background-color: #e6ffff;
}
.btn_accept{
    width: 70px;
    height: 30px;
    margin: 17px 7px 17px 7px;
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
  .btn_view{
    width: 70px;
    height: 30px;
    margin: 17px 5px 5px 10px;
    padding: 3px;
    font-weight: bold;
    text-decoration: none;
    border-radius: 5px;
    align-items: center;
    font-size: 1rem;
    border: 1px solid black;
    background-color: #99e699;
    color: black;
    cursor: pointer;
  }
.btn_reject{
    width: 70px;
    height: 30px;
    margin: 17px 7px 17px 7px;
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

