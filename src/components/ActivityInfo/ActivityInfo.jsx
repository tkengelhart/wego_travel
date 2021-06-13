import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';


function ActivityInfo() {

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
      <p>
        Name: {activity.name}
        Location: {activity.activity_location}
        <a href={activity.activity_url}></a>
      </p>


    </Container>

  )
}
export default ActivityInfo;