import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import  styled  from 'styled-components';
import { Link } from 'react-router-dom';



const FoodItemsListing = () => {
  const [fooditems, setFoodItems] = useState([]);
  const { restaurantId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8001/restaurant/${restaurantId}/fooditems`)
      .then(response => {
        setFoodItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching food items data:', error);
      });
  }, [restaurantId]);

  const handleDelete = (fooditem_id) => {
    // Make an API request to delete the item with the given id
    axios
      .delete(`http://localhost:8001/restaurant/${restaurantId}/fooditem/${fooditem_id}`)
      .then((response) => {
        // Remove the item from the fooditems state
        setFoodItems(fooditems.filter((item) => item._id !== fooditem_id));
      })
      .catch((error) => {
        console.error('Error deleting food item:', error);
      });
  };

  return (
    <Container>
        <div className='container'>
            <div className='add_food'>
              <Link className='btn_back' to={`/restaurantListing`}>Back</Link>
            <h1 className='res_listing'>Food Items Listing</h1>
              <Link className='btn_add_food' to={`/restaurant/${restaurantId}/addFoodItem`}>Add Food Item</Link>
            </div>
                <table className='table_det'>
                    <thead>
                    <tr className='head_det'>
                        <th className='heddeta'>Name</th>
                        <th className='heddeta'>Description</th>
                        <th className='heddeta'>Price</th>
                        <th className='heddeta'>Quantity</th>
                        <th className="heddeta">Actions</th>
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
                          <td className='hed_deta'>{fooditem.quantity}</td>
                          <td className="hed_deta"> 
                            <button className='btn_delete' onClick={() => handleDelete(fooditem._id)}>Delete</button>
                            <Link className='btn_update' to={`/restaurant/${restaurantId}/updateFoodItem/${fooditem._id}`}>
                              Update
                            </Link>
                          </td>
                        </tr>
                    )))}
                    </tbody>
                </table>
        </div>
    </Container>
  );
};

export default FoodItemsListing;


const Container = styled.div`
.container {
  width:100vw;
  height:110vh;
  background-color: #ffe6cc;
}
  .add_food{
    display: flex;
    align-items: center;
    justify-content: center;
  }
.res_listing{
    display: flex;
    margin-left: 380px;
    font-size: 3rem;
    font-weight: bold;
    color: #990000;
    align-items: center;
    justify-content: center;
}
.btn_add_food{
  display: flex;
  margin-left: 290px;
  width: 130px;
  height: 35px;
  text-decoration: none;
  cursor: pointer;
  float: right;
  font-weight: bold;
  border: 1px solid black;
  align-items: center;
  border-radius: 5px;
  justify-content: center;
  background-color: #80ff80;
  color: black;
}
.btn_back{
  display: flex;
  width: 70px;
  height: 35px;
  cursor: pointer;
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
    
    margin-left: 190px;
    border: 1px solid grey;
    text-align: center;
    justify-content: center;
}
.head_det{
    background-color: lightgrey;;
}
.hed_deta{
    border: 1px solid black;
}
.btn_delete{
  width: 70px;
  height: 30px;
  margin: 5px;
  font-weight: bold;
  border-radius: 5px;
  align-items: center;
  font-size: 1rem;
  border: 1px solid black;
  background-color: red;
  color: black;
  cursor: pointer;
}
.btn_update{
  width: 80px;
  height: 40px;
  margin: 5px;
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
.heddeta{
  border: 1px solid black;
  background-color: lightgrey;;
}
.hed_deta{
  border: 1px solid black;
  background-color: #e6ffff;
}
`;