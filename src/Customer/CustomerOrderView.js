import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  styled  from 'styled-components';
import {Link, useParams} from 'react-router-dom';


const CustomerOrderView = () => {
    const [products, setProducts] = useState([]);
    const { orderId, customerId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8001/customer/${customerId}/order/${orderId}`)
          .then(response => {
            setProducts(response.data);
          })
          .catch(error => {
            console.error('Error fetching cart items:', error);
          });
      }, [customerId, orderId]);
  return (
    <Container>
    <div className='hero'>
          <img 
              src='https://images.pexels.com/photos/1310777/pexels-photo-1310777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              className='background-image'
              alt="bgImage" />
        <div className='home'>
        <div className='container'>
            <div className='add_restaurant'>
            <Link className='btn_back' to={`/customer/${customerId}/orders`}>Back</Link>
            <h1 className='res_listing'>Cart Items</h1>
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
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan="4">No record found</td>
                      </tr>
                    ) : (
                    products.map(product => (
                        <tr key={product._id}>
                        <td className='hed_deta'>{product.name}</td>
                        <td className='hed_deta'>{product.quantity}</td>
                        <td className='hed_deta'>{product.price}</td>
                        <td className='hed_deta'>{product.price*product.quantity}</td>
                        </tr>
                    )))}
                    </tbody>
                </table>
        </div>
        </div>
    </Container>
  );
};

export default CustomerOrderView;


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
  margin-left: 1rem
}
  .add_restaurant{
    display: flex;
    // margin-top: 0;
    align-items: center;
    justify-content: center;
  }
.res_listing{
  display: flex;
  font-size: 3rem;
  font-weight: bold;
  margin: auto;
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
  margin-right: 70rem;  
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
    margin-top: 55px;
    margin-left: 180px;
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


  

