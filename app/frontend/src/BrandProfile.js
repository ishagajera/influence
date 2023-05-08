import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { SocialIcon } from 'react-social-icons';
import axios from 'axios';
import { FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {FaCheckCircle} from 'react-icons/fa';
import AuthService from './services/auth.service';
import Navigation from './components/Navigation';
const BrandProfile = () => {
    const [data, setData] = useState([]);
    const curr_user = AuthService.getLoggedInUsername();
    const getBrandData = async () => {
        const res = await axios.get("http://localhost:8081/getbranddata", {
            headers: {
                "Content-Type": "application/json",
                "charset":"utf-8"
            }
        });
        
        if (res.data.status === 201) {
            setData(res.data.data)
        } else {
            console.log("error in getting brand data")
        }
    }

    useEffect(() => {
        getBrandData()
    }, [])

    return (
        <><Navigation/>
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <Container className="py-5 h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="8" className="mb-4 mb-lg-0">

          {        
                        data.length > 0 ? data.map((el, i) => {
                            if (el.Username === curr_user) {
                            return (
                                <>

            <Card className="mb-3" style={{ borderRadius: '.5rem',  height: '32rem' }}>
              <Row className="g-0">
                <Col md="4" className="gradient-custom text-center text-white"
                  style={{ padding: '.8rem', borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', backgroundColor: 'black',  height: '32rem' }}>
                 
                    <br></br>
                    <br></br>
                    <Card.Img variant="top" class="rounded-circle shadow-4-strong border border-white" src={require(`C:/Isha/Winter '23/influence/app/backend/uploads/${el.profile_img}`)} style={{ width: '160px', height: '160px', textAlign: "center", margin: "auto" }} className="mt-2" />
                    <br></br>
                    <br></br>
                    
                  <Card.Title style={{ fontWeight: 'bold' }} tag="h3">{el.Username}  {el.Verified_status == "Verified"? <FaCheckCircle color="aqua"></FaCheckCircle>: null }</Card.Title>
                  <br></br>
                  <Card.Text>
                
                 
                  {el.Bio}
                    
                  </Card.Text>
                </Col>
                <Col md="8">
                  <Card.Body className="p-4 ">
                    <Row className="mb-5"></Row>
                    <Row className=" pt-1" style = {{height: '14rem'}}>
                    <Col size="6" className="mb-3 text-center">
                        <Card.Text className="mb-2 h1 text-center">{el.Followers}</Card.Text>
                        <Card.Text className="h4 text-muted mb-0 text-center">Followers</Card.Text>
                      </Col>
                      <Col size="6" className="mb-3 text-center">
                        <Card.Text className="mb-2 h1 text-center">{el.Followees}</Card.Text>
                        <Card.Text className="h4 text-muted mb-0 text-center">Following</Card.Text>
                      </Col>
                    </Row>

                    <Row className="pt-1 text-center" style = {{height: '8rem'}}>
                    <Col size="3" className="text-center">
                      </Col>
                      <Col size="6" className="text-center">
                        <Card.Text className="mb-2 h1 text-center">{el.Posts_Count}</Card.Text>
                        <Card.Text className="h4 text-muted mb-0 text-center">Posts</Card.Text>
                      </Col>
                      <Col size="3" className="text-center">
                      </Col>
                    </Row>
                    <Row className="pt-1 text-center" style = {{height: '4rem'}}>
                        <Col size="6" className="mb-3 text-center">
                        <SocialIcon network="instagram" url={ `https://www.instagram.com/${el.Username}` }></SocialIcon>
                       
                        </Col>
                    </Row>
                  </Card.Body>
                </Col>
              </Row>
            </Card>           
                                </>
                            )
                    }
                            
                        }
                        ) : ""

            }
          </Col>
        </Row>
      </Container>
    </section>
    </>
    )
}

export default BrandProfile;