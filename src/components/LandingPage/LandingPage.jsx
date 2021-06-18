import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { Carousel, Button } from 'react-bootstrap';
import LoginForm from '../LoginForm/LoginForm';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome, please register below:');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <center>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h2>Already registered? Please login</h2>
            <Button variant="success" onClick={onLogin}>
              Login
            </Button>
          </center>
        </div>
      </center>
    </div>
  );
}

export default LandingPage;
