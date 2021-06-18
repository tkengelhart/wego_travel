import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function LoginPage() {
  const history = useHistory();


  return (
    <div className="loginContainer fluid" >
      <LoginForm />

      <center>
        <Button variant="success"
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
