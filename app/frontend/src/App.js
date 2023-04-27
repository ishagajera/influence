import logo from './logo.svg';
import React,{useState, useEffect} from 'react';
import './App.css';
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup'
import Home from './Home'
import Form from './Form'
import LandingPage from './LandingPage'
import { AppContext } from "./lib/contextLib";
import AuthService from './services/auth.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/esm/Container';
import InfluencerProfile from './influencerProfile';
import Explore from './Explore'
function App() {
 
  function handleLogout() {
    localStorage.removeItem("user")
  }
  
  return (
    <>
    <Navbar bg ='dark' variant = "dark">
      <Container>
        <Navbar.Brand>InFluence</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link href = "/">LandingPage</Nav.Link>
          </Nav>
        { console.log("hi")}
         {console.log(JSON.parse(localStorage.getItem("user")))}
          {JSON.parse(localStorage.getItem("user")) != null ? (
            <>
       <Nav>
      <Nav.Link  href="/login" onClick={handleLogout}>Logout</Nav.Link>
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="/influencerProfile">My Profile</Nav.Link>
      <Nav.Link href="/exploreinf">Explore Influencers</Nav.Link></Nav>
      </>
 
  ) : (
    <>
    <Nav>
    <Nav.Link href="/signup">Sign up</Nav.Link></Nav>
    <Nav>
    <Nav.Link href="/login">Login</Nav.Link></Nav>
      
    </>
  )}
  
      </Container>
   </Navbar>
 
 
   


<BrowserRouter>
    <Routes>
    <Route path="/" element = {<LandingPage />}></Route>
      <Route path="/login" element = {<Login />}></Route>
      <Route path="/signup" element = {<Signup />}></Route>
      <Route path="/home" element = {<Home />}></Route>
      <Route path="/form" element = {<Form />}></Route>
      <Route path="/influencerProfile" element = {<InfluencerProfile />}></Route>
      <Route path="/exploreinf" element = {<Explore />}></Route>
    </Routes>
    </BrowserRouter>
    
    
   </>
  )
}

export default App;
