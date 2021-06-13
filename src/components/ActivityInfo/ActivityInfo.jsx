import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';


function ActivityInfo() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const activityList = useSelector(store => store.activities);


  const history = useHistory();

  let params = useParams();
  console.log(params);

  let activityId = params.activityId; // :id is set up in App.js
  // let genreId = params.genreId


  let activity = activityList.find(activity => activity.id === Number(activityId));
  console.log(params.activityId);
  console.log(`found activity: `, activity);


  useEffect(() => {
    dispatch({ type: 'FETCH_ACTIVITIES' });

  }, []);



  return (
    <Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Title>Activity: {activity.name}</Modal.Title>
        <Modal.Subtitle>Location: {activity.activity_location}</Modal.Subtitle>
        <Modal.Body>{activity.activity_url}</Modal.Body>
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