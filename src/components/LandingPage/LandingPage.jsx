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
      <h1>{heading}</h1>

      <center>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <br />
            <h1>Please login</h1>
            <Button variant="success" size="lg" title="Login" onClick={onLogin}>
              Login
            </Button>
          </center>
        </div>
      </center>
    </div>
  );
}

export default LandingPage;
