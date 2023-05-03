import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import moment from "moment"
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import {useNavigate} from "react-router-dom"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const Explore = () => {    
    const navigate = useNavigate();
    const [values, setValues] = useState ({username:"",});
    const handleInput = (event) => {
        values.username = event.target.name
        event.preventDefault(); 
        localStorage.setItem("display_user", JSON.stringify(event.target.name));       
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
            console.log("data get");
            console.log(res.data.data)
            setData(res.data.data)

        } else {
            console.log("error")
        }
    }

    useEffect(() => {getUserData();
        localStorage.setItem('display_user', JSON.stringify(values.username));
    },
    [items]);

    return (
        <>
        <div className="container mt-2">
            <h1 className='text-center mt-2'>Explore Influencers</h1>

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
                                    {/* <Card.Img variant="top" src={`/uploads/${el.product_img}`} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" /> */}
                                    <Card.Body className='text-center'>
                                    <Card.Img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-4" style={{ width: '100px' }} fluid />
                                        <Card.Title>{el.Username}</Card.Title>
                                        <Card.Title>{el.normalized_rating}</Card.Title> 
                                        <Button variant="primary" onClick={handleInput}  name={el.Username}>View Profile</Button>
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
                        if (el.Category1 === "beauty" || el.Category2 === "beauty" || el.Category3 === "beauty") {
                        return (
                            <>
                                <Card style={{ width: '22rem', height: "18rem" }} className="mb-6">
                                    {/* <Card.Img variant="top" src={`/uploads/${el.product_img}`} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" /> */}
                                    <Card.Body className='text-center'>
                                    <Card.Img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-4" style={{ width: '100px' }} fluid />
                                        <Card.Title>{el.Username}</Card.Title>
                                        <Card.Title>{el.normalized_rating}</Card.Title>
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
                        if (el.Category1 === "family" || el.Category2 === "family" || el.Category3 === "family") {
                        return (
                            <>
                                <Card style={{ width: '22rem', height: "18rem" }} className="mb-6">
                                    {/* <Card.Img variant="top" src={`/uploads/${el.product_img}`} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" /> */}
                                    <Card.Body className='text-center'>
                                    <Card.Img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-4" style={{ width: '100px' }} fluid />
                                        <Card.Title>{el.Username}</Card.Title>
                                        <Card.Title>{el.normalized_rating}</Card.Title>
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
                        if (el.Category1 === "fashion" || el.Category2 === "fashion" || el.Category3 === "fashion") {
                        return (
                            <>
                                <Card style={{ width: '22rem', height: "18rem" }} className="mb-6">
                                    {/* <Card.Img variant="top" src={`/uploads/${el.product_img}`} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" /> */}
                                    <Card.Body className='text-center'>
                                    <Card.Img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-4" style={{ width: '100px' }} fluid />
                                        <Card.Title>{el.Username}</Card.Title>
                                        <Card.Title>{el.normalized_rating}</Card.Title>
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
                        if (el.Category1 === "fitness" || el.Category2 === "fitness" || el.Category3 === "fitness") {
                        return (
                            <>
                                <Card style={{ width: '22rem', height: "18rem" }} className="mb-6">
                                    {/* <Card.Img variant="top" src={`/uploads/${el.product_img}`} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" /> */}
                                    <Card.Body className='text-center'>
                                    <Card.Img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-4" style={{ width: '100px' }} fluid />
                                        <Card.Title>{el.Username}</Card.Title>
                                        <Card.Title>{el.normalized_rating}</Card.Title>
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
                        if (el.Category1 === "food" || el.Category2 === "food" || el.Category3 === "food") {
                        return (
                            <>
                                <Card style={{ width: '22rem', height: "18rem" }} className="mb-6">
                                    {/* <Card.Img variant="top" src={`/uploads/${el.product_img}`} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" /> */}
                                    <Card.Body className='text-center'>
                                    <Card.Img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-4" style={{ width: '100px' }} fluid />
                                        <Card.Title>{el.Username}</Card.Title>
                                        <Card.Title>{el.normalized_rating}</Card.Title>
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
                        if (el.Category1 === "pet" || el.Category2 === "pet" || el.Category3 === "pet") {
                        return (
                            <>
                                <Card style={{ width: '22rem', height: "18rem" }} className="mb-6">
                                    {/* <Card.Img variant="top" src={`/uploads/${el.product_img}`} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" /> */}
                                    <Card.Body className='text-center'>
                                    <Card.Img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-4" style={{ width: '100px' }} fluid />
                                        <Card.Title>{el.Username}</Card.Title>
                                        <Card.Title>{el.normalized_rating}</Card.Title>
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
                        if (el.Category1 === "travel" || el.Category2 === "travel" || el.Category3 === "travel") {
                        return (
                            <>
                                <Card style={{ width: '22rem', height: "18rem" }} className="mb-6">
                                    {/* <Card.Img variant="top" src={`/uploads/${el.product_img}`} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" /> */}
                                    <Card.Body className='text-center'>
                                    <Card.Img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-4" style={{ width: '100px' }} fluid />
                                        <Card.Title>{el.Username}</Card.Title>
                                        <Card.Title>{el.normalized_rating}</Card.Title>
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
                        if (el.Category1 === "interior" || el.Category2 === "interior" || el.Category3 === "interior") {
                        return (
                            <>
                                <Card style={{ width: '22rem', height: "18rem" }} className="mb-6">
                                    {/* <Card.Img variant="top" src={`/uploads/${el.product_img}`} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" /> */}
                                    <Card.Body className='text-center'>
                                    <Card.Img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-4" style={{ width: '100px' }} fluid />
                                        <Card.Title>{el.Username}</Card.Title>
                                        <Card.Title>{el.normalized_rating}</Card.Title>
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
                        if (el.Category1 === "other" || el.Category2 === "other" || el.Category3 === "other") {
                        return (
                            <>
                                <Card style={{ width: '22rem', height: "18rem" }} className="mb-6">
                                    {/* <Card.Img variant="top" src={`/uploads/${el.product_img}`} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" /> */}
                                    <Card.Body className='text-center'>
                                    <Card.Img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-4" style={{ width: '100px' }} fluid />
                                        <Card.Title>{el.Username}</Card.Title>
                                        <Card.Title>{el.normalized_rating}</Card.Title>
                                        
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

export default Explore;