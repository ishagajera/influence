import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { SocialIcon } from 'react-social-icons';
import axios from 'axios';
import AuthService from "./services/auth.service";




const InfluencerProfile = () => {
  const currentUser = AuthService.getCurrentUser();
    const [fetched_data, setData] = useState([]);
    
    const getInfluencerData = async () => {
      // console.log("insde getinfluencer data")
      // console.log("curr user is: ",currentUser[0])
    
   
        axios.get("http://localhost:8081/getinfluencerdata",{
          headers:{
            "Content-Type":"application/json",
            "charset":"utf-8",

          },
        
          params :{
            useremail: currentUser[0],
          }
    })
        .then(res => {
          // console.log("printing res:", res)
          if(res.data.status === 201) {                    
            // console.log("data influencer get 2");
            // console.log(res.data.data[0].profileimg)
            setData(res.data.data)  
          } 
        
         else {
          console.log("error")
         }
      })
      .catch(err => console.log(err));  
    }

    useEffect(() => {
        getInfluencerData()
    }, [])

    return (
        
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <Container className="py-5 h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="8" className="mb-4 mb-lg-0">

          {        
          
                        fetched_data.length > 0 ? fetched_data.map((el, i) => {
                            return (
                                <>

            <Card className="mb-3" style={{ borderRadius: '.5rem',  height: '32rem' }}>
              <Row className="g-0">
                <Col md="4" className="gradient-custom text-center text-white"
                  style={{ padding: '.8rem', borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', backgroundColor: 'black',  height: '32rem' }}>
                  <Card.Img src={require( `C:/Isha/Winter '23/influence/app/backend/uploads/${el.profileimg}`)}
                    alt="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" className="my-5" style={{ width: '170px' }} fluid />
                  <Card.Title style={{ fontWeight: 'bold' }} tag="h3">{el.Username}</Card.Title>
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
                      <Col size="6" className="text-center">
                        <Card.Text className="mb-2 h1 text-center">{el.Posts_Count}</Card.Text>
                        <Card.Text className="h4 text-muted mb-0 text-center">Posts</Card.Text>
                      </Col>
                      <Col size="6" className="text-center">
                        <Card.Text className="mb-2 h1 text-center">16.3</Card.Text>
                        <Card.Text className="h4 text-muted mb-0 text-center">Rating</Card.Text>
                      </Col>
                    </Row>
                    <Row className="pt-1 text-center" style = {{height: '4rem'}}>
                        <Col size="6" className="mb-3 text-center">
                        <SocialIcon network="instagram" url='https://www.instagram.com/el.Username}' />
                       
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
    )
}

export default InfluencerProfile;