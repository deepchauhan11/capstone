import React, { useEffect, useState } from "react"
import axios from "axios"
import  styled  from 'styled-components';
import { useNavigate, Link } from "react-router-dom"


function CustomerSignup() {
    const history=useNavigate();

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [mobile_number,setmobileNumber]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8001/customerSignup",{
                name,email,mobile_number,password
            })
            .then(res=>{
                if(res.data=="exist"){
                    alert("User already exists")
                }
                else if(res.data=="notexist"){
                    history("/customerHome",{state:{id:email}})
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
        <div className='hero'>
          <img 
              src='https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png'
              className='background-image'
              alt="bgImage" />
            <div className="login">
                <div className="main_signuppage">
                    <div className="rightcomponent_signuppage">
                        <h1 className="heading_sign">Signup</h1>

                        <form action="POST" className="inpgrp_signup">
                            <input type="text" className="inp" onChange={(e) => { setName(e.target.value) }} placeholder="Name"  />
                            <input type="email" className="inp" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                            <input type="text" className="inp" onChange={(e) => { setmobileNumber(e.target.value) }} placeholder="Mobile Number"  />
                            <input type="password" className="inp" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                            <input type="submit" className="btn_sinup" onClick={submit} />

                        </form>

                        <br />
                        <p className="or">OR</p>
                        <br />

                        <p>Already a customer!<Link className="login_link" to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
          </div>
        </Container>
    )
}

export default CustomerSignup

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

  .login{
    position: absolute;
    bottom: 3rem;
    margin-left: 29rem;
  }
  .main_signuppage {
    display: flex;
    margin: 20px;
  }
  .rightcomponent_signuppage {
    width: 400px;
    height: 500px;
    border: 1px solid grey;
    margin-top: 20px;
    text-align: center;
    background-color: white;
  }
  .heading_sign{
    margin-top: 25px;
    font-size: 2rem;
    font-weight: bold;
    color: #8e8e8e;
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