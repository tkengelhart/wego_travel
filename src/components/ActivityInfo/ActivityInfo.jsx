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

  let activityId = params.activityId;


  let activity = activityList.find(activity => activity.id === Number(activityId));
  console.log(params.activityId);
  console.log(`found activity: `, activity);


  useEffect(() => {
    dispatch({ type: 'FETCH_ACTIVITIES' });

  }, []);



  return (
    <Container>
      <span>
        Name: {activityList.name}
        Location: {activityList.activity_location}
        <a href={activityList.activity_url}></a>
      </span>


    </Container>

  )
}
export default ActivityInfo;