import React from 'react'
import { useParams } from 'react-router-dom';
import  styled  from 'styled-components';
import { Link } from 'react-router-dom';
import {BsFillCheckCircleFill} from 'react-icons/bs'

export default function OrderPlacedHome() {
    const { customerId } = useParams();
  return (
    <Container>
        <div className='container'>
            <div className='icon'>
                <BsFillCheckCircleFill/>
            </div>
            <h2 className='top_heading'>Thank You!</h2>
            <h1 className='confirmed_orders'>Your Order is Confirmed</h1>
            <Link className='check_orders' to={`/customer/${customerId}/orders`}>Check your orders</Link>
        </div>
    </Container>
  )
}

const Container = styled.div`
.container{
    margin: 120px;
    padding: 15px;
    align-items: center;
    justify-content: center;
}
.top_heading{
    display: flex;
    font-size: 3rem;
    margin: 8px;
    font-weight: bold;
    color: red;
    align-items: center;
    justify-content: center;
}
.icon{
    display: flex;
    font-size: 5rem;
    align-items: center;
    color: green;
    justify-content: center;
}
.confirmed_orders{
    display: flex;
    font-size: 3rem;
    font-weight: bold;
    color: orange;
    align-items: center;
    justify-content: center;
}
.check_orders{
    display: flex;
    margin: 5px;
    font-size: 1.5rem;
    font-weight: bold;
    color: blue;
    align-items: center;
    justify-content: center;
}
`;
