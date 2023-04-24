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

function CardDisplay() {
            return (
                <>
                    {/* <Card style={{ width: '22rem', height: "18rem" }} className="mb-6">
                        <Card.Img variant="top" src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.img}`)} style={{ width: '200px', height: '200px', textAlign: "center", margin: "auto" }} className="mt-2" />
                        <Card.Body className='text-center'>
                            <Card.Title>Product Name : {el.productname}</Card.Title>
                            <Card.Text >Product Description: {el.productdesc}</Card.Text>
                        </Card.Body>
                        
                    </Card>
                    <Col lg={3} className='mb-0 mb-lg-0'></Col>
                    <br></br> */}
                </>
            )
        }

export default Card