import React, {useState, useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Validation from './SignupValidation';
import axios from 'axios';

import Header from './components/Header';
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "./assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { Navbar, Nav } from "react-bootstrap";
function Signup() {
    const [values, setValues] = useState ({
        name: '',
        email: '',
        password: '',
        typeofuser:'',
        profileimg:'',
    })
    const [file, setFile] = useState();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    };
    const setimgfile = (event)=>{

      setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
      
      setFile(event.target.files[0])
  }
    const handleSubmit = (event) => {
        event.preventDefault();
        const err = Validation(values);
        setErrors(err);
        var formData = new FormData();
        for(const val in values) {
           
            formData.append(val,values[val].length === 0 ? null : values[val][0]);
        }
        formData.append('files',file)
        
        if(err.name==="" && err.email === "" && err.password==="" && err.profileimg==="" && err.typeofuser==="") {
          const config = {
            headers:{
            "Content-Type":"multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH"

            }
        }
            axios.post("http://localhost:8081/signup", formData,config)
            .then(res => {
                // console.log(res)
                if(res.data === "Username Already Registered"){
                    setErrors({name :res.data});
                    navigate('/signup');
                }
                else if(res.data === "Email Already In Use"){
                    setErrors({email :res.data});
                    navigate('/signup');
                }
                else
                navigate('/login');
            })
            .catch(err => console.log(err));
        }
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
    return (
        <>
        <Header/>
      
        <section className="contact" id="connect">

      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6} style = {{marginTop:"70px"}}>
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
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" name = "name" onChange={handleInput} placeholder="Username" />
                      {errors.name && <span className="text-danger">{errors.name}</span>}
                    </Col>
                    
                    <Col size={12} sm={6} className="px-1">
                      <input type="email" name ="email" onChange={handleInput} placeholder="Email Address" />
                      {errors.email && <span className="text-danger">{errors.email}</span>}
                    </Col>
                    </Row>
                    <Row>
                    <Col size={12} sm={6} className="px-1">
                      <input type="password" name ="password" onChange={handleInput} placeholder="Password" />
                      {errors.password && <span className="text-danger">{errors.password}</span>}
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                       <p><strong>Type of User:</strong></p>
                       <div><label><input name = "typeofuser" type="radio" value="Brand"  onChange={handleInput} />Brand</label>
                       <label><input name = "typeofuser" type="radio" value="Influencer"  onChange={handleInput} />Influencer</label></div>
                     
                    </Col>
                    <Row>
                    <Col size={12} sm={6} className="px-1">
                      <div className = 'mb-3'>
                        <label htmlfor="profileimg"><strong> Select a Profile photo</strong> </label>
                        <input filename={file} type="file"  name ="profileimg" onChange={setimgfile}  className='form-control rounded-0'/>
                        {errors.profileimg && <span className="text-danger">{errors.profileimg}</span>}
                    </div>
                    </Col>
                    </Row>
                    <Col size={12} className="px-1">
                      <button type="submit"><span>Sign Up</span></button>
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
    )
}

export default Signup