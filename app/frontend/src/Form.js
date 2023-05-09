import React, { useState, useEffect}  from 'react'
import {  useNavigate } from 'react-router-dom'
import Validation from './FormValidation';

import axios from 'axios';
import AuthService from "./services/auth.service";
import Navigation from './components/Navigation';
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "./assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import Header from './components/Header';
function Form() {
    const currentUser = AuthService.getCurrentUser();
    const [useremail, setItems] = useState([]);

    useEffect(() => {
    const uemail = JSON.parse(sessionStorage.getItem('user'));
    if (uemail) {
    setItems(uemail);
    }
    }, [])
    // console.log("printing useremail using localstorage")
    // console.log(useremail)
    const [values, setValues] = useState ({
        productname: '',
        productdesc: '',
        category:'',
        image :'',

    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [file, setFile] = useState();
    const [backendError, setBackendError] = useState([])
    const [uploadStatus, setUploadStatus] = useState('');
    const handleInput = (event) => {

        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
        
    }
    const setimgfile = (event)=>{

        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
        
        setFile(event.target.files[0])
    }

    var getFilename = function (str) {
        return str.substring(str.lastIndexOf('//')+1);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var formData = new FormData();

        for(const val in values) {
           
            formData.append(val,values[val].length === 0 ? null : values[val][0]);
        }
        formData.append('files',file)
        const err = Validation(values); 
        setErrors(err); 

        // adding user's email to form data - so that on server side can fetch username and then add to
        // db using the user name
        formData.append('useremail',useremail)
        // console.log("printing form data")
        // console.log(formData)

      
        if(err.productname === "" && err.productdesc === "" && err.category === "" && err.image === "") {
            const config = {
                headers:{
                "Content-Type":"multipart/form-data",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH"

                }
            }
           
            axios.post("http://localhost:8081/form",formData,config)
            
            .then(res => {
              
                if(res.data.errors) {                    
                    setBackendError(res.data.errors);                
                } 
              
                
               if(res.data === "Success") {
                navigate('/home');
               }
               else {
                alert("Error");
               }
            })
            .catch(err => console.log(err));
        }
    }

   

    return (
        <><Header/>
        <section className="contact" id="connect">
      <Container>
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
                    <br></br>
                   
                <h2>Add Product Details</h2>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col size={6} sm={6} className="px-1 mb-3">
                      <input type="text" onChange={handleInput} name ="productname" placeholder="Product Name" />
                      {errors.productname && <span className="text-danger">{errors.productname}</span>}
                    </Col>
                    </Row>
                    <Row>
                    
                    <Col size={12} sm={6} className="px-1 mb-3" >
                      <p><strong>Select Category of Product: </strong>
                       <select name="category" id="category" onChange={handleInput}>
                            <option value="beauty">Beauty</option>
                            <option value="family">Family</option>
                            <option value="fashion">Fashion</option>
                            <option value="fitness">Fitness</option>
                            <option value="food">Food</option>
                            <option value="interior">Interior</option>
                            <option value="pet">Pet</option>
                            <option value="travel">Travel</option>
                            <option value="other">Other</option>
                        </select>

                        </p>
                        {errors.category && <span className="text-danger">{errors.category}</span>}
                    </Col>
                    </Row>
                    <Row>

                    <Col size={12} sm={6} className="px-1 mb-3">
                      <div className = 'mb-3'>
                        <label htmlfor="image"><strong> Select a Product photo</strong> </label>
                        <input filename={file} type="file"  name ="image" onChange={setimgfile}  className='form-control rounded-0'/>
                        {errors.image && <span className="text-danger">{errors.image}</span>}
                    </div>
                    </Col>
                    </Row>
                    <Row>
                    <Col size={6} className="px-1">
                      <textarea rows="6" onChange={handleInput}  name="productdesc" placeholder="Product Description" ></textarea>
                      <button type="submit"><span>Submit</span></button>
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

export default Form