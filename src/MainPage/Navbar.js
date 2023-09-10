import React, { useState } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

export default function Navbar({isScrolled}) {

    const links = [
        {login: 'Log in', link:'/login'},
        {signup: 'Sign up', link:'/customerSignup'},
        
    ];
  return (
    <Container>
        <nav className={` flex`}>
            <div className='flex left a-center'>
                    <ul className='links flex'>
                        {links.map(({login, signup,link})=>{
                            return(
                                <li >
                                    <Link to={link}>{login}</Link>
                                    <Link to={link}>{signup}</Link>
                                </li>
                            );
                        })}
                    </ul>
            </div>
            
        </nav>
    </Container>
  )
}


const Container = styled.div`
    
    nav{
        position: fixed;
        top: 0;
        height: 6.5rem;
        margin-left: 65rem;
        width: 100%;
        justify-content: space-between;
        padding: 0 4rem;
        align-items: center;
        z-index: 2;
        transition: 0.3s ease-in-out;
        .left{
            gap:2rem;
            .links{
                list-style-type: none;
                gap: 2.5rem;
                li{
                    a{
                        font-size: 1.5rem;
                        color: white;
                        text-decoration: none;
                    }
                }
            }
        }
        
            
      
    
    
`;