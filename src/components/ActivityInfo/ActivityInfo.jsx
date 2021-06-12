import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Container, Button, Dropdown, Modal, ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css';

function ActivityInfo() {
  const dispatch = useDispatch();
  const history = useHistory();
  const activities = useSelector(store => store.activities);






  return (
    <Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Title>Activity: {activity.name}</Modal.Title>
        <Modal.Subtitle>Location: {activity.location}</Modal.Subtitle>
        <Modal.Body><a href="{activity.activity_url}"></a></Modal.Body>


        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
export default ActivityInfo;