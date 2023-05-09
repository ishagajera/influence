import React,{useState, useEffect, useContext} from 'react';
import AuthService from '../services/auth.service';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthContext } from '../AuthContext';
import { Navbar, Nav, Container } from "react-bootstrap";

import { Link} from 'react-router-dom';
import {
  BrowserRouter as Router
} from "react-router-dom";

export const Header = () => {

    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    var get_user = JSON.parse(sessionStorage.getItem("typeofuser"));
    function handleLogout() {
    AuthService.clear_data();
  }
  
    useEffect(() => {
      const onScroll = () => {
        if (window.scrollY > 50) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
  
      window.addEventListener("scroll", onScroll);
  
      return () => window.removeEventListener("scroll", onScroll);
    }, [])
  
    const onUpdateActiveLink = (value) => {
      setActiveLink(value);
    }
  
    return (
      <>
        <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
          <Container>
            <Navbar.Brand href="/">
              <h1 style={{ color: "white", fontSize: 50, fontWeight: "bold" }}> InFluence</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav">
              <span className="navbar-toggler-icon"></span>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
            {JSON.parse(sessionStorage.getItem("user")) ? (
                         <> 
                <Nav>
                <Nav.Link href="home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
                <Nav.Link href={JSON.parse(sessionStorage.getItem("typeofuser"))} className={activeLink === get_user ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink(get_user)}>My Profile</Nav.Link>
                <Nav.Link href="login" onClick={handleLogout} className={activeLink === 'login' ? 'active navbar-link' : 'navbar-link'}>Logout</Nav.Link>
                <Nav.Link href="exploreinf" className={activeLink === 'exploreinf' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('exploreinf')}>Explore Influencers</Nav.Link>
                </Nav>
                </>
            
             ) : ( 
                 <> 
              
                <Nav className="navbar-text">
                <Nav.Link href='signup'>

                  <button className="vvd"><span>Sign Up</span></button>
                </Nav.Link>
                <Nav.Link href='login'>
                  <button className="vvda"><span>Log in</span></button>
                </Nav.Link>
              </Nav>
                 </> 
            )} 
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    )
  }
  
  export default Header;