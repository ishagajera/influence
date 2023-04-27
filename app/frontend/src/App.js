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
function App() {
  const [isAuthenticated, userHasAuthenticated] = useState("null");
  
  function handleLogout() {
    // AuthService.logout();
    userHasAuthenticated("null");
    localStorage.removeItem("user")

  }
  
  return (
   
   <div>
 
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" >InFluence</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
      <a class="nav-link" href="http://localhost:3000/">LandingPage</a>
      </li>
      {JSON.parse(localStorage.getItem("user")) != "null" ? (
    <li float="left" class="nav-item">
    <a class="nav-link" onClick={handleLogout} >Logout</a>
    <a class="nav-link" href="http://localhost:3000/home">Home</a>
    <a class="nav-link" href="http://localhost:3000/home">My Profile</a>
    <a class="nav-link" href="http://localhost:3000/home">Explore Influencers</a>
  </li>
 
  ) : (
    <>
      <a class="nav-link" href="http://localhost:3000/signup">Signup</a>
      <a class="nav-link" href="http://localhost:3000/login">Login</a>
     
    </>
  )}

    </ul>
    
  </div>
</nav>
<AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
<BrowserRouter>
    <Routes>
    <Route path="/" element = {<LandingPage />}></Route>
      <Route path="/login" element = {<Login />}></Route>
      <Route path="/signup" element = {<Signup />}></Route>
      <Route path="/home" element = {<Home />}></Route>
      <Route path="/form" element = {<Form />}></Route>
    </Routes>
    </BrowserRouter>
    
    </AppContext.Provider>
    </div>
  )
}

export default App;
