import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';


function ActivityInfo() {

  let activities = useSelector(store => store.activities);

  let params = useParams();
  console.log(params);

  let activityId = params.activityId;

  let activity = activities.find(activity => activity.id === Number(activityId));
  console.log(`found activity: `, activity);

  // Bail out early with a message if the activity isnt found
  if (!activity) {
    return <h2>Invalid Activity ID</h2>;
  }




  return (
    <Container>
      <p>
        Name: {activity.name}
        Location: {activity.activity_location}
        <a href={activity.activity_url}></a>
      </p>


    </Container>

  )
}
export default ActivityInfo;