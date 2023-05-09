import axios from 'axios';

import React, { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import Validation from './LoginValidation';
import Navigation from './components/Navigation';
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "./assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import Header from './components/Header';
function Login() {    
   
    const [values, setValues] = useState({        
        email:'',        
        password:'',
        rememberme :''    })    
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [backendError, setBackendError] = useState([])
    const handleInput = (event) => {
        // console.log(event)
        const x = event.target.name        
        setValues(prev => ({...prev, [x]: [event.target.value]}))
    }

    const handleSubmit =(event) => {        
        event.preventDefault();        
        const err = Validation(values); 
        // const pass1 = "Vallabhi!@#456";
        setErrors(err);        
        if(err.email === "" && err.password === "") {            
            axios.post('http://localhost:8081/login', values)
            
            .then(res => {   
                        
                if(res.data.errors) {                    
                    setBackendError(res.data.errors);                
                } 
                else {                    
                    // setBackendError([]);                    
                    if(res.data === "Success") {  
                        sessionStorage.setItem("user", JSON.stringify(values.email));
                        navigate('/home');                    
                    } 
                    else {  
                        navigate("/signup");                      
                        alert("No record existed");                    
                    }                
                }                            
            })            
            .catch(err => console.log(err));        
        }    
    }
    const [items, setItems] = useState([]);

    useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(values.email));
    }, [items]);

  return (   
    <> 
    <Header/>
     <section className="contact" id="connect">
      <Container>
        {                
            backendError ? backendError.map( e => (                    
            <p className='text-danger'>{e.msg}</p>                 
            )) : <span></span>            
        } 
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                      <input type="email" name= "email" placeholder="Email Address"  onChange={handleInput} />
                      {errors.email && <span className='text-danger'> {errors.email}</span>} 
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="password" name = "password" placeholder="Password"  onChange={handleInput} />
                      {errors.password && <span className='text-danger'> {errors.password}</span>}   
                    </Col>
                  
                    <Col size={12} className="px-1">
                      <button type="submit"><span>Login</span></button>
                    </Col>
                  </Row>
                </form>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section> 
    </>
    
    )}
export default Login