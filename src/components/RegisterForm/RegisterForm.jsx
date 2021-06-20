import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Form className="formPanel" onSubmit={registerUser}>
      <h1>Register User</h1>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <InputGroup>
            <FormControl
              type="text"
              name="username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </InputGroup>
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <InputGroup>
            <FormControl
              type="password"
              name="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            /></InputGroup>
        </label>
      </div>
      <div>
        <Button variant="success" title="Submit" size="sm"><input className="btn" type="submit" name="submit" value="Register" /></Button>
      </div>
    </Form>
  );
}

export default RegisterForm;
