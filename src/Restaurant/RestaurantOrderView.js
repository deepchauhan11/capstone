import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  styled  from 'styled-components';
import {Link, useParams} from 'react-router-dom';


const RestaurantOrderView = () => {
    const [items, setItems] = useState([]);
    const { orderId, restaurantId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8001/restaurant/${restaurantId}/order/${orderId}`)
          .then(response => {
            setItems(response.data);
          })
          .catch(error => {
            console.error('Error fetching cart items:', error);
          });
      }, [restaurantId, orderId]);
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
            <Link className='btn_back' to={`/restaurant/${restaurantId}/orders`}>Back</Link>
            <h1 className='res_listing'>Ordered Items</h1>
            </div>
            </div>
                <table className='table_det'>
                    <thead>
                    <tr className='head_det'>
                        <th className='heddeta'>Name</th>
                        <th className='heddeta'>Quantity</th>
                        <th className='heddeta'>Price</th>
                        <th className='heddeta'>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map(item => (
                        <tr key={item._id}>
                        <td className='hed_deta'>{item.name}</td>
                        <td className='hed_deta'>{item.quantity}</td>
                        <td className='hed_deta'>{item.price}</td>
                        <td className='hed_deta'>{item.price*item.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
        </div>
        </div>
    </Container>
  );
};

export default RestaurantOrderView;


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
    top: 2rem;
    // margin-left: 7rem;
}

  .add_restaurant{
    display: flex;
    margin-top: 0;
    align-items: center;
    justify-content: center;
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
.btn_back{
  position: absolute;
  display: flex;
  width: 70px;
  height: 35px;
  cursor: pointer;
  font-size: 1.2rem;
  margin-right: 85rem;
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
    margin-left: 90px;
    margin-top: 40px;
    border: 1px solid grey;
    text-align: center;
    justify-content: center;
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
.hed_deta_view{
  text-decoration: none;

}
`;


  

