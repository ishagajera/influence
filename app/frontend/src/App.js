import logo from './logo.svg';
import React,{useState, useEffect} from 'react';
import './App.css';
import Login from './Login'
import {BrowserRouter, Routes, Route,} from 'react-router-dom'
import Signup from './Signup'
import Home from './Home'
import Form from './Form'
import LandingPage from './LandingPage'
import AuthService from './services/auth.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/esm/Container';
import InfluencerProfile from './influencerProfile';
import Explore from './Explore'
import ViewProfile from './ViewProfile';
import BrandProfile from './BrandProfile';
import Navigation from './components/Navigation';
import ViewBrand from './ViewBrand';
function App() {
 
  function handleLogout() {
    AuthService.clear_data();
  }
 
useEffect(() => {
  setInterval(() => {
  }, "1000");
},[])  
  return (
    <>
    
<BrowserRouter>
    <Routes>
    <Route path="/" element = {<LandingPage />}></Route>
      <Route path="/login" element = {<Login />}></Route>
      <Route path="/signup" element = {<Signup />}></Route>
      <Route path="/home" element = {<Home />}></Route>
      <Route path="/form" element = {<Form />}></Route>
      <Route path="/Influencer" element = {<InfluencerProfile />}></Route>
      <Route path="/viewProfile" element = {<ViewProfile />}></Route>
      <Route path="/exploreinf" element = {<Explore />}></Route>
      <Route path="/Brand" element = {<BrandProfile />}></Route>
      <Route path="/viewbrandprofile" element = {<ViewBrand />}></Route>
    </Routes>
    </BrowserRouter>
    
    
   </>
  )
}

export default App;
