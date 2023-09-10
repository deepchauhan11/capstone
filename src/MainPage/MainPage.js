import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import styled from 'styled-components';


function MainPage() {


  return (
    <Container>
      <Navbar/>
      <div className='hero'>
        <img 
          src='https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png'
          className='background-image'
          alt="bgImage" />
          <div className="container">
              <div className="buttons">
                <h1 className='web-name'>Mega Hungry</h1>
                <p className='details'>Find the best restaurants, cafés and bars in India</p>
              </div>
          </div>
      </div>
    </Container>
    
  )
}
const Container = styled.div`
  background-container: black;
  .hero{
    position: fixed;
    .background-image{
        object-fit: cover;
    }
    img{
      width: 100vw;
      height: 100vh;
    }
    .container{
      position: absolute;
      bottom: 15rem;
      margin-left: 20rem;
      
    }
    .web-name{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 5rem;
        opacity: 1;
        margin: auto;
        
    }
    .details{
        font-size: 2.2rem;
        margin: auto;
    }
  }
  .buttons{
    color: white;
    margin: auto;
    text-align: center;
    gap: 2rem;
    }
  }
`;
export default MainPage;