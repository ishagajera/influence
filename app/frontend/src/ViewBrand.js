import React, { useEffect, useState  } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {useNavigate} from "react-router-dom"
import { SocialIcon } from 'react-social-icons';
import axios from 'axios';
import AuthService from "./services/auth.service";
import { FaCheckCircle } from 'react-icons/fa';
import Navigation from './components/Navigation';
import Header from './components/Header';

const BrandProfile = () => {
    const [data, setData] = useState([]);
    const displayUser = AuthService.getDisplayBrand();
    const navigate = useNavigate();
    console.log("brand name is:",displayUser);
    const getBrandData = async () => {
      axios.get("http://localhost:8081/showbrandprofile",
      {
        headers:{
          "Content-Type":"application/json",
          "charset":"utf-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH"

        } ,
        params :{
          username : displayUser,
        }
  }
  )
      .then(res => {
        if(res.data.status === 201) {                    
          setData(res.data.data)  
        } 
      
       else {
        console.log("error")
       }
    })
    .catch(err => console.log(err));  
  }

    useEffect(() => {
        getBrandData()
    }, [])

    return (
        <><Header/>
    
    <section className="vh-100" style={{ backgroundColor: 'black', borderColor: 'black', marginTop:"40px" }}>
      <Container className="py-5 h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="8" className="mb-4 mb-lg-0">

          {        
                        data.length > 0 ? data.map((el, i) => {
                           
                            return (
                                <>
            <Card className="mb-3" style={{ borderRadius: '.5rem',  height: '32rem' , background: 'linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)'}}>
              <Row className="g-0">
                <Col md="4" className="gradient-custom text-center text-white"
                  style={{ padding: '.8rem', borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem',  height: '32rem' }}>
                  <Card.Img src={require(`C:/Isha/Winter '23/influence/app/backend/uploads/${el.profile_img}`)}
                    alt="Avatar" className="my-5" style={{ width: '170px' }} fluid />    
                  <Card.Text className="mb-2 h2 text-center" tag="h3">{el.Username}  {el.Verified_status == "Verified"? <FaCheckCircle color="black"></FaCheckCircle>: null }</Card.Text>
                  <br></br>
                  <Card.Text className="h6 mb-0 text-center">
                  {el.Bio}
                  </Card.Text>
                </Col>
                <Col md="8">
                  <Card.Body className="p-4 ">
                    <Row className="mb-5"></Row>
                    <Row className=" pt-1" style = {{height: '10rem'}}>
                    <Col size="6" className="mb-1 text-center">
                        <Card.Text className="mb-2 h1 text-center">{el.Followers}</Card.Text>
                        <Card.Text className="h4 mb-0 text-center">Followers</Card.Text>
                      </Col>
                      <Col size="6" className="mb-1 text-center">
                        <Card.Text className="mb-2 h1 text-center">{el.Followees}</Card.Text>
                        <Card.Text className="h4  mb-0 text-center">Following</Card.Text>
                      </Col>
                      
                    </Row>
                    <Row>
                    <Col size="6" className="mb-1 text-center" style = {{height: '10rem'}}>
                        <Card.Text className="mb-2 h1 text-center">{el.Posts_Count}</Card.Text>
                        <Card.Text className="h4 mb-0 text-center">Posts</Card.Text>
                      </Col>
                    </Row>
                    <Row className="pt-1 text-center" style = {{height: '4rem'}}>
                        <Col size="6" className="mb-3 text-center">
                        <SocialIcon network="instagram" bgColor="white" url={ `https://www.instagram.com/${el.Username}`  }></SocialIcon>
                        </Col>
                    </Row>
                  </Card.Body>
                </Col>
              </Row>
            </Card>           
            </>
                            )
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