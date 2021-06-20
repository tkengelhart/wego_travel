import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Container, Modal, Dropdown, InputGroup, FormControl, Spinner, Card, Form } from 'react-bootstrap';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();


  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <center>
      <Form className="formPanel" onSubmit={login}>
        <h1>Please login to continue</h1>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <div>
          <label htmlFor="username">
            Username:
            <InputGroup>
              <FormControl
                type="text"
                name="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              /></InputGroup>
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <InputGroup>
              <FormControl
                type="password"
                name="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              /></InputGroup>
          </label>
        </div>
        <div>
          <Button variant="success" title="Submit"><input className="btn" type="submit" name="submit" value="Log In" /></Button>
        </div>
      </Form >
    </center>

  );
}
export default LoginForm;
