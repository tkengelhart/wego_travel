import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Modal, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';


function ActivityInfo() {
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    dispatch({ type: 'FETCH_ACTIVITIES' });

  }, []);
  const activityList = useSelector(store => store.activities);

  let params = useParams();
  console.log(params);

  let activityId = params.activityId;


  let activity = activityList.find(activity => activity.id === Number(activityId));
  console.log(params.activityId);
  console.log(`found activity: `, activity);

  if (!activity) {
    return <h2>Invalid activity ID</h2>;
  }


  return (
    <Container>
      <Card>
        <Card.Header>Name: {activity.name}</Card.Header>
        <Card.Body>Location: {activity.activity_location}</Card.Body>
        <Card.Link href="Website"> {activity.activity_url}</Card.Link>
      </Card>
      <Button variant="primary"
        onClick={() => history.goBack()}>Back</Button>
    </Container >

  )
}
export default ActivityInfo;