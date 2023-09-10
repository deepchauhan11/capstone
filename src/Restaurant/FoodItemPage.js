import React, { useState, useEffect } from 'react';
import {Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import  styled  from 'styled-components';

const FoodItemsPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const { restaurantId } = useParams();
  const [quantity, setQuantity] = useState('');
  const history=useNavigate();


  const createFoodItem = (event) => {
    event.preventDefault();


    // Make an API request to update the food item
    axios
      .post(`http://localhost:8001/restaurant/${restaurantId}/fooditems`,  {
        name,
        quantity,
        description,
        price,
        restaurantId
      })
      .then((response) => {
        // Handle the successful update, e.g., show a success message or navigate back to the listing page
        console.log('Food item updated successfully');
        history(`/restaurant/${restaurantId}/foodItemListing`)
      })
      .catch((error) => {
        // Handle the error, e.g., show an error message
        console.error('Error updating food item:', error);
      });
  };

  return (
    <Container>
    <div className='hero'>
    <img 
        src='https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=2000'
        className='background-image'
        alt="bgImage" />
      <div className="home">
      <div>
      <Link className='btn_back' to={`/restaurant/${restaurantId}/foodItemListing`}>Back</Link>
        <h1 className='food_items'>Add Food Item</h1>
        </div>
          <form onSubmit={createFoodItem} className='table_det'>
            <div className='form_container'>
            <label>
              Name:
              <input className='inp_det_1' type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label>
              Description:
              <input className='inp_det_2' type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <br />
            <label>
              Price:
              <input className='inp_det_3' type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>
            <br />
            <input className='inp_det_4' type="hidden" value={restaurantId} />
            <label>
            Quantity:
              <input className='inp_det_5' type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </label>
            <br />
            <button className='btn' type="submit">Create Food Item</button>
            </div>
          </form>
      </div>
      </div>
    </Container>
  );
};

export default FoodItemsPage;


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
    margin-left: 1rem;
}

.food_items{
  display: flex;
  margin-left: 27rem;
  font-size: 3rem;
  font-weight: bold;
  color: white;
  justify-content: center;
}
.form_container{
  margin-top: 15px;
  text-align: center;
  justify-content: center;
}
.btn_back{
  display: flex;
  width: 70px;
  height: 35px;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 70px;
  margin-top: 10px;
  font-weight: bold;
  text-decoration: none;
  border: 1px solid black;
  align-items: center;
  border-radius: 7px;
  justify-content: center;
  background-color: #33adff;
  color: black;
}
.table_det{
  width: 470px;
  height: 280px;
  font-size: 1.5rem;
  margin-top: 30px;
  margin-left: 440px;
  border: 1px solid grey;
  text-align: center;
  
  background-color: #e6ffff;
  justify-content: center;
}

.inp_det_1{
  width: 250px;
  margin-left: 87px;
  padding: 5px;
}
.inp_det_2{
  width: 250px;
  margin-left: 31px;
  padding: 5px;
}
.inp_det_3{
  width: 250px;
  margin-left: 101px;
  padding: 5px;
}
.inp_det_4{
  width: 250px;
  margin-left: 9px;
  padding: 5px;
}
.inp_det_5{
  width: 250px;
  margin-left: 60px;
  padding: 5px;
}
.btn{
  width: 250px;
  font-weight: bold;
  margin-left : 5px;
  cursor: pointer;
  margin-top : 25px;
  background-color: #99e699;
  padding: 5px;
}
`;