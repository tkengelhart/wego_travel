import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { Carousel, Button } from 'react-bootstrap';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>



      <div className="grid">
        <div className="grid-col grid-col_8">
          <Carousel>
            <Carousel.Item>
              <img className='d-block w-100'
                src="/images/kai-cheng-3MtPLhsjODg-unsplash.jpg"
                alt="First Slide"
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block w-100'
                src="images/casey-horner-NFB5zdUvb-c-unsplash.jpg"
                alt="Second Slide"
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>   <Carousel.Item>
              <img className='d-block w-100'
                src="images/k-mmerer-Jr5l7qVuRWk-unsplash.jpg"
                alt="Third Slide"
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>   <Carousel.Item>
              <img className='d-block w-100'
                src="images/pablo-garcia-saldana-no_TCkPUq_s-unsplash.jpg"
                alt="Fourth Slide"
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <Button variant="success" onClick={onLogin}>
              Login
            </Button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
