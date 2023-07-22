import React, { useState } from "react"
import axios from "axios"
import  styled  from 'styled-components';
import {Link, useNavigate } from "react-router-dom"


function Login() {
    const history=useNavigate();

    const [name,setName]=useState('')
    const [address,setAddress]=useState('')
    const [opening_time,setOpeningTime]=useState('')
    const [closing_time,setClosingTime]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8001/restaurantSignup",{
                name,address,opening_time,closing_time
            })
            .then(res=>{
                if(res.data==="restaurant with this name already exists"){
                    alert("Restaurant name already exists")
                }
                else if(res.data==="restaurant added successfully"){
                    history("/restaurantListing")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }


    return (
        <Container>
            <div className="login">
                <Link className='btn_back' to={`/restaurantListing`}>Back</Link>
                <div className="main_signuppage">
                    <div className="rightcomponent_signuppage">
                        <h1 className="heading_sign">Signup</h1>

                        <form action="POST" className="inpgrp_signup">
                            <input type="text" className="inp" onChange={(e) => { setName(e.target.value) }} placeholder="Restaurant Name"  />
                            <input type="text" className="inp" onChange={(e) => { setAddress(e.target.value) }} placeholder="Address of Restaurant"  />
                            <input type="text" className="inp" onChange={(e) => { setOpeningTime(e.target.value) }} placeholder="Opening Time"  />
                            <input type="text" className="inp" onChange={(e) => { setClosingTime(e.target.value) }} placeholder="Closing Time" />
                            <input type="submit" className="btn_sinup" onClick={submit} />

                        </form>

                        </div>
                </div>
            </div>
        </Container>
    )
}

export default Login

const Container = styled.div`
body {
    background-color: #fafafa;
  }
  .login{
    display: flex;
    margin: 5px;
    justify-content: center;
  }
  .main_signuppage {
    display: flex;
    margin: 20px;
  }
  .btn_back{
    display: flex;
    width: 70px;
    height: 35px;
    cursor: pointer;
    font-size: 1.2rem;
    margin-right: 330px;  
    font-weight: bold;
    text-decoration: none;
    border: 1px solid black;
    align-items: center;
    border-radius: 5px;
    justify-content: center;
    background-color: #33adff;
    color: black;
  }
  .rightcomponent_signuppage {
    width: 400px;
    height: 500px;
    border: 1px solid grey;
    margin-right: 350px;
    text-align: center;
    justify-content: center;
    background-color: white;
  }
  .heading_sign{
    margin-top: 25px;
    font-size: 2rem;
    font-weight: bold;
    color: #990000;
  }
  .inpgrp_signup{
    margin-top: 40px;
  }
  .inp {
    width: 280px;
    height: 35px;
    margin: 5px 10px 5px 10px;
    border: 1px solid grey;
    background-color: #fafafa;
    padding-left: 10px;
    border-radius: 5px;
  }
  .btn_sinup{
    width: 280px;
    height: 35px;
    margin-top: 15px;
    cursor: pointer;
    font-weight: bold;
    border: 1px solid #0385f6;
    border-radius: 5px;
    background-color: #0385f6;
    color: white;
  }
  .or{
    font-size: bold;
    margin-top: none;
  }
  .login_link{
    font-size: bold;
    text-decoration: none;
    margin-left: 10px;
  }
`;