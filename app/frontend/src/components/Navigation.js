
import React,{useState, useEffect, useContext} from 'react';

import AuthService from '../services/auth.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/esm/Container';
import { AuthContext } from '../AuthContext';
function Navigation() {
 
  function handleLogout() {
    AuthService.clear_data();
  }
  // const handleLogin = (user) => {
  //   login(user);
  // };
  // const handleLogout = () => {
  //   logout();
  // };
  // const { loggedIn, user, logout ,login} = useContext(AuthContext);
 
useEffect(() => {
  setInterval(() => {
  }, "1000");
},[])  
  return (
  //   <>
  //   <Navbar bg="dark" variant="dark">
  //     <Container>
  //       <Navbar.Brand>InFluence</Navbar.Brand>
  //       {loggedIn ? (
  //         <Nav>
  //           <Nav.Link href="/home">Home</Nav.Link>
  //           <Nav.Link href={`/${user.id}`}>My Profile</Nav.Link>
  //           <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
  //         </Nav>
  //       ) : (
  //         <Nav>
  //           <Nav.Link href="/signup">Sign up</Nav.Link>
  //           <Nav.Link href="/login" onClick={handleLogin}>Login</Nav.Link>
  //         </Nav>
  //       )}
  //     </Container>
  //   </Navbar>
  // </>
      <>
    <Navbar bg ='dark' variant = "dark" >
      <Container>
        <Navbar.Brand>InFluence</Navbar.Brand>
          {JSON.parse(sessionStorage.getItem("user")) ? (
            <>
       <Nav>
      <Nav.Link href="/login" onClick={handleLogout}>Logout</Nav.Link>
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href={JSON.parse(sessionStorage.getItem("typeofuser"))}>My Profile</Nav.Link>
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
   </>
  
  )
}

export default Navigation;

