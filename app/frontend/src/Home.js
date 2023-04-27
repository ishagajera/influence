import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CardDisplay from './components/CardDisplay'
import AuthService from './services/auth.service';
const Home = () => {

    const [data, setData] = useState([]);

    const [show, setShow] = useState(false);

    //pill
    const [iconsActive, setIconsActive] = useState('pill1');
    const getCurrentUser = () => {
        return JSON.parse(localStorage.getItem("user"));
      };

  const handleIconsClick = (value) => {
    if (value === iconsActive) {
      return;
    }

    setIconsActive(value);
  };

    const getUserData = async () => {
        axios.get("http://localhost:8081/getdata")
            
        .then(res => {
          
            if (res.data.status === 201) {
            
                // console.log("data get");
                // console.log(res.data.data)
                setData(res.data.data)
    
            } else {
                console.log("error")
            }
        })
        .catch(err => console.log(err));
        
        
    }
    useEffect(() => {
        getUserData()
    }, [])

    return (
        <>

            {
                show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    User Delete
                </Alert> : ""
            }
            <div className="container mt-2">
                <h1 className='text-center mt-2'>Explore Products</h1>

                <div className='text-end'>
                    <Button variant="primary"><NavLink to="/form" className="text-decoration-none text-light"> Add Product</NavLink></Button>
                </div>

                {/* tab */}
                <Tabs defaultActiveKey="first">
                    <Tab eventKey="first" title="All">
                    
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={4}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                    {
                        data.length > 0 ? data.map((el, i) => {
                          
                            return (
                                <>
                                    <Card style={{ width: '22rem', height: "18rem" }} className="mb-6">
                                        <Card.Img variant="top" src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" />
                                        <Card.Body className='text-center'>
                                            <Card.Title>Product Name : {el.productname}</Card.Title>
                                            <Card.Title >Product Description: {el.productdesc}</Card.Title>
                                        </Card.Body>
                                        
                                    </Card>
                                    <Col lg={3} className='mb-0 mb-lg-0'></Col>
                                    <br></br>
                                </>
                            )
                                            }
                     
                        ) : ""
                    }
                    </Col>
                    <Col lg={2}  className='mb-0 mb-lg-0'>
                    </Col>
                    </Row>
                    </Container>
                </div>

                    </Tab>
                    <Tab eventKey="second" title="Beauty">

                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={4}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                    {
                        data.length > 0 ? data.map((el, i) => {
                            if (el.category === "beauty" ) {
                            return (
                                <>
                                    <Card style={{ width: '22rem', height: "18rem" }} className="mb-6">
                                        <Card.Img variant="top" src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" />
                                        <Card.Body className='text-center'>
                                            <Card.Title>Product Name : {el.productname}</Card.Title>
                                            <Card.Text >Product Description: {el.productdesc}</Card.Text>
                                        </Card.Body>
                                        
                                    </Card>
                                    <Col lg={3} className='mb-0 mb-lg-0'></Col>
                                    <br></br>
                                </>
                            )
                                            }
                        }) : ""
                    }
                    </Col>
                    <Col lg={2}  className='mb-0 mb-lg-0'>
                    </Col>
                    </Row>
                    </Container>
                </div>

                    </Tab>
                    <Tab eventKey="third" title="Family">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={4}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                    {
                        data.length > 0 ? data.map((el, i) => {
                            if (el.category === "family" ) {
                            return (
                                <>
                                    <Card style={{ width: '22rem', height: "18rem" }} className="mb-6">
                                        <Card.Img variant="top" src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" />
                                        <Card.Body className='text-center'>
                                            <Card.Title>Product Name : {el.productname}</Card.Title>
                                            <Card.Text >Product Description: {el.productdesc}</Card.Text>
                                        </Card.Body>
                                        
                                    </Card>
                                    <Col lg={3} className='mb-0 mb-lg-0'></Col>
                                    <br></br>
                                </>
                            )
                                            }
                        }) : ""
                    }
                    </Col>
                    <Col lg={2}  className='mb-0 mb-lg-0'>
                    </Col>
                    </Row>
                    </Container>
                </div>

                    </Tab>
                    <Tab eventKey="fourth" title="Fashion">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={4}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                    {
                        data.length > 0 ? data.map((el, i) => {
                            if (el.category === "fashion" ) {
                            return (
                                <>
                                    <Card style={{ width: '22rem', height: "18rem" }} className="mb-6">
                                        <Card.Img variant="top" src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" />
                                        <Card.Body className='text-center'>
                                            <Card.Title>Product Name : {el.productname}</Card.Title>
                                            <Card.Text >Product Description: {el.productdesc}</Card.Text>
                                        </Card.Body>
                                        
                                    </Card>
                                    <Col lg={3} className='mb-0 mb-lg-0'></Col>
                                    <br></br>
                                </>
                            )
                                            }
                        }) : ""
                    }
                    </Col>
                    <Col lg={2}  className='mb-0 mb-lg-0'>
                    </Col>
                    </Row>
                    </Container>
                </div>

                    </Tab>
                    <Tab eventKey="fifth" title="Fitness">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={4}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                    {
                        data.length > 0 ? data.map((el, i) => {
                            if (el.category === "fitness" ) {
                            return (
                                <>
                                    <Card style={{ width: '22rem', height: "18rem" }} className="mb-6">
                                        <Card.Img variant="top" src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" />
                                        <Card.Body className='text-center'>
                                            <Card.Title>Product Name : {el.productname}</Card.Title>
                                            <Card.Text >Product Description: {el.productdesc}</Card.Text>
                                        </Card.Body>
                                        
                                    </Card>
                                    <Col lg={3} className='mb-0 mb-lg-0'></Col>
                                    <br></br>
                                </>
                            )
                                            }
                        }) : ""
                    }
                    </Col>
                    <Col lg={2}  className='mb-0 mb-lg-0'>
                    </Col>
                    </Row>
                    </Container>
                </div>

                    </Tab>
                    <Tab eventKey="sixth" title="Food">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={4}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                    {
                        data.length > 0 ? data.map((el, i) => {
                            if (el.category === "food" ) {
                            return (
                                <>
                                    <Card style={{ width: '22rem', height: "18rem" }} className="mb-6">
                                        <Card.Img variant="top" src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" />
                                        <Card.Body className='text-center'>
                                            <Card.Title>Product Name : {el.productname}</Card.Title>
                                            <Card.Text >Product Description: {el.productdesc}</Card.Text>
                                        </Card.Body>
                                        
                                    </Card>
                                    <Col lg={3} className='mb-0 mb-lg-0'></Col>
                                    <br></br>
                                </>
                            )
                                            }
                        }) : ""
                    }
                    </Col>
                    <Col lg={2}  className='mb-0 mb-lg-0'>
                    </Col>
                    </Row>
                    </Container>
                </div>

                    </Tab>
                    <Tab eventKey="seventh" title="Pet">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={4}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                    {
                        data.length > 0 ? data.map((el, i) => {
                            if (el.category === "pet" ) {
                            return (
                                <>
                                    <Card style={{ width: '22rem', height: "18rem" }} className="mb-6">
                                        <Card.Img variant="top" src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" />
                                        <Card.Body className='text-center'>
                                            <Card.Title>Product Name : {el.productname}</Card.Title>
                                            <Card.Text >Product Description: {el.productdesc}</Card.Text>
                                        </Card.Body>
                                        
                                    </Card>
                                    <Col lg={3} className='mb-0 mb-lg-0'></Col>
                                    <br></br>
                                </>
                            )
                                            }
                        }) : ""
                    }
                    </Col>
                    <Col lg={2}  className='mb-0 mb-lg-0'>
                    </Col>
                    </Row>
                    </Container>
                </div>

                    </Tab>
                    <Tab eventKey="eight" title="Travel">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={4}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                    {
                        data.length > 0 ? data.map((el, i) => {
                            if (el.category === "travel" ) {
                            return (
                                <>
                                    <Card style={{ width: '22rem', height: "18rem" }} className="mb-6">
                                        <Card.Img variant="top" src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" />
                                        <Card.Body className='text-center'>
                                            <Card.Title>Product Name : {el.productname}</Card.Title>
                                            <Card.Text >Product Description: {el.productdesc}</Card.Text>
                                        </Card.Body>
                                        
                                    </Card>
                                    <Col lg={3} className='mb-0 mb-lg-0'></Col>
                                    <br></br>
                                </>
                            )
                                            }
                        }) : ""
                    }
                    </Col>
                    <Col lg={2}  className='mb-0 mb-lg-0'>
                    </Col>
                    </Row>
                    </Container>
                </div>

                    </Tab>
                    <Tab eventKey="ninth" title="Interior">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={4}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                    {
                        data.length > 0 ? data.map((el, i) => {
                            if (el.category === "interior" ) {
                            return (
                                <>
                                    <Card style={{ width: '22rem', height: "18rem" }} className="mb-6">
                                        <Card.Img variant="top" src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" />
                                        <Card.Body className='text-center'>
                                            <Card.Title>Product Name : {el.productname}</Card.Title>
                                            <Card.Text >Product Description: {el.productdesc}</Card.Text>
                                        </Card.Body>
                                        
                                    </Card>
                                    <Col lg={3} className='mb-0 mb-lg-0'></Col>
                                    <br></br>
                                </>
                            )
                                            }
                        }) : ""
                    }
                    </Col>
                    <Col lg={2}  className='mb-0 mb-lg-0'>
                    </Col>
                    </Row>
                    </Container>
                </div>

                    </Tab>
                    <Tab eventKey="tenth" title="Other">
                    <div className='d-flex justify-content-between align-iteams-center mt-5'>
                <Container >
                <Row>
                <Col lg={4}  className='mb-0 mb-lg-0'></Col>
                <Col lg={6}  className='mb-0 mb-lg-0'>
                    {
                        data.length > 0 ? data.map((el, i) => {
                            if (el.category === "other" ) {
                            return (
                                <>
                                    <Card style={{ width: '22rem', height: "18rem" }} className="mb-6">
                                        <Card.Img variant="top" src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" />
                                        <Card.Body className='text-center'>
                                            <Card.Title>Product Name : {el.productname}</Card.Title>
                                            <Card.Text >Product Description: {el.productdesc}</Card.Text>
                                        </Card.Body>
                                        
                                    </Card>
                                    <Col lg={3} className='mb-0 mb-lg-0'></Col>
                                    <br></br>
                                </>
                            )
                                            }
                        }) : ""
                    }
                    </Col>
                    <Col lg={2}  className='mb-0 mb-lg-0'>
                    </Col>
                    </Row>
                    </Container>
                </div>

                    </Tab>
                   
                </Tabs>

               
                
            </div>
        </>
    )
}

export default Home