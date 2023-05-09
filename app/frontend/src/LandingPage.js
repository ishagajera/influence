import React from 'react'
import Navigation from './components/Navigation'
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "./assets/img/header-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import Header from './components/Header';
function LandingPage() {   
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "For Your Business"];
  const period = 5000; 
  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
   
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } 
   
    else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }
  return (   
    <><Header/>
 <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to InFluence</span>
                <h1>{`Find the Right Influencer `} <span className="txt-rotate" dataPeriod="5000" data-rotate='[ For Your Business" ]'><span className="wrap">{text}</span></span></h1>
                  <p>Our web application, acts as an one-stop portal for influencers and brands to connect with each other. With our advanced algorithm, custom metric, and marketplace for
promotions, we're poised to revolutionize the way brands and influencers collaborate.</p>
                  <button onClick={() => console.log('connect')}>Get Started <ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
          </Col>
        </Row>
      </Container>
    </section>
    </> 
    )}
export default LandingPage