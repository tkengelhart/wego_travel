import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { Container, Navbar } from 'react-bootstrap';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/trips';
    loginLinkData.text = 'Home';
  }

  return (
    <Container fluid className="navbar">
      <div className="nav">
        <Link to="/home">
          <h1 className="nav-title">WeGo Travel</h1>
        </Link>
        <div>
          <Link className="navLink" to={loginLinkData.path}>
            {loginLinkData.text}
          </Link>
          <Link className="navLink" to="/about">
            About
          </Link>

          {user.id && (
            <>
              <Link className="navLink" to="/trips">
                Trips
              </Link>
              <Link className="navLink" to="/activity">
                Activity List
              </Link>

              <LogOutButton className="navLink" />
            </>
          )}
        </div>
      </div>

    </Container >
  );
}

export default Nav;
