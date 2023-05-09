import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom"
import axios from 'axios';
import AuthService from './services/auth.service';
import Header from './components/Header';
import { Container, Row, Col, Tab, Nav, Card, CardImg  } from "react-bootstrap";
import colorSharp2 from "./assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

const Home = () => {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [items, setItems] = useState([]);
    const [values, setValues] = useState ({brandname:"",});
    const navigate = useNavigate();

    var user_type = JSON.parse(sessionStorage.getItem("typeofuser"));
    const handleInput = (event) => {
      event.preventDefault(); 
      values.brandname = event.target.name;
      console.log(values.brandname)
      sessionStorage.setItem("display_brand", JSON.stringify(values.brandname));  
      navigate('/viewbrandprofile');   

  };
    const getInfoForSession = async () => {
        axios.get("http://localhost:8081/getinfo",{
            params:{
                useremail:AuthService.getCurrentUser()
            }
        })  
        .then(res => {
            if (res.data.status === 201) {
                sessionStorage.setItem("loggedin_username", JSON.stringify(res.data.data[0].username));
                sessionStorage.setItem("typeofuser", JSON.stringify(res.data.data[0].typeofuser));
                
            } else {
                console.log("error in setting session data")
            }
        })
        .catch(err => console.log(err));
    }
    const getUserData = async () => {
        axios.get("http://localhost:8081/getdata")  
        .then(res => {
            if (res.data.status === 201) {
                setData(res.data.data)
            } else {
                console.log("error")
            }
        })
        .catch(err => console.log(err));
    }
    useEffect(() => {
            getUserData();
            getInfoForSession();
               
        
    }, [items])

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
                <h2>Explore Products
                <div className='text-end'>
                  {user_type === "Brand" ? (
                    <Button  style ={{  background:"linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)",borderColor:"black"}} variant="primary"><NavLink to="/form" className="text-decoration-none text-light"> Add Product</NavLink></Button>
                  ):(<></>)} 
                </div></h2>
                <p>For influencers, our platform allows you to view products posted by brands that require promotion. You can easily find products that align with your interests and promote them on your Instagram page. As a brand, you can explore the products of other brands and gain insight into what other companies are offering.</p>
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
                      src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title style={{textAlign: "center", color: "purple", width: "278px" , marginLeft: "0px"}}>{el.productname}</Card.Title>
                    <div className=" flex-grow-1 justify-content-center rounded-3  mb-2"
                      style={{ backgroundColor: '#efefef', width: "278px" , marginLeft: "0px", padding: "0px"}}>
                        <Row>
                        <div className="col-12">
                        <p style={{color: "purple", width: "278px" , marginLeft: "0px",padding:"0px"}} className="mb-0">{el.productdesc}</p>
                      </div>
                        </Row>
                    </div>
                    <div className="d-flex pt-1">
                      <Button onClick={handleInput}  name={el.username} style={{width: "278px" , marginLeft: "0px", background: "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)", borderColor: "white" }}>View Profile</Button>
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
                        )}) : ""}
                        
                                       
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
                        if (el.category === "beauty" ) {
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
                      src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title style={{textAlign: "center", color: "purple", width: "278px" , marginLeft: "0px"}}>{el.productname}</Card.Title>
                    <div className=" flex-grow-1 justify-content-center rounded-3  mb-2"
                      style={{ backgroundColor: '#efefef', width: "278px" , marginLeft: "0px", padding: "0px"}}>
                        <Row>
                        <div className="col-12">
                        <p style={{color: "purple", width: "278px" , marginLeft: "0px",padding:"0px"}} className="mb-0">{el.productdesc}</p>
                      </div>
                        </Row>
                    </div>
                    <div className="d-flex pt-1">
                      <Button onClick={handleInput}  name={el.username} style={{width: "278px" , marginLeft: "0px", background: "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)", borderColor: "white" }}>View Profile</Button>
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
                        )
                                        }
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
                        if (el.category === "family" ) {
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
                      src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title style={{textAlign: "center", color: "purple", width: "278px" , marginLeft: "0px"}}>{el.productname}</Card.Title>
                    <div className=" flex-grow-1 justify-content-center rounded-3  mb-2"
                      style={{ backgroundColor: '#efefef', width: "278px" , marginLeft: "0px", padding: "0px"}}>
                        <Row>
                        <div className="col-12">
                        <p style={{color: "purple", width: "278px" , marginLeft: "0px",padding:"0px"}} className="mb-0">{el.productdesc}</p>
                      </div>
                        </Row>
                    </div>
                    <div className="d-flex pt-1">
                      <Button onClick={handleInput}  name={el.username} style={{width: "278px" , marginLeft: "0px", background: "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)", borderColor: "white" }}>View Profile</Button>
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
                        )
                                        }
                    }
                    ) : ""
                }
                        
                                       
                </Col>
                <Col lg={2}  className='mb-0 mb-lg-0'>
                </Col>
                </Row>
                </Container>
            </div>                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={3}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                {
                    data.length > 0 ? data.map((el, i) => {
                        if (el.category === "fashion" ) {
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
                      src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title style={{textAlign: "center", color: "purple", width: "278px" , marginLeft: "0px"}}>{el.productname}</Card.Title>
                    <div className=" flex-grow-1 justify-content-center rounded-3  mb-2"
                      style={{ backgroundColor: '#efefef', width: "278px" , marginLeft: "0px", padding: "0px"}}>
                        <Row>
                        <div className="col-12">
                        <p style={{color: "purple", width: "278px" , marginLeft: "0px",padding:"0px"}} className="mb-0">{el.productdesc}</p>
                      </div>
                        </Row>
                    </div>
                    <div className="d-flex pt-1">
                      <Button onClick={handleInput}  name={el.username} style={{width: "278px" , marginLeft: "0px", background: "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)", borderColor: "white" }}>View Profile</Button>
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
                        )
                                        }
                    }
                    ) : ""
                }
                        
                                       
                </Col>
                <Col lg={2}  className='mb-0 mb-lg-0'>
                </Col>
                </Row>
                </Container>
            </div>                    </Tab.Pane>
                    <Tab.Pane eventKey="fifth">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={3}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                {
                    data.length > 0 ? data.map((el, i) => {
                        if (el.category === "fitness" ) {
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
                      src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title style={{textAlign: "center", color: "purple", width: "278px" , marginLeft: "0px"}}>{el.productname}</Card.Title>
                    <div className=" flex-grow-1 justify-content-center rounded-3  mb-2"
                      style={{ backgroundColor: '#efefef', width: "278px" , marginLeft: "0px", padding: "0px"}}>
                        <Row>
                        <div className="col-12">
                        <p style={{color: "purple", width: "278px" , marginLeft: "0px",padding:"0px"}} className="mb-0">{el.productdesc}</p>
                      </div>
                        </Row>
                    </div>
                    <div className="d-flex pt-1">
                      <Button onClick={handleInput}  name={el.username} style={{width: "278px" , marginLeft: "0px", background: "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)", borderColor: "white" }}>View Profile</Button>
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
                        )
                                        }
                    }
                    ) : ""
                }
                        
                                       
                </Col>
                <Col lg={2}  className='mb-0 mb-lg-0'>
                </Col>
                </Row>
                </Container>
            </div>                    </Tab.Pane>
                    <Tab.Pane eventKey="sixth">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={3}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                {
                    data.length > 0 ? data.map((el, i) => {
                        if (el.category === "food" ) {
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
                      src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title style={{textAlign: "center", color: "purple", width: "278px" , marginLeft: "0px"}}>{el.productname}</Card.Title>
                    <div className=" flex-grow-1 justify-content-center rounded-3  mb-2"
                      style={{ backgroundColor: '#efefef', width: "278px" , marginLeft: "0px", padding: "0px"}}>
                        <Row>
                        <div className="col-12">
                        <p style={{color: "purple", width: "278px" , marginLeft: "0px",padding:"0px"}} className="mb-0">{el.productdesc}</p>
                      </div>
                        </Row>
                    </div>
                    <div className="d-flex pt-1">
                      <Button onClick={handleInput}  name={el.username} style={{width: "278px" , marginLeft: "0px", background: "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)", borderColor: "white" }}>View Profile</Button>
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
                        )
                                        }
                    }
                    ) : ""
                }
                        
                                       
                </Col>
                <Col lg={2}  className='mb-0 mb-lg-0'>
                </Col>
                </Row>
                </Container>
            </div>                    </Tab.Pane>
                    <Tab.Pane eventKey="seventh">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={3}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                {
                    data.length > 0 ? data.map((el, i) => {
                        if (el.category === "pet" ) {
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
                      src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title style={{textAlign: "center", color: "purple", width: "278px" , marginLeft: "0px"}}>{el.productname}</Card.Title>
                    <div className=" flex-grow-1 justify-content-center rounded-3  mb-2"
                      style={{ backgroundColor: '#efefef', width: "278px" , marginLeft: "0px", padding: "0px"}}>
                        <Row>
                        <div className="col-12">
                        <p style={{color: "purple", width: "278px" , marginLeft: "0px",padding:"0px"}} className="mb-0">{el.productdesc}</p>
                      </div>
                        </Row>
                    </div>
                    <div className="d-flex pt-1">
                      <Button onClick={handleInput}  name={el.username} style={{width: "278px" , marginLeft: "0px", background: "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)", borderColor: "white" }}>View Profile</Button>
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
                        )
                                        }
                    }
                    ) : ""
                }
                        
                                       
                </Col>
                <Col lg={2}  className='mb-0 mb-lg-0'>
                </Col>
                </Row>
                </Container>
            </div>                    </Tab.Pane>
                    <Tab.Pane eventKey="eigth">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={3}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                {
                    data.length > 0 ? data.map((el, i) => {
                        if (el.category === "travel" ) {
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
                      src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title style={{textAlign: "center", color: "purple", width: "278px" , marginLeft: "0px"}}>{el.productname}</Card.Title>
                    <div className=" flex-grow-1 justify-content-center rounded-3  mb-2"
                      style={{ backgroundColor: '#efefef', width: "278px" , marginLeft: "0px", padding: "0px"}}>
                        <Row>
                        <div className="col-12">
                        <p style={{color: "purple", width: "278px" , marginLeft: "0px",padding:"0px"}} className="mb-0">{el.productdesc}</p>
                      </div>
                        </Row>
                    </div>
                    <div className="d-flex pt-1">
                      <Button onClick={handleInput}  name={el.username} style={{width: "278px" , marginLeft: "0px", background: "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)", borderColor: "white" }}>View Profile</Button>
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
                        )
                                        }
                    }
                    ) : ""
                }
                        
                                       
                </Col>
                <Col lg={2}  className='mb-0 mb-lg-0'>
                </Col>
                </Row>
                </Container>
            </div>                    </Tab.Pane>
                    <Tab.Pane eventKey="ninth">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={3}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                {
                    data.length > 0 ? data.map((el, i) => {
                        if (el.category === "interior" ) {
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
                      src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title style={{textAlign: "center", color: "purple", width: "278px" , marginLeft: "0px"}}>{el.productname}</Card.Title>
                    <div className=" flex-grow-1 justify-content-center rounded-3  mb-2"
                      style={{ backgroundColor: '#efefef', width: "278px" , marginLeft: "0px", padding: "0px"}}>
                        <Row>
                        <div className="col-12">
                        <p style={{color: "purple", width: "278px" , marginLeft: "0px",padding:"0px"}} className="mb-0">{el.productdesc}</p>
                      </div>
                        </Row>
                    </div>
                    <div className="d-flex pt-1">
                      <Button onClick={handleInput}  name={el.username} style={{width: "278px" , marginLeft: "0px", background: "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)", borderColor: "white" }}>View Profile</Button>
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
                        )
                                        }
                    }
                    ) : ""
                }
                        
                                       
                </Col>
                <Col lg={2}  className='mb-0 mb-lg-0'>
                </Col>
                </Row>
                </Container>
            </div>                    </Tab.Pane>
                    <Tab.Pane eventKey="tenth">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={3}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                {
                    data.length > 0 ? data.map((el, i) => {
                        if (el.category === "other" ) {
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
                      src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title style={{textAlign: "center", color: "purple", width: "278px" , marginLeft: "0px"}}>{el.productname}</Card.Title>
                    <div className=" flex-grow-1 justify-content-center rounded-3  mb-2"
                      style={{ backgroundColor: '#efefef', width: "278px" , marginLeft: "0px", padding: "0px"}}>
                        <Row>
                        <div className="col-12">
                        <p style={{color: "purple", width: "278px" , marginLeft: "0px",padding:"0px"}} className="mb-0">{el.productdesc}</p>
                      </div>
                        </Row>
                    </div>
                    <div className="d-flex pt-1">
                      <Button onClick={handleInput}  name={el.username} style={{width: "278px" , marginLeft: "0px", background: "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)", borderColor: "white" }}>View Profile</Button>
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
                        )
                                        }
                    }
                    ) : ""
                }
                        
                                       
                </Col>
                <Col lg={2}  className='mb-0 mb-lg-0'>
                </Col>
                </Row>
                </Container>
            </div>                    </Tab.Pane>
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

export default Home