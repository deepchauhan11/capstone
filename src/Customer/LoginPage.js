import React, { useState } from "react"
import axios from "axios"
import  styled  from 'styled-components';
import { useNavigate, Link } from "react-router-dom"
import './Login.css'


function CustomerLogin() {

    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8001/customerLogin",{
                email,password
            })
            .then(res=>{
                if(res.data!=="invalid"){
                    if(res.data.is_admin === true) {
                        history(`/restaurantListing`)
                    } else {
                        history(`/customer/${res.data._id}/restaurants`)
                    }
                }
                else if(res.data==="invalid"){
                    alert("User have not sign up")
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
                <div className="main_signuppage">
                    <div className="rightcomponent_signuppage">
                        <div className="title">
                            <p className='title_welc'>Login</p>
                        </div>
                        <form action="POST" className="inpgrp_login">
                            <input type="email" className="inp" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                            <input type="password" className="inp" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
                            <input type="submit" className="btn_sinup" onClick={submit} />
                        </form>
                        <br />
                        <p className="or">OR</p>
                        <br />
                        <p>Not registered?</p>
                        <p>Create an account.<Link className="signup_link" to="/customerSignup">Signup</Link></p>
                        
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default CustomerLogin

const Container = styled.div`
// body {
//     background-color: #fafafa;
//     background-image: url("../images/food.jpg");
//     background-size: cover;
//   }
//   .login{
//     display: flex;
//     margin: 5px;
//     justify-content: center;
//   }
//   .main_signuppage {
//     display: flex;
//     margin: 20px;
//   }
//   .rightcomponent_signuppage {
//     width: 400px;
//     height: 500px;
//     border: 1px solid grey;
//     margin-top: 20px;
//     text-align: center;
//     background-color: white;
//   }
// .title{
//     font-weight: bold;
//     color: #8e8e8e;
// }
// .title_welc{
//     margin-top: 35px;
//     font-size: 3rem;
//     font-weight: bold;
//     color: #8e8e8e;
//   }
//   .inpgrp_signup{
//     margin: 40px;
//   }
//   .inp {
//     width: 280px;
//     height: 35px;
//     margin: 15px 10px 5px 10px;
//     border: 1px solid grey;
//     background-color: #fafafa;
//     padding-left: 10px;
//     border-radius: 5px;
//   }
//   .btn_sinup{
//     width: 280px;
//     height: 35px;
//     margin-top: 15px;
//     cursor: pointer;
//     font-weight: bold;
//     border: 1px solid #0385f6;
//     border-radius: 5px;
//     background-color: #0385f6;
//     color: white;
//   }
//   .or{
//     font-size: bold;
//   }
//   .signup_link{
//     font-size: bold;
//     text-decoration: none;
//     margin-left: 10px;
//   }
`;
