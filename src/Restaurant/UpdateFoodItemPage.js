import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import  styled  from 'styled-components';

const UpdateFoodItemForm = () => {
  const { restaurantId, foodItemId } = useParams();
  const history=useNavigate();
  const [fooditem, setFoodItem] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
  });
  

  useEffect(() => {
    axios.get(`http://localhost:8001/restaurant/${restaurantId}/fooditem/${foodItemId}`)
      .then(response => {
        setFoodItem(response.data);
      })
      .catch(error => {
        console.error('Error fetching food item data:', error);
      });
  }, [restaurantId, foodItemId]);

  const handleSubmit = (event) => {
    event.preventDefault();


    // Make an API request to update the food item
    axios
      .put(`http://localhost:8001/restaurant/${restaurantId}/fooditem/${foodItemId}`, fooditem)
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFoodItem((prevFoodItem) => ({
      ...prevFoodItem,
      [name]: value,
    }));
  };

  return (
    <Container>
        <div>
            <h1 className='food_items'>Update Food Items</h1>
            <form onSubmit={handleSubmit} className='table_det'>
            <div className='form_container'>
            <label>
                Name:
                <input className='inp_det_1' type="text" value={fooditem.name} name="name"
                onChange={handleChange}/>
            </label>
            <br />
            <label>
                Description:
                <input className='inp_det_2' type="text" value={fooditem.description} name="description"
                onChange={handleChange} />
            </label>
            <br />
            <label>
                Price:
                <input className='inp_det_3' type="number" value={fooditem.price} name="price"
                onChange={handleChange} />
            </label>
            <br />
            <label className='quantity_inp'>
                Quantity:
                <input className='inp_det_4' type="number" value={fooditem.quantity} name="quantity"
                onChange={handleChange} />
            </label>
            <br />
            <button className='btn' type="submit">Update</button>
            </div>
            </form>
        </div>
    </Container>
  );
};

export default UpdateFoodItemForm;

const Container = styled.div`
body {
    background-color: #fafafa;
  }
  .food_items{
    display: flex;
    margin: 15px;
    font-size: 3rem;
    font-weight: bold;
    color: #8e8e8e;
    justify-content: center;
}
..form_container{
    margin-top: 15px;
    text-align: center;
    justify-content: center;
  }
.table_det{
    width: 470px;
    height: 250px;
    font-size: 1.5rem;
    margin-top: 40px;
    margin-left: 440px;
    border: 1px solid grey;
    text-align: center;
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
  .quantity_inp{
    margin-right: 3px;
  }
  .inp_det_4{
    width: 250px;
    margin-left: 62px;
    padding: 5px;
  }
  .btn{
    width: 130px;
    height: 35px;
    font-weight: bold;
    margin-left : 5px;
    cursor: pointer;
    margin-top : 25px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid black;
    background-color: #0385f6;
    color: white;
    padding: 5px;
  }
    
`;