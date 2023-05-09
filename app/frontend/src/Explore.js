import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Container, Row, Col, Tab, Nav, Card, CardImg  } from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import Tabs from 'react-bootstrap/Tabs';
import Navigation from './components/Navigation';
import Header from "./components/Header";
import colorSharp2 from "./assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';


const Explore = () => {    
    const navigate = useNavigate();
    const [values, setValues] = useState ({username:"",});
    const handleInput = (event) => {
        values.username = event.target.name
        event.preventDefault(); 
        sessionStorage.setItem("display_user", JSON.stringify(event.target.name));       
        navigate('/viewProfile');   

    };
    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);
   
    const getUserData = async () => {
        const res = await axios.get("http://localhost:8081/getexploredata", {
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if (res.data.status === 201) {
            setData(res.data.data)

        } else {
            console.log("error")
        }
    }

    useEffect(() => {getUserData();
        sessionStorage.setItem('display_user', JSON.stringify(values.username));
    },
    [items]);

    return (
        <>
        <Header/>
        <section className="project" id="project">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Explore Influencers</h2>
                <p>Find influencers based on your product requirements. Influencers are categorized into 9 different catgeories and they are ordered by a custom metric that guages the influence of that person on Instagram. </p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">All</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Beauty</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Family</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="fourth">Fashion</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="fifth">Fitness</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="sixth">Food</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="seventh">Pet</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="eigth">Travel</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="ninth">Interior</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="tenth">Other</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={3}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                {
                    data.length > 0 ? data.map((el, i) => {
                      
                        return (
                            <>
        <div className="mb-5" >
      <Container>
        <Row >
          <Col md="12" lg="12" xl="12" >
            <Card style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <CardImg
                      style={{ width: '180px', borderRadius: '10px' }}
                      src={require(`C:/Isha/Winter '23/influence/app/backend/uploads/${el.profileimg}`)}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title style={{textAlign: "center"}}>{el.Username}</Card.Title>
                    <div className=" flex-grow-1 rounded-3  mb-2"
                      style={{ backgroundColor: '#efefef', width: "278px" , marginLeft: "0px", padding: "0px"}}>
                        <Row>
                        <div className="col-5">
                        <p style={{color: "purple", width:"100px"}} className="mb-0">Rating<strong><br></br>{el.normalized_rating}</strong></p>
                      </div>
                      <div className="col-7">
                        <p style={{color: "purple"}} className="mb-0">Catgeory<strong><br/>{el.Category1}</strong></p>
                      </div>
                        </Row>
                      
                    </div>
                    <div className="d-flex pt-1">
                      <Button  onClick={handleInput}  name={el.Username} style={{width: "278px" , marginLeft: "0px", background: "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)", borderColor: "white" }}>View Profile</Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
                            </>
                        )}

                    ) : ""
                }
                        
                                       
                </Col>
                <Col lg={2}  className='mb-0 mb-lg-0'>
                </Col>
                </Row>
                </Container>
            </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={3}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                {
                    data.length > 0 ? data.map((el, i) => {
                        if (el.Category1 === "beauty") {
                        return (
                            <>
        <div className="mb-5" >
      <Container>
        <Row >
          <Col md="12" lg="12" xl="12" >
            <Card style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <CardImg
                      style={{ width: '180px', borderRadius: '10px' }}
                      src={require(`C:/Isha/Winter '23/influence/app/backend/uploads/${el.profileimg}`)}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title style={{textAlign: "center"}}>{el.Username}</Card.Title>
                    <div className=" flex-grow-1 justify-content-center rounded-3  mb-2"
                      style={{ backgroundColor: '#efefef', width: "278px" , marginLeft: "0px", padding: "0px"}}>
                        <Row>
                        <div className="col-5">
                        <p style={{color: "purple",width:"100px"}} className="mb-0">Rating<strong><br/>{el.normalized_rating}</strong></p>
                      </div>
                      <div className="col-7">
                        <p style={{color: "purple",width:"100px"}} className="mb-0">Catgeory<strong><br/>{el.Category1}</strong></p>
                      </div>
                        </Row>
                      
                    </div>
                    <div className="d-flex pt-1">
                      <Button onClick={handleInput}  name={el.Username} style={{width: "278px" , marginLeft: "0px", background: "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)", borderColor: "white" }}>View Profile</Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
                            </>
                        )}
                            }
                    ) : ""
                }
                        
                                       
                </Col>
                <Col lg={2}  className='mb-0 mb-lg-0'>
                </Col>
                </Row>
                </Container>
            </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={3}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                {
                    data.length > 0 ? data.map((el, i) => {
                        if (el.Category1 === "family") {
                        return (
                            <>
        <div className="mb-5" >
      <Container>
        <Row >
          <Col md="12" lg="12" xl="12" >
            <Card style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <CardImg
                      style={{ width: '180px', borderRadius: '10px' }}
                      src={require(`C:/Isha/Winter '23/influence/app/backend/uploads/${el.profileimg}`)}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title style={{textAlign: "center"}}>{el.Username}</Card.Title>
                    <div className=" flex-grow-1 justify-content-center rounded-3  mb-2"
                      style={{ backgroundColor: '#efefef', width: "278px" , marginLeft: "0px", padding: "0px"}}>
                        <Row>
                        <div className="col-5">
                        <p style={{color: "purple",width:"100px"}} className="mb-0">Rating<strong><br/>{el.normalized_rating}</strong></p>
                      </div>
                      <div className="col-7">
                        <p style={{color: "purple",width:"100px"}} className="mb-0">Catgeory<strong><br/>{el.Category1}</strong></p>
                      </div>
                        </Row>
                      
                    </div>
                    <div className="d-flex pt-1">
                      <Button onClick={handleInput}  name={el.Username} style={{width: "278px" , marginLeft: "0px", background: "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)", borderColor: "white" }}>View Profile</Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
                            </>
                        )}
                            }
                    ) : ""
                }
                        
                                       
                </Col>
                <Col lg={2}  className='mb-0 mb-lg-0'>
                </Col>
                </Row>
                </Container>
            </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={3}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                {
                    data.length > 0 ? data.map((el, i) => {
                        if (el.Category1 === "fashion") {
                        return (
                            <>
        <div className="mb-5" >
      <Container>
        <Row >
          <Col md="12" lg="12" xl="12" >
            <Card style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <CardImg
                      style={{ width: '180px', borderRadius: '10px' }}
                      src={require(`C:/Isha/Winter '23/influence/app/backend/uploads/${el.profileimg}`)}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title style={{textAlign: "center"}}>{el.Username}</Card.Title>
                    <div className=" flex-grow-1 justify-content-center rounded-3  mb-2"
                      style={{ backgroundColor: '#efefef', width: "278px" , marginLeft: "0px", padding: "0px"}}>
                        <Row>
                        <div className="col-5">
                        <p style={{color: "purple",width:"100px"}} className="mb-0">Rating<strong><br/>{el.normalized_rating}</strong></p>
                      </div>
                      <div className="col-7">
                        <p style={{color: "purple",width:"100px"}} className="mb-0">Catgeory<strong><br/>{el.Category1}</strong></p>
                      </div>
                        </Row>
                      
                    </div>
                    <div className="d-flex pt-1">
                      <Button onClick={handleInput}  name={el.Username} style={{width: "278px" , marginLeft: "0px", background: "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)", borderColor: "white" }}>View Profile</Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
                            </>
                        )}
                            }
                    ) : ""
                }
                        
                                       
                </Col>
                <Col lg={2}  className='mb-0 mb-lg-0'>
                </Col>
                </Row>
                </Container>
            </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="fifth">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={3}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                {
                    data.length > 0 ? data.map((el, i) => {
                        if (el.Category1 === "fitness") {
                        return (
                            <>
        <div className="mb-5" >
      <Container>
        <Row >
          <Col md="12" lg="12" xl="12" >
            <Card style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <CardImg
                      style={{ width: '180px', borderRadius: '10px' }}
                      src={require(`C:/Isha/Winter '23/influence/app/backend/uploads/${el.profileimg}`)}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title style={{textAlign: "center"}}>{el.Username}</Card.Title>
                    <div className=" flex-grow-1 justify-content-center rounded-3  mb-2"
                      style={{ backgroundColor: '#efefef', width: "278px" , marginLeft: "0px", padding: "0px"}}>
                        <Row>
                        <div className="col-5">
                        <p style={{color: "purple",width:"100px"}} className="mb-0">Rating<strong><br/>{el.normalized_rating}</strong></p>
                      </div>
                      <div className="col-7">
                        <p style={{color: "purple",width:"100px"}} className="mb-0">Catgeory<strong><br/>{el.Category1}</strong></p>
                      </div>
                        </Row>
                      
                    </div>
                    <div className="d-flex pt-1">
                      <Button onClick={handleInput}  name={el.Username} style={{width: "278px" , marginLeft: "0px", background: "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)", borderColor: "white" }}>View Profile</Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
                            </>
                        )}
                            }
                    ) : ""
                }
                        
                                       
                </Col>
                <Col lg={2}  className='mb-0 mb-lg-0'>
                </Col>
                </Row>
                </Container>
            </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="sixth">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={3}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                {
                    data.length > 0 ? data.map((el, i) => {
                        if (el.Category1 === "food") {
                        return (
                            <>
        <div className="mb-5" >
      <Container>
        <Row >
          <Col md="12" lg="12" xl="12" >
            <Card style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <CardImg
                      style={{ width: '180px', borderRadius: '10px' }}
                      src={require(`C:/Isha/Winter '23/influence/app/backend/uploads/${el.profileimg}`)}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title style={{textAlign: "center"}}>{el.Username}</Card.Title>
                    <div className=" flex-grow-1 justify-content-center rounded-3  mb-2"
                      style={{ backgroundColor: '#efefef', width: "278px" , marginLeft: "0px", padding: "0px"}}>
                        <Row>
                        <div className="col-5">
                        <p style={{color: "purple",width:"100px"}} className="mb-0">Rating<strong><br/>{el.normalized_rating}</strong></p>
                      </div>
                      <div className="col-7">
                        <p style={{color: "purple",width:"100px"}} className="mb-0">Catgeory<strong><br/>{el.Category1}</strong></p>
                      </div>
                        </Row>
                      
                    </div>
                    <div className="d-flex pt-1">
                      <Button onClick={handleInput}  name={el.Username} style={{width: "278px" , marginLeft: "0px", background: "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)", borderColor: "white" }}>View Profile</Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
                            </>
                        )}
                            }
                    ) : ""
                }
                        
                                       
                </Col>
                <Col lg={2}  className='mb-0 mb-lg-0'>
                </Col>
                </Row>
                </Container>
            </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="seventh">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={3}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                {
                    data.length > 0 ? data.map((el, i) => {
                        if (el.Category1 === "pet") {
                        return (
                            <>
        <div className="mb-5" >
      <Container>
        <Row >
          <Col md="12" lg="12" xl="12" >
            <Card style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <CardImg
                      style={{ width: '180px', borderRadius: '10px' }}
                      src={require(`C:/Isha/Winter '23/influence/app/backend/uploads/${el.profileimg}`)}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title style={{textAlign: "center"}}>{el.Username}</Card.Title>
                    <div className=" flex-grow-1 justify-content-center rounded-3  mb-2"
                      style={{ backgroundColor: '#efefef', width: "278px" , marginLeft: "0px", padding: "0px"}}>
                        <Row>
                        <div className="col-5">
                        <p style={{color: "purple",width:"100px"}} className="mb-0">Rating<strong><br/>{el.normalized_rating}</strong></p>
                      </div>
                      <div className="col-7">
                        <p style={{color: "purple",width:"100px"}} className="mb-0">Catgeory<strong><br/>{el.Category1}</strong></p>
                      </div>
                        </Row>
                      
                    </div>
                    <div className="d-flex pt-1">
                      <Button onClick={handleInput}  name={el.Username} style={{width: "278px" , marginLeft: "0px", background: "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)", borderColor: "white" }}>View Profile</Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
                            </>
                        )}
                            }
                    ) : ""
                }
                        
                                       
                </Col>
                <Col lg={2}  className='mb-0 mb-lg-0'>
                </Col>
                </Row>
                </Container>
            </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="eigth">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={3}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                {
                    data.length > 0 ? data.map((el, i) => {
                        if (el.Category1 === "travel") {
                        return (
                            <>
        <div className="mb-5" >
      <Container>
        <Row >
          <Col md="12" lg="12" xl="12" >
            <Card style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <CardImg
                      style={{ width: '180px', borderRadius: '10px' }}
                      src={require(`C:/Isha/Winter '23/influence/app/backend/uploads/${el.profileimg}`)}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title style={{textAlign: "center"}}>{el.Username}</Card.Title>
                    <div className=" flex-grow-1 justify-content-center rounded-3  mb-2"
                      style={{ backgroundColor: '#efefef', width: "278px" , marginLeft: "0px", padding: "0px"}}>
                        <Row>
                        <div className="col-5">
                        <p style={{color: "purple",width:"100px"}} className="mb-0">Rating<strong><br/>{el.normalized_rating}</strong></p>
                      </div>
                      <div className="col-7">
                        <p style={{color: "purple",width:"100px"}} className="mb-0">Catgeory<strong><br/>{el.Category1}</strong></p>
                      </div>
                        </Row>
                      
                    </div>
                    <div className="d-flex pt-1">
                      <Button onClick={handleInput}  name={el.Username} style={{width: "278px" , marginLeft: "0px", background: "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)", borderColor: "white" }}>View Profile</Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
                            </>
                        )}
                            }
                    ) : ""
                }
                        
                                       
                </Col>
                <Col lg={2}  className='mb-0 mb-lg-0'>
                </Col>
                </Row>
                </Container>
            </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="ninth">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={3}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                {
                    data.length > 0 ? data.map((el, i) => {
                        if (el.Category1 === "interior") {
                        return (
                            <>
        <div className="mb-5" >
      <Container>
        <Row >
          <Col md="12" lg="12" xl="12" >
            <Card style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <CardImg
                      style={{ width: '180px', borderRadius: '10px' }}
                      src={require(`C:/Isha/Winter '23/influence/app/backend/uploads/${el.profileimg}`)}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title style={{textAlign: "center"}}>{el.Username}</Card.Title>
                    <div className=" flex-grow-1 justify-content-center rounded-3  mb-2"
                      style={{ backgroundColor: '#efefef', width: "278px" , marginLeft: "0px", padding: "0px"}}>
                        <Row>
                        <div className="col-5">
                        <p style={{color: "purple",width:"100px"}} className="mb-0">Rating<strong><br/>{el.normalized_rating}</strong></p>
                      </div>
                      <div className="col-7">
                        <p style={{color: "purple",width:"100px"}} className="mb-0">Catgeory<strong><br/>{el.Category1}</strong></p>
                      </div>
                        </Row>
                      
                    </div>
                    <div className="d-flex pt-1">
                      <Button onClick={handleInput}  name={el.Username} style={{width: "278px" , marginLeft: "0px", background: "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)", borderColor: "white" }}>View Profile</Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
                            </>
                        )}
                            }
                    ) : ""
                }
                        
                                       
                </Col>
                <Col lg={2}  className='mb-0 mb-lg-0'>
                </Col>
                </Row>
                </Container>
            </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="tenth">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={3}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                {
                    data.length > 0 ? data.map((el, i) => {
                        if (el.Category1 === "other") {
                        return (
                            <>
        <div className="mb-5" >
      <Container>
        <Row >
          <Col md="12" lg="12" xl="12" >
            <Card style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <CardImg
                      style={{ width: '180px', borderRadius: '10px' }}
                      src={require(`C:/Isha/Winter '23/influence/app/backend/uploads/${el.profileimg}`)}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title style={{textAlign: "center"}}>{el.Username}</Card.Title>
                    <div className=" flex-grow-1 justify-content-center rounded-3  mb-2"
                      style={{ backgroundColor: '#efefef', width: "278px" , marginLeft: "0px", padding: "0px"}}>
                        <Row>
                        <div className="col-5">
                        <p style={{color: "purple",width:"100px"}} className="mb-0">Rating<strong><br/>{el.normalized_rating}</strong></p>
                      </div>
                      <div className="col-7">
                        <p style={{color: "purple",width:"100px"}} className="mb-0">Catgeory<strong><br/>{el.Category1}</strong></p>
                      </div>
                        </Row>
                      
                    </div>
                    <div className="d-flex pt-1">
                      <Button onClick={handleInput}  name={el.Username} style={{width: "278px" , marginLeft: "0px", background: "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)", borderColor: "white" }}>View Profile</Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
                            </>
                        )}
                            }
                    ) : ""
                }
                        
                                       
                </Col>
                <Col lg={2}  className='mb-0 mb-lg-0'>
                </Col>
                </Row>
                </Container>
            </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
    </>
    )
}

export default Explore;